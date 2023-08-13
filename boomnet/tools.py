from django.contrib.auth.models import User

from .models import Following


def check_following(request_user: User, following_user: User):
    follows = Following.objects.filter(follower=request_user, following_user=following_user)
    return len(follows) > 0
