from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from . import views
from . import api


urlpatterns = [
    path('', api.PostList.as_view()),
    path('post/<slug:slug>/', api.PostDetail.as_view()),
    path('users/', api.UserList.as_view()),
    path('user/<int:pk>/', api.UserDetail.as_view()),
    path('profiles/', api.ProfileList.as_view()),
    path('profiles/<slug:slug>/', api.ProfileDetail.as_view()),
    path('profiles/user/', api.UserProfile.as_view()),
    path('topics/', api.TopicList.as_view()),
    path('topics/<slug:slug>/', api.TopicDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
