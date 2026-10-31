
from django.urls import path
from . import views

urlpatterns = [
    path("register/", views.customer_register, name="customer-register"),
    path("login/", views.customer_login, name="customer-login"),
]
