from rest_framework import serializers
from django.contrib.auth.models import User

from . import models


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
    # image = serializers.SerializerMethodField('get_image_url')
    
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
