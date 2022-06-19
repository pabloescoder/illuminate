from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import (
    AbstractBaseUser,
    PermissionsMixin,
    BaseUserManager,
)
from rest_framework_simplejwt.tokens import RefreshToken

def upload_to(instance, filename):
    return "{}/{}".format(instance.id, filename)

class CustomAccountManager(BaseUserManager):
  
    def create_superuser(self, email, username, password, **other_fields):
        other_fields.setdefault("is_staff", True)
        other_fields.setdefault("is_active", True)
        other_fields.setdefault("is_superuser", True)
        
        other_fields.setdefault("is_verified", True)
        

        if other_fields.get("is_staff") is not True:
            raise ValueError("Superuser must be assigned to is_staff=True")
        if other_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must be assigned to is_superuser=True")

        return self.create_user(email, username, password, **other_fields)

    def create_user(self, email, username, password, **other_fields):
        if not email:
            raise ValueError(_("You must provide a email"))
        user = self.model(
            email=self.normalize_email(email),
            username=username,
            **other_fields
        )
        user.set_password(password)
        user.save()
        return user


class NewUser(AbstractBaseUser, PermissionsMixin):
    """
    User model
    """

    username = models.CharField(
        max_length=150, blank=False, unique=True
    )
    avatar = models.ImageField( upload_to="Avatar",
        blank=True,
        null=True,
        unique=False,
        default="default.png",
        verbose_name=_("avatar"))
    email = models.EmailField(_("email address"), blank=False, unique=True)
    is_verified = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = CustomAccountManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    def __str__(self):
        return self.email

    def tokens(self):
        refresh = RefreshToken.for_user(self)
        return {"refresh": str(refresh), "access": str(refresh.access_token)}
