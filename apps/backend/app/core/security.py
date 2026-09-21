from passlib.context import CryptContext


# Password hashing configuration
pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)


def get_password_hash(password: str) -> str:
    """
    Convert plain password into hashed password
    before storing in database.
    """

    return pwd_context.hash(password)



def verify_password(
    plain_password: str,
    hashed_password: str
) -> bool:
    """
    Compare user entered password
    with stored hashed password.
    """

    return pwd_context.verify(
        plain_password,
        hashed_password
    )




# Backwards compatibility alias
hash_password = get_password_hash