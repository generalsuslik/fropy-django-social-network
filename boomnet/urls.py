from django.urls import path, include
from rest_framework.urlpatterns import format_suffix_patterns

from . import views
from . import api


app_name = 'boomnet'
urlpatterns = [
#     path('', views.index, name='index'),
#     path('', include('django.contrib.auth.urls')),

#     path('sign-up/', views.sign_up, name='sign_up'),
#     path('sign-up/done/', views.sign_up_done, name='sign_up_done'),

#     path('edit-profile/', views.edit_profile, name='edit_profile'),
#     path('profile/<slug:slug>/', views.view_profile, name='view_profile'),

#     path('new-post/', views.upload_post, name='upload_post'),
#     path('post/<slug:slug>/vote', views.vote_post, name='vote'),
#     path('post/<slug:slug>/comments/<int:comment_id>/delete/', views.delete_comment, name='delete_comment'),
#     path('post/<slug:slug>/', views.post_detail, name='post_detail'),
#     path('topic/<slug:topic_slug>/post/create', views.add_post_to_topic, name='add_post_to_topic'),

#     path('topic/create/', views.new_topic, name='new_topic'),
#     path('topic/<slug:slug>/', views.view_topic, name='view_topic'),
#     path('topic/<slug:slug>/delete/', views.delete_topic, name='delete_topic'),
#     path('topic/<slug:slug>/subscribe/', views.subscribe, name='subscribe'),
#     path('topic/<slug:slug>/unsubscribe/', views.unsubscribe, name='unsubscribe'),

#     path('bookmarks/', views.view_bookmarks, name='view_bookmarks'),
#     path('bookmarks/add/post/<slug:slug>', views.add_post_to_bookmarks, name='add_post_to_bookmarks'),
#     path('bookmarks/remove/post/<slug:slug>/', views.remove_post_from_bookmarks, name='remove_post_from_bookmarks'),

#     path('search_users/', views.search_users_and_topics, name='search_users_and_topics'),
#     path('profile/<slug:slug>/settings/', views.view_settings, name='view_settings'),

#     path('profile/<slug:slug>/follow/', views.follow, name='follow'),
#     path('profile/<slug:slug>/unfollow/', views.unfollow, name='unfollow'),
    path('', api.PostList.as_view()),
    path('post/<slug:slug>/', api.PostDetail.as_view()),
    path('comments/', api.CommentsList.as_view()),
    path('post/<slug:post_slug>/comments/', api.PostCommentsList.as_view()),
    path('comments/<int:user_id>/<int:post_id>/', api.CommentDetail.as_view()),
    path('users/', api.UserList.as_view()),
    path('users/<int:pk>/', api.UserDetail.as_view()),
    path('users/<int:pk>/subscriptions/', api.UserSubscriptionList.as_view()),
    path('profiles/', api.ProfileList.as_view()),
    path('profiles/<slug:slug>/', api.ProfileDetail.as_view()),
    path('profiles/user/', api.UserProfile.as_view()),
    path('topics/', api.TopicList.as_view()),
    path('topics/<slug:slug>/', api.TopicDetail.as_view()),
    path('topics/<slug:slug>/subscriptions/', api.TopicSubscriptionList.as_view()),
    path('subscriptions/', api.SubscriptionList.as_view()),
    path('subscriptions/<int:id>/', api.SubscriptionDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)

