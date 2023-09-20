from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password


@api_view(['POST'])
def sign_up(request):
    email = request.data.get('email', None)
    password = request.data.get('password', None)
    username = request.data.get('username', None)
    if not (email and password and username):
        return Response({'error': 'Please provide all required fields'}, status=status.HTTP_400_BAD_REQUEST)
    
    if User.objects.filter(email=email, username=username).exists():
        return Response({'error': 'User with this email or username already exists'}, status=status.HTTP_400_BAD_REQUEST)
    
    hashed_password = make_password(password=password)
    user = User.objects.create(email=email, username=username, password=hashed_password)
    
    return Response({'success': 'User signed up successfully', 'token': 'your token here'}, status=status.HTTP_201_CREATED)


    
