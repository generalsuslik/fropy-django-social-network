from django.shortcuts import render

from . import models, forms


def index(request):
    posts = models.Post.objects.all()

    context = {"posts": posts}
    return render(request, "social_network/index.html", context=context)


def sign_up(request):
    if request.method != "POST":
        user_form = forms.UserSignUpForm()

    else:
        user_form = forms.UserSignUpForm(request.POST)
        if user_form.is_valid():
            new_user = user_form.save(commit=False)
            new_user.set_password(user_form.cleaned_data["password"])
            new_user.save()

            context = {"new_user": new_user}
            return render(request, "social_network/sign_up_done.html", context)

    context = {"user_form": user_form}
    return render(request, "social_network/sign_up.html", context)
