
class UnauthorizedException(Exception):
    """Raised when user is not authorized"""

    def __init__(self, message):
        self.message = message

class PageCodeException(Exception):
    """Raised when pageCode not found"""

    def __init__(self, message):
        self.message = message