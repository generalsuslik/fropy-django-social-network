from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

from .models import Post, Profile, Comment, Topic


class AddPostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ['topic', 'title', 'image', 'text']
        widgets = {'text': forms.Textarea(attrs={'cols': 80, 'rows': 10})}


class AddPostToTopicForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ['title', 'image', 'text']
        widgets = {'text': forms.Textarea(attrs={'cols': 80, 'rows': 10})}


class UserSignupForm(UserCreationForm):
    password = forms.CharField(label='Password', widget=forms.PasswordInput)
    password2 = forms.CharField(label='Repeat Password', widget=forms.PasswordInput)

    class Meta:
        model = User
        fields = ['username', 'email']

    def clean_email(self):
        data = self.cleaned_data['email']
        if User.objects.filter(email=data).exists():
            raise forms.ValidationError("Email is already in use")

        return data


class UserEditForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['username', 'email']


class ProfileEditForm(forms.ModelForm):
    class Meta:
        model = Profile
        fields = ['avatar', 'date_of_birth', 'info']
        widgets = {'info': forms.Textarea(attrs={'cols': 80, 'rows': 10})}


class AddCommentForm(forms.ModelForm):
    class Meta:
        model = Comment
        fields = ['image', 'text']
        widgets = {'text': forms.Textarea(attrs={'cols': 80, 'rows': 4})}


class NewTopicForm(forms.ModelForm):
    class Meta:
        model = Topic
        fields = ['title', 'image', 'description']
        widgets = {'description': forms.Textarea(attrs={'cols': 75, 'rows': 4})}






