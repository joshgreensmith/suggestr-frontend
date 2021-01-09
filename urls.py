from django.urls import path, re_path
from . import views

# Refactor this with hash router -> removed all urls?
urlpatterns = [
    path('', views.index),
]
