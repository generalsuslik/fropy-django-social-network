from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model, authenticate
from django.utils.text import slugify
from django.core.exceptions import ValidationError

from . import models


from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        data['username'] = self.user.username
        data['email'] = self.user.email
        return data
    

class DummyUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ("password", )


class ProfileSerializer(serializers.ModelSerializer):    
    user = DummyUserSerializer()
    
    class Meta:
        model = models.Profile
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()
    
    class Meta:
        model = User
        fields = ['id', 'username', 'profile']
        

class TopicSerializer(serializers.ModelSerializer):
    author = UserSerializer()
    
    class Meta:
        model = models.Topic
        fields = '__all__'
        

class PostSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    topic = TopicSerializer()
    image = serializers.SerializerMethodField('get_image_url')
    
    class Meta:
        model = models.Post
        fields = '__all__'
        
    def get_image_url(self, obj):
        return obj.image.url
    
    
class CommentSerializer(serializers.ModelSerializer):
    author = UserSerializer()
    post = PostSerializer()
    
    class Meta:
        model = models.Comment
        fields = '__all__'
    
    def get_image_url(self, obj):
        return obj.image.url
    
    
class SubscriptionSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    topic = TopicSerializer()
    
    class Meta:
        model = models.Subscription
        fields = "__all__"
        

class VoteSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    post = PostSerializer()
    
    class Meta:
        model = models.Vote
        fields = '__all__'
        
        
class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"
        
    def create(self, clean_data):
        user_obj = User.objects.create_user(email=clean_data['email'], password=clean_data['password'])
        user_obj.username = clean_data.username
        user_obj.save()
        profile_obj = models.Profile.objects.create(user=user_obj)
        profile_obj.slug = slugify(user_obj.username)
        profile_obj.save()
        
        return user_obj
    

class UserLoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()
    password = serializers.CharField()
    
    def check_user(self, clean_data):
        user = authenticate(email=clean_data['email'], password=clean_data['password'])
        if not user:
            raise ValidationError('user not found')
        
        return user
        
