from django.shortcuts import render

from . import models


def index(request):
    posts = models.Post.objects.all()

    context = {"posts": posts}
    return render(request, "social_network/index.html", context=context)
