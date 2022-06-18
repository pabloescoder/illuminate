"""authentication URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path
from .views import (
    RegisterAPI,
    RequestPasswordResetMail,
    VerifyEmail,
    LoginAPIView,
    PasswordTokenCheckAPI,
    SetNewPasswordAPIView,
    LogoutAPIView,
    UserProfileView,
)
from rest_framework_simplejwt.views import TokenRefreshView


urlpatterns = [
    path("register/", RegisterAPI.as_view(), name="register"),
    path("email-verify/", VerifyEmail.as_view(), name="email-verify"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("login/", LoginAPIView.as_view(), name="login"),
    path(
        "request-reset-password/",
        RequestPasswordResetMail.as_view(),
        name="request-reset-password",
    ),
    path(
        "password-reset/<uidb64>/<token>/",
        PasswordTokenCheckAPI.as_view(),
        name="password_reset_confirm",
    ),
    path(
        "password-reset-confirm/",
        SetNewPasswordAPIView.as_view(),
        name="password_reset_confirm",
    ),
    path("logout/", LogoutAPIView.as_view(), name="logout"),
    path("user-profile/",UserProfileView.as_view(),name="user-profile"),
]
