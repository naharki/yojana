from django.urls import path
from .views import (
    LoginView,
    LogOutView,
    MeView,
    CreateAppView,
    CreateAdminView,
    CreateUserView
)

urlpatterns = [
    path("login/", LoginView.as_view()),
    path("logout/", LogOutView.as_view()),
    path("me/", MeView.as_view()),

    path("create-app/", CreateAppView.as_view()),
    path("create-admin/", CreateAdminView.as_view()),
    path("create-user/", CreateUserView.as_view()),
]
