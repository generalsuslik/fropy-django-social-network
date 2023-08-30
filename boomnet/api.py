from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework import viewsets

from . import models
from . import serializers


class PostList(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, format=None):
        posts = models.Post.objects.all().order_by('-created_at')
        serializer = serializers.PostSerializer(posts, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = serializers.PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


class PostDetail(APIView):
    def get_object(self, slug):
        try:
            return models.Post.objects.get(slug=slug)
        except models.Post.DoesNotExist:
            raise Http404

    def get(self, request, slug, format=None):
        post = self.get_object(slug)
        serializer = serializers.PostSerializer(post)
        return Response(serializer.data)

    def put(self, request, slug, format=None):
        post = self.get_object(slug)
        serializer = serializers.PostSerializer(post, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, slug, format=None):
        post = self.get_object(slug)
        post.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    
class UserList(APIView):
    def get(self, request, format=None):
        users = User.objects.all().order_by('id')
        serializer = serializers.UserSerializer(users, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = serializers.UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
class UserDetail(APIView):
    def get_object(self, pk):
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        user = self.get_object(pk)
        serializer = serializers.UserSerializer(user)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        user = self.get_object(pk)
        serializer = serializers.UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        user = self.get_object(pk)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    
class ProfileList(APIView):
    def get(self, request, format=None):
        profiles = models.Profile.objects.all().order_by('id')
        serializer = serializers.ProfileSerializer(profiles, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = serializers.ProfileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
    
class ProfileDetail(APIView):
    def get_object(self, slug):
        try:
            return models.Profile.objects.get(slug=slug)
        except models.Profile.DoesNotExist:
            raise Http404

    def get(self, request, slug, format=None):
        profile = self.get_object(slug)
        serializer = serializers.ProfileSerializer(profile)
        return Response(serializer.data)

    def put(self, request, slug, format=None):
        profile = self.get_object(slug)
        serializer = serializers.ProfileSerializer(profile, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, slug, format=None):
        profile = self.get_object(slug)
        profile.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    
class UserProfile(APIView):
    """Describes reqeuest user profile"""
    def get_object(self, request):
        try:
            return models.Profile.objects.get(user=request.user)
        except models.Profile.DoesNotExist:
            raise Http404

    def get(self, request, slug, format=None):
        profile = self.get_object(request)
        serializer = serializers.ProfileSerializer(profile)
        return Response(serializer.data)

    def put(self, request, slug, format=None):
        profile = self.get_object(request)
        serializer = serializers.ProfileSerializer(profile, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, slug, format=None):
        profile = self.get_object(request)
        profile.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    
class TopicList(APIView):
    def get(self, request, format=None):
        topics = models.Topic.objects.all().order_by('id')
        serializer = serializers.TopicSerializer(topics, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = serializers.TopicSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
class TopicDetail(APIView):
    def get_object(self, slug):
        try:
            return models.Topic.objects.get(slug=slug)
        except models.Topic.DoesNotExist:
            raise Http404

    def get(self, request, slug, format=None):
        topic = self.get_object(slug)
        serializer = serializers.TopicSerializer(topic)
        return Response(serializer.data)

    def put(self, request, slug, format=None):
        topic = self.get_object(slug)
        serializer = serializers.TopicSerializer(topic, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, slug, format=None):
        topic = self.get_object(slug)
        topic.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    
class CommentsList(APIView):
    def get(self, request, format=None):
        comments = models.Comment.objects.all().order_by('-created_at')
        serializer = serializers.CommentSerializer(comments, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = serializers.CommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
class PostCommentsList(APIView):
    def get(self, request, post_slug, format=None):
        post = models.Post.objects.get(slug=post_slug)
        comments = models.Comment.objects.filter(post=post).order_by('-created_at')
        serializer = serializers.CommentSerializer(comments, many=True)
        
        return Response(serializer.data)
    
    def post(self, request, post_slug, format=None):
        serializer = serializers.CommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class CommentDetail(APIView):
    def get_object(self, user_id, post_id, created_at):
        try:
            user = User.objects.get(pk=user_id)
            post = User.objects.get(pk=post_id)
            return models.Comment.objects.get(author=user, post=post, created_at=created_at)
        except models.Topic.DoesNotExist:
            raise Http404

    def get(self, request, user_id, post_id, created_at, format=None):
        comment = self.get_object(user_id, post_id, created_at)
        serializer = serializers.CommentSerializer(comment)
        return Response(serializer.data)

    def put(self, request, user_id, post_id, created_at, format=None):
        comment = self.get_object(user_id, post_id, created_at)
        serializer = serializers.CommentSerializer(comment, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, user_id, post_id, created_at, format=None):
        comment = self.get_object(user_id, post_id, created_at)
        comment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    
class SubscriptionList(APIView):
    def get(self, request, format=None):
        subscriptions = models.Subscription.objects.all().order_by('-created_at')
        serializer = serializers.SubscriptionSerializer(subscriptions, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = serializers.SubscriptionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
class SubscriptionDetail(APIView):
    def get_object(self, id):
        try:
            return models.Subscription.objects.get(pk=id)
        except models.Subscription.DoesNotExist:
            raise Http404

    def get(self, request, id, format=None):
        subscription = self.get_object(id)
        serializer = serializers.SubscriptionSerializer(subscription)
        return Response(serializer.data)

    def put(self, request, id, format=None):
        subscription = self.get_object(id)
        serializer = serializers.SubscriptionSerializer(subscription, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id, format=None):
        subscription = self.get_object(id)
        subscription.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
  
    