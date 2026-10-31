
from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from .models import User
import re


class CustomerRegistrationSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["id", "full_name", "email", "password"]

    def validate_password(self, value):
        if len(value) <= 8:
            raise serializers.ValidationError(
                "Password must contain more than 8 characters."
            )

        if not re.search(r"[A-Z]", value):
            raise serializers.ValidationError(
                "Password must contain an uppercase letter."
            )

        if not re.search(r"[a-z]", value):
            raise serializers.ValidationError(
                "Password must contain a lowercase letter."
            )

        if not re.search(r"[^A-Za-z0-9]", value):
            raise serializers.ValidationError(
                "Password must contain a special character."
            )

        validate_password(value)
        return value

    def validate_email(self, value):
        if User.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError(
                "An account with this email already exists."
            )
        return value

    def create(self, validated_data):
        return User.objects.create_user(
            email=validated_data["email"],
            full_name=validated_data["full_name"],
            password=validated_data["password"],
            role=User.Role.CUSTOMER,
            email_verified=False,
        )


from django.contrib.auth import authenticate
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken


class EmailLoginSerializer(serializers.Serializer):

    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):

        user = authenticate(
            request=self.context.get("request"),
            email=attrs["email"],
            password=attrs["password"]
        )

        if not user:
            raise serializers.ValidationError(
                "Invalid email or password."
            )

        if not user.is_active:
            raise serializers.ValidationError(
                "Your account is inactive."
            )

        if not user.email_verified:
            raise serializers.ValidationError(
                "Please verify your email before logging in."
            )

        refresh = RefreshToken.for_user(user)

        return {
            "message": "Login successful.",
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "user": {
                "id": user.id,
                "full_name": user.full_name,
                "email": user.email,
                "role": user.role
            }
        }
