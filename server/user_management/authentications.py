from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import exceptions

class JWTCookieAuthentication(JWTAuthentication):
    def authenticate(self, request):
        raw_token = request.COOKIES.get('access_token')
        if raw_token is None:
            return None 

        try:
            validated_token = self.get_validated_token(raw_token)
            return self.get_user(validated_token), validated_token
        except Exception as e:
            raise None
            # raise exceptions.AuthenticationFailed('Invalid or expired token')
        
        
# from rest_framework_simplejwt.authentication import JWTAuthentication
# from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
# from rest_framework import exceptions

# class JWTCookieAuthentication(JWTAuthentication):
#     def authenticate(self, request):
#         raw_token = request.COOKIES.get("access_token")

#         if raw_token is None:
#             return None  # unauthenticated request

#         try:
#             validated_token = self.get_validated_token(raw_token)
#             user = self.get_user(validated_token)
#             return (user, validated_token)

#         except (InvalidToken, TokenError):
#             raise exceptions.AuthenticationFailed(
#                 "Access token expired or invalid"
#             )
