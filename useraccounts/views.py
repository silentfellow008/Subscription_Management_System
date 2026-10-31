
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .serializers import (
    CustomerRegistrationSerializer,
    EmailLoginSerializer,
)


@api_view(["POST"])
@permission_classes([AllowAny])
def customer_register(request):

    serializer = CustomerRegistrationSerializer(data=request.data)

    if serializer.is_valid():
        user = serializer.save()

        return Response(
            {
                "message": "Registration successful. Please verify your email.",
                "id": user.id,
                "full_name": user.full_name,
                "email": user.email,
                "role": user.role,
            },
            status=status.HTTP_201_CREATED
        )

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )


@api_view(["POST"])
@permission_classes([AllowAny])
def customer_login(request):

    serializer = EmailLoginSerializer(
        data=request.data,
        context={"request": request}
    )

    serializer.is_valid(raise_exception=True)

    return Response(
        serializer.validated_data,
        status=status.HTTP_200_OK
    )
