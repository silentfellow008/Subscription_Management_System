
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User


@admin.register(User)
class CustomUserAdmin(UserAdmin):

    model = User

    list_display = (
        "email",
        "full_name",
        "role",
        "email_verified",
        "is_active",
        "is_staff",
    )

    list_filter = (
        "role",
        "email_verified",
        "is_active",
        "is_staff",
    )

    search_fields = (
        "email",
        "full_name",
    )

    ordering = ("email",)

    fieldsets = (
        ("Account Information", {
            "fields": (
                "email",
                "password",
            )
        }),
        ("Personal Information", {
            "fields": (
                "full_name",
                "role",
            )
        }),
        ("Permissions", {
            "fields": (
                "is_active",
                "is_staff",
                "is_superuser",
                "email_verified",
                "groups",
                "user_permissions",
            )
        }),
    )

    add_fieldsets = (
        ("Create User", {
            "classes": ("wide",),
            "fields": (
                "email",
                "full_name",
                "role",
                "password1",
                "password2",
                "is_active",
                "is_staff",
                "is_superuser",
            ),
        }),
    )

