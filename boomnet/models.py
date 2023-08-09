from django.db import models
from django.contrib.auth.models import User


class Profile(models.Model):
    """User's profile database model"""
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    avatar = models.ImageField(null=True, blank=True, upload_to='avatars')
    date_of_birth = models.DateField(blank=True, null=True)
    info = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.username


class Topic(models.Model):
    """Topic database model"""
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    author = models.ForeignKey(User, on_delete=models.PROTECT)
    image = models.ImageField(null=True, blank=True, upload_to='topic_images')
    slug = models.SlugField(unique=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class Post(models.Model):
    """Post database model. Post doesn't have to be necessarily in topic"""
    profile = models.ForeignKey(User, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='images/%Y/%m/', null=True, blank=True)
    text = models.TextField(blank=True)
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE, blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)


class Comment(models.Model):
    """Comment database model. User can comment posts"""
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='images/%Y/%m/', null=True, blank=True)
    text = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)


class Subscription(models.Model):
    """Model, representing user-subscribe-to-topic relationship"""
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE)


class UserBookmarking(models.Model):
    """Adding post to user's bookmarks. Creating user-post relationship"""
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)








