from django.urls import path, include

from . import views


app_name = 'boomnet'
urlpatterns = [
    path('', views.index, name='index'),
    path('profile/<int:profile_id>/', views.view_profile, name='view_profile'),
    path('new-post/', views.upload_post, name='upload_post'),
    path('', include('django.contrib.auth.urls')),
    path('sign-up/', views.sign_up, name='sign_up'),
    path('sign-up/done/', views.sign_up_done, name='sign_up_done'),
    path('edit-profile/', views.edit_profile, name='edit_profile'),
    path('search_users/', views.search_users, name='search_users'),
    path('post/<int:post_id>/', views.post_detail, name='post_detail'),
    path('topic/create/', views.new_topic, name='new_topic'),
    path('topic/<slug:slug>/', views.view_topic, name='view_topic'),
]

