from django.contrib.auth.models import User
from django.db import models
from django.db.models.signals import post_save
from django.utils.text import slugify


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    avatar = models.ImageField(null=False, blank=False, upload_to='avatars', default='default/default_av.png')
    date_of_birth = models.DateField(blank=True, null=True)
    bio = models.TextField(null=True, blank=True)
    slug = models.SlugField(unique=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        self.slug = slugify(self.user.username)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.user.username


class Following(models.Model):
    """Model describing user-follow-user relationship"""
    follower = models.ForeignKey(User, related_name='follower', on_delete=models.CASCADE)
    target_user = models.ForeignKey(User, related_name='target_user', on_delete=models.CASCADE)

    created_at = models.DateTimeField(auto_now_add=True)


class Topic(models.Model):
    """Topic database model"""
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    author = models.ForeignKey(User, on_delete=models.PROTECT)
    image = models.ImageField(null=True, blank=True, upload_to='topic_images')
    slug = models.SlugField(unique=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


class Post(models.Model):
    """Post database model. Post doesn't have to be necessarily in topic"""
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    image = models.ImageField(upload_to='images/%Y/%m/', null=True, blank=True)
    text = models.TextField(blank=True, null=True)
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE, blank=True, null=True)
    slug = models.SlugField(unique=True, null=False, blank=False)
    total_votes = models.IntegerField(default=0)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ("-created_at",)

    def save(self, *args, **kwargs):
        self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


class Vote(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    vote_type = models.CharField(max_length=9, default="None")

    created_at = models.DateTimeField(auto_now_add=True)


class Comment(models.Model):
    """Comment database model. User can comment posts"""
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='images/%Y/%m/', null=True, blank=True)
    text = models.TextField(blank=True)
    # parent_comment = models.ForeignKey(Comment, null=True, on_delete=models.CASCADE)

    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)


class Subscription(models.Model):
    """Model, representing user-subscribe-to-topic relationship"""
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE)

    created_at = models.DateTimeField(auto_now_add=True)


class UserBookmarking(models.Model):
    """Adding post to user's bookmarks. Creating user-post relationship"""
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)

    created_at = models.DateTimeField(auto_now_add=True)


def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
    instance.profile.save()


post_save.connect(create_user_profile, sender=User)
