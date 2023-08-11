from django.db.models.signals import post_save, pre_save
from django.contrib.auth.models import User
from django.dispatch import receiver
from django.utils.text import slugify

from .models import Profile, Post, Topic


@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    if created:
        new_profile = Profile(user=instance)
        new_profile.slug = instance.username
        new_profile.save()


@receiver(pre_save, sender=Post)
def add_slug(sender, instance, *args, **kwargs):
    if not instance.slug:
        instance.slug = slugify(instance.title)


