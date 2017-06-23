from .api import LoginView, LogoutView
from django.conf.urls import url


urlpatterns = [
    url(r'^login/$', LoginView.as_view()),
    url(r'^logout/$', LogoutView.as_view())
]