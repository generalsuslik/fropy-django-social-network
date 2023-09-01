from django.contrib import admin

from . import models


admin.site.register(models.Profile)
admin.site.register(models.Post)
admin.site.register(models.Comment)
admin.site.register(models.Topic)
admin.site.register(models.Following)
admin.site.register(models.Subscription)
admin.site.register(models.UserBookmarking)
admin.site.register(models.Vote)
