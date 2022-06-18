from django.contrib import admin

# Register your models here.
from dataclasses import field
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

# Register your models here.
from .models import NewUser


class UserAdminConfig(UserAdmin):
    model = NewUser
    search_fields = ("username","avatar", "email")
    list_filter = (
        "username",
        "email",
        "is_verified",
        "is_active",
        "is_staff",
    )
    ordering = ("-pk",)
    list_display = (
        "username",
        "avatar",
        "email",
        "is_verified",
        "is_active",
        "is_staff",
    )
    fieldsets = (
        (
            None,
            {
                "fields": ("username", "avatar", "email"),
            },
        ),
        (
            "Permissions",
            {
                "fields": ("is_verified", "is_staff", "is_active"),
            },
        ),
    )

    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "username",
                    "avatar",
                    "email",
                    "password1",
                    "password2",
                    "is_verified",
                    "is_active",
                    "is_staff",
                ),
            },
        ),
    )


admin.site.register(NewUser, UserAdminConfig)
