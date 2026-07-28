from fastapi import Depends, HTTPException, status

from fastapi.security import OAuth2PasswordBearer

from jose import jwt, JWTError

from sqlmodel import select

from sqlmodel.ext.asyncio.session import AsyncSession


from app.database import get_session

from app.core.config import settings

from app.models.user_models import User



oauth2_scheme = OAuth2PasswordBearer(

    tokenUrl="/api/auth/login"

)




async def get_current_user(

    token: str = Depends(oauth2_scheme),

    session: AsyncSession = Depends(get_session)

):


    credentials_exception = HTTPException(

        status_code=status.HTTP_401_UNAUTHORIZED,

        detail="Could not validate credentials"

    )



    try:


        payload = jwt.decode(

            token,

            settings.JWT_SECRET_KEY,

            algorithms=[

                settings.JWT_ALGORITHM

            ]

        )


        user_id = payload.get("sub")



        if user_id is None:

            raise credentials_exception



    except JWTError:

        raise credentials_exception




    result = await session.exec(

        select(User)

        .where(

            User.id == int(user_id)

        )

    )



    user = result.first()



    if not user:

        raise credentials_exception



    return user