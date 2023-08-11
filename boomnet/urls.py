from django.urls import path, include

from . import views


app_name = 'boomnet'
urlpatterns = [
    path('', views.index, name='index'),
    path('', include('django.contrib.auth.urls')),

    path('sign-up/', views.sign_up, name='sign_up'),
    path('sign-up/done/', views.sign_up_done, name='sign_up_done'),

    path('edit-profile/', views.edit_profile, name='edit_profile'),
    path('profile/<slug:slug>/', views.view_profile, name='view_profile'),

    path('new-post/', views.upload_post, name='upload_post'),
    path('post/<slug:slug>/vote', views.vote_post, name='vote'),
    path('post/<slug:slug>/comments/<int:comment_id>/delete/', views.delete_comment, name='delete_comment'),
    path('post/<slug:slug>/', views.post_detail, name='post_detail'),

    path('topic/create/', views.new_topic, name='new_topic'),
    path('topic/<slug:slug>/', views.view_topic, name='view_topic'),
    path('topic/<slug:slug>/delete/', views.delete_topic, name='delete_topic'),
    path('topic/<slug:slug>/subscribe/', views.subscribe, name='subscribe'),
    path('topic/<slug:slug>/unsubscribe/', views.unsubscribe, name='unsubscribe'),

    path('bookmarks/', views.view_bookmarks, name='view_bookmarks'),
    path('bookmarks/add/post/<slug:slug>', views.add_post_to_bookmarks, name='add_post_to_bookmarks'),
    path('bookmarks/remove/post/<slug:slug>/', views.remove_post_from_bookmarks, name='remove_post_from_bookmarks'),

    path('search_users/', views.search_users_and_topics, name='search_users_and_topics'),
]

