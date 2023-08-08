from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.utils.text import slugify

from .models import Profile, Post, Comment, Topic
from .forms import AddPostForm, UserSignupForm, UserEditForm, ProfileEditForm, AddCommentForm, NewTopicForm


def index(request):
    posts = Post.objects.all().order_by('-created_at')
    topics = Topic.objects.all().order_by('-created_at')

    context = {'posts': posts, 'topics': topics}
    return render(request, 'boomnet/index.html', context)


@login_required
def view_profile(request, profile_id):
    profile = Profile.objects.get(pk=profile_id)
    user = profile.user
    posts = Post.objects.filter(profile=user).order_by('-created_at')
    context = {"profile": profile, "posts": posts, 'user': user}
    return render(request, 'boomnet/view_profile.html', context)


@login_required
def edit_profile(request):
    if request.method != 'POST':
        profile_edit_form = ProfileEditForm(instance=request.user.profile)
        user_edit_form = UserEditForm(instance=request.user)

    else:
        user_edit_form = UserEditForm(instance=request.user,
                                      data=request.POST,
                                      )
        profile_edit_form = ProfileEditForm(instance=request.user.profile,
                                            data=request.POST,
                                            files=request.FILES,
                                            )

        if user_edit_form.is_valid() and profile_edit_form.is_valid():
            user_edit_form.save()
            profile_edit_form.save()
            messages.success(request, 'Profile updated successfully')
            return redirect('boomnet:view_profile', request.user.profile.id)

        else:
            messages.error(request, 'Error during updating ur profile')

    context = {'profile_edit_form': profile_edit_form, 'user_edit_form': user_edit_form}
    return render(request, 'boomnet/edit_profile.html', context)


@login_required
def upload_post(request):
    if request.method != 'POST':
        post_form = AddPostForm()

    else:
        post_form = AddPostForm(request.POST, request.FILES)
        if post_form.is_valid():
            new_post = post_form.save(commit=False)
            new_post.profile = request.user
            new_post.save()
            messages.success(request, 'New post created successfully')

            return redirect('boomnet:index')

    context = {'post_form': post_form}
    return render(request, 'boomnet/upload_post.html', context)


@login_required
def search_users(request):
    query = request.GET.get('query')
    users = User.objects.filter(username__startswith=query)

    context = {'users': users, 'query': query}
    return render(request, 'boomnet/search_users.html', context)


@login_required
def post_detail(request, post_id):
    post = Post.objects.get(pk=post_id)
    comments = Comment.objects.filter(post_id=post_id).order_by('-created_at')
    if request.method != 'POST':
        form = AddCommentForm()

    else:
        form = AddCommentForm(request.POST, request.FILES)
        post = Post.objects.get(pk=post_id)
        if form.is_valid():
            comment = form.save(commit=False)
            comment.author = request.user
            comment.post = post
            comment.save()

        return redirect('boomnet:post_detail', post_id)

    context = {'form': form, 'post': post, 'comments': comments}
    return render(request, 'boomnet/post_detail.html', context)


@login_required
def new_topic(request):
    if request.method != 'POST':
        form = NewTopicForm()

    else:
        form = NewTopicForm(request.POST, request.FILES)
        if form.is_valid():
            topic = form.save(commit=False)
            topic.author = request.user
            topic.slug = slugify(topic.title)
            topic.save()

        return redirect('boomnet:index')

    context = {'form': form}
    return render(request, 'boomnet/new_topic.html', context)


def view_topic(request, slug):
    topic = Topic.objects.get(slug=slug)
    posts = Post.objects.filter(topic=topic)

    context = {'topic': topic, 'posts': posts}
    return render(request, 'boomnet/view_topic.html', context)


def sign_up(request):
    if request.method != 'POST':
        user_form = UserSignupForm()

    else:
        user_form = UserSignupForm(request.POST)
        if user_form.is_valid():
            new_user = user_form.save(commit=False)
            new_user.set_password(user_form.cleaned_data['password'])
            new_user.save()

            Profile.objects.create(user=new_user)
            context = {'new_user': new_user}
            return render(request, 'boomnet/sign_up_done.html', context)

    context = {'user_form': user_form}
    return render(request, 'boomnet/sign_up.html', context)


def sign_up_done(request):
    profile = Profile.objects.all().order_by('-created_at')[0]
    context = {'profile': profile}

    return render(request, 'boomnet/sign_up_done.html', context)



