from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.http import Http404
from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.utils.text import slugify

from .models import Profile, Post, Comment, Topic, Subscription, UserBookmarking, Following, Vote
from .forms import AddPostForm, UserSignupForm, UserEditForm, ProfileEditForm, AddCommentForm, NewTopicForm

from . import tools


def index(request):
    posts = Post.objects.all().order_by('-created_at')
    topics = Topic.objects.order_by('-created_at')
    subscriptions = Subscription.objects.filter(user=request.user).order_by('-created_at')
    subscribed_topics = []
    for subscription in subscriptions:
        subscribed_topics.append(subscription.topic)

    if request.user.is_authenticated:
        bookmarks = UserBookmarking.objects.filter(user=request.user)
        bookmarked_posts = []
        for bookmark in bookmarks:
            post = Post.objects.get(id=bookmark.post.id)
            bookmarked_posts.append(post)

        context = {'posts': posts, 'bookmarked_posts': bookmarked_posts,
                   'subscribed_topics': subscribed_topics}

    else:
        context = {'posts': posts, 'topics': topics, 'subscribed_topics': subscribed_topics}

    return render(request, 'boomnet/index.html', context)


@login_required
def view_profile(request, slug):
    profile = Profile.objects.get(slug=slug)
    user = profile.user
    posts = Post.objects.filter(user=user).order_by('-created_at')

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
            return redirect('boomnet:view_profile', request.user.profile.slug)

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
            new_post.user = request.user
            new_post.save()
            new_post.slug = slugify(new_post.title)

            return redirect('boomnet:index')

    context = {'post_form': post_form}
    return render(request, 'boomnet/upload_post.html', context)


@login_required
def search_users_and_topics(request):
    query = request.GET.get('query').lower()
    users = User.objects.filter(username__startswith=query)
    topics = Topic.objects.filter(title__startswith=query)

    context = {'topics': topics, 'users': users, 'query': query}
    return render(request, 'boomnet/search_users_and_topics.html', context)


@login_required
def post_detail(request, slug):
    post = Post.objects.get(slug=slug)
    comments = Comment.objects.filter(post__slug=slug).order_by('-created_at')
    if request.method != 'POST':
        form = AddCommentForm()

    else:
        form = AddCommentForm(request.POST, request.FILES)
        post = Post.objects.get(slug=slug)
        if form.is_valid():
            comment = form.save(commit=False)
            comment.author = request.user
            comment.post = post
            comment.save()

        return redirect('boomnet:post_detail', slug)

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


@login_required
def delete_topic(request, slug):
    topic = Topic.objects.get(slug=slug)
    if request.user != topic.author:
        return Http404

    else:
        topic.delete()
        return redirect('boomnet:index')


@login_required
def view_topic(request, slug):
    topic = Topic.objects.get(slug=slug)
    posts = Post.objects.filter(topic=topic)
    subscribers = len(Subscription.objects.filter(topic=topic))
    subscription_exists = True if Subscription.objects.filter(user=request.user, topic=topic) else False
    is_author = request.user == topic.author

    context = {'topic': topic,
               'posts': posts,
               'subscribers': subscribers,
               'subscription_exists': subscription_exists,
               'is_author': is_author,
               }
    return render(request, 'boomnet/view_topic.html', context)


@login_required
def vote_post(request, slug):
    if request.method != "POST":
        return

    vote_type = request.POST.get('vote_type')
    post = Post.objects.get(slug=slug)

    if Vote.objects.filter(user=request.user, post=post).exists():
        vote = Vote.objects.get(user=request.user, post=post)
        if vote.vote_type == vote_type:
            vote.delete()
            if vote_type == 'upvote':
                post.total_votes -= 1

            else:
                post.total_votes += 1

        else:
            vote.delete()
            vote = Vote(user=request.user, post=post, vote_type=vote_type)
            vote.save()
            if vote_type == 'upvote':
                post.total_votes += 2

            else:
                post.total_votes -= 2

    else:
        vote = Vote(user=request.user, post=post, vote_type=vote_type)
        vote.save()
        if vote_type == 'upvote':
            post.total_votes += 1

        else:
            post.total_votes -= 1

    post.save()

    return redirect(request.META.get('HTTP_REFERER'))


@login_required
def view_bookmarks(request):
    bookmarks = UserBookmarking.objects.filter(user=request.user).order_by('-created_at')

    context = {'bookmarks': bookmarks}
    return render(request, 'boomnet/view_bookmarks.html', context)


@login_required
def add_post_to_bookmarks(request, slug):
    post = Post.objects.get(slug=slug)
    new_bookmark = UserBookmarking(user=request.user, post=post)
    new_bookmark.save()

    return redirect(request.META.get('HTTP_REFERER'))


@login_required
def remove_post_from_bookmarks(request, post_id):
    post = Post.objects.get(id=post_id)
    bookmark = UserBookmarking.objects.get(post=post, user=request.user)
    bookmark.delete()

    return redirect(request.META.get('HTTP_REFERER'))


@login_required
def subscribe(request, slug):
    topic = Topic.objects.get(slug=slug)
    subscription = Subscription(user=request.user, topic=topic)
    subscription.save()

    return redirect(request.META.get('HTTP_REFERER'))


@login_required
def unsubscribe(request, slug):
    topic = Topic.objects.get(slug=slug)
    subscription = Subscription.objects.get(user=request.user, topic=topic)
    subscription.delete()

    return redirect(request.META.get('HTTP_REFERER'))


@login_required
def follow(request, slug):
    following_profile = Profile.objects.get(slug=slug)
    following_user = following_profile.user
    new_following = Following(follower=request.user, following_user=following_user)
    new_following.save()
    following_profile.followers += 1

    check = tools.check_following(request_user=request.user, following_user=following_user)

    context = {'profile': following_profile, 'check': check}
    return render(request, 'boomnet/view_profile.html', context)


@login_required
def unfollow(request, slug):
    following_profile = Profile.objects.get(slug=slug)
    following_user = following_profile.user
    prev_following = Following.objects.get(follower=request.user, following_user=following_user)
    prev_following.delete()
    following_profile.followers -= 1

    check = tools.check_following(request_user=request.user, following_user=following_user)

    context = {'profile': following_profile, 'check': check}
    return render(request, 'boomnet/view_profile.html', context)


@login_required
def delete_comment(request, slug, comment_id):
    post = Post.objects.get(slug=slug)
    comment = Comment.objects.get(pk=comment_id, post=post)

    comment.delete()
    return redirect(request.META.get('HTTP_REFERER'))


def sign_up(request):
    if request.method != 'POST':
        user_form = UserSignupForm()

    else:
        user_form = UserSignupForm(request.POST)
        if user_form.is_valid():
            new_user = user_form.save(commit=False)
            new_user.set_password(user_form.cleaned_data['password'])
            new_user.save()

            new_profile = Profile(user=new_user)
            new_profile.save()

            context = {'new_user': new_user}
            return render(request, 'boomnet/sign_up_done.html', context)

    context = {'user_form': user_form}
    return render(request, 'boomnet/sign_up.html', context)


def sign_up_done(request):
    profile = Profile.objects.all().order_by('-created_at')[0]
    context = {'profile': profile}

    return render(request, 'boomnet/sign_up_done.html', context)



