from passlib.context import CryptContext


pwd_context = CryptContext(
    schemes=["argon2", "bcrypt"],
    default="argon2",
    deprecated=["bcrypt"],
)


class Hasher:

    @staticmethod
    def verify_password(
        plain_password: str,
        hashed_password: str,
    ) -> bool:
        return pwd_context.verify(
            plain_password,
            hashed_password,
        )

    @staticmethod
    def get_password_hash(
        password: str,
    ) -> str:
        return pwd_context.hash(password)

    @staticmethod
    def needs_rehash(
        hashed_password: str,
    ) -> bool:
        return pwd_context.needs_update(hashed_password)