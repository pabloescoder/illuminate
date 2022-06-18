from asyncore import read
from rest_framework import serializers
from .models import NewUser
from django.contrib.auth import authenticate
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode
from rest_framework_simplejwt.tokens import RefreshToken, TokenError


# Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=68, min_length=6, write_only=True)

    class Meta:
        model = NewUser
        fields = (
            "email",
            "username",
            "password",
        )
        extra_kwargs = {"password": {"write_only": True}}

    def validate(self, attrs):
        email = attrs.get("email", "")
        username = attrs.get("username", "")
        
        return attrs

    def create(self, validated_data):
        user = NewUser.objects.create_user(**validated_data)

        return user


class EmailVerificationSerializer(serializers.ModelSerializer):
    token = serializers.CharField(max_length=555)

    class Meta:
        model = NewUser
        fields = ["token"]


class LoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=255)
    username = serializers.CharField(max_length=50, read_only=True)
    password = serializers.CharField(max_length=68, min_length=6, write_only=True)
    tokens = serializers.SerializerMethodField()

    def get_tokens(self, obj):
        user = NewUser.objects.get(email=obj["email"])
        return {
            "access": user.tokens()["access"],
            "refresh": user.tokens()["refresh"],
        }

    class Meta:
        model = NewUser
        fields = ("email", "password", "username", "tokens")

    def validate(self, attrs):
        email = attrs.get("email", "")
        password = attrs.get("password", "")

        user = authenticate(email=email, password=password)
        if not user:
            raise AuthenticationFailed("Invalid credentials, try again")
        if not user.is_active:
            raise AuthenticationFailed("Account is disabled, contact the admin")
        if not user.is_verified:
            raise AuthenticationFailed("Email is not verified")

        return {
            "email": user.email,
            "username": user.username,
            "avatar": user.avatar,
            "tokens": user.tokens,
        }
        return super().validate(attrs)


class PasswordResetSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=255)
    redirect_url = serializers.CharField(
        max_length=255, write_only=True, required=False
    )

    class Meta:
        model = NewUser
        fields = ("email", "redirect_url")


class SetNewPasswordSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=68, min_length=6, write_only=True)
    token = serializers.CharField(max_length=68, write_only=True)
    uidb64 = serializers.CharField(max_length=68, write_only=True)

    class Meta:
        model = NewUser
        fields = ["password", "token", "uidb64"]

    def validate(self, attrs):
        try:
            password = attrs.get("password", "")
            token = attrs.get("token", "")
            uidb64 = attrs.get("uidb64", "")

            id = force_str(urlsafe_base64_decode(uidb64))
            user = NewUser.objects.get(id=id)

            if not PasswordResetTokenGenerator().check_token(user, token):
                raise AuthenticationFailed("The reset link is invalid", 401)

            user.set_password(password)
            user.save()
            return user
        except Exception as e:
            raise AuthenticationFailed("The reset link is invalid", 401)
        return super().validate(attrs)


class LogoutSerializer(serializers.ModelSerializer):
    refresh = serializers.CharField()

    class Meta:
        model = NewUser
        fields = ("refresh",)

    default_error_messages = {
        "bad_token": {"Token is invalid or expired"},
    }

    def validate(self, attrs):
        self.token = attrs["refresh"]

        return attrs

    def save(self, **kwargs):
        try:
            token = RefreshToken(self.token)
            token.blacklist()
        except TokenError:
            self.fail("bad_token")


class UserProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = NewUser
        fields = [
            
            "username",
            "avatar", 
            "email",
        ]
