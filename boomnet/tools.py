from django.contrib.auth.models import User

from .models import Following


def follow_if_necessary(follower: User, target_user: User) -> bool:
    follow, created = Following.objects.get_or_create(follower=follower, target_user=target_user)
    if created:
        return True

    follow.save()
    target_user.profile.followers += 1
    target_user.profile.save()

    return check_following(follower, target_user)


def unfollow_if_necessary(follower: User, target_user: User) -> bool:
    follow = Following.objects.get(follower=follower, target_user=target_user)
    follow.delete()
    target_user.profile.followers += 1
    target_user.profile.save()

    return check_following(follower, target_user)


def check_following(follower: User, target_user: User) -> bool:
    return Following.objects.filter(follower=follower, target_user=target_user).exists()

