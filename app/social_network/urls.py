from django.urls import include, path
from django.contrib.auth import views as auth_views

from . import views


app_name = "social_network"
urlpatterns = [
    path("", views.index, name="index"),
    path("", include("django.contrib.auth.urls")),
    path("sign-up/", views.sign_up, name="sign_up"),
]

