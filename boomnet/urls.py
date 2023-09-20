from django.urls import path, include
from rest_framework.urlpatterns import format_suffix_patterns

from . import views
from . import api
from . import registration

from rest_framework_simplejwt.views import TokenRefreshView


app_name = 'boomnet'
urlpatterns = [
    path('', api.PostList.as_view()),
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('post/<slug:slug>/', api.PostDetail.as_view()),
    path('comments/', api.CommentsList.as_view()),
    path('comments/<int:user_id>/<int:post_id>/', api.CommentDetail.as_view()),
    path('users/', api.UserList.as_view()),
    path('users/<int:pk>/', api.UserDetail.as_view()),
    path('users/<int:pk>/subscriptions/', api.UserSubscriptionList.as_view()),
    # path('register/', api.UserRegister.as_view(), name='register'),
    path('register/', registration.sign_up, name='sign_up'),
    path('log-in/', api.UserLogin.as_view(), name='login'),
    path('log-out/', api.UserLogout.as_view(), name='logout'),
    path('user-view/', api.UserView.as_view(), name='user_view'),
    path('profiles/', api.ProfileList.as_view()),
    path('profiles/<slug:slug>/', api.ProfileDetail.as_view()),
    path('profiles/user/', api.UserProfile.as_view()),
    path('profiles/<slug:slug>/posts/', api.UserPostList.as_view()),
    path('topics/', api.TopicList.as_view()),
    path('topics/<slug:slug>/', api.TopicDetail.as_view()),
    path('topics/<slug:slug>/posts/', api.TopicPostsList.as_view()),
    path('topics/<slug:slug>/subscriptions/', api.TopicSubscriptionList.as_view()),
    path('subscriptions/', api.SubscriptionList.as_view()),
    path('subscriptions/<int:id>/', api.SubscriptionDetail.as_view()),
    path('votes/', api.VoteList.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)

