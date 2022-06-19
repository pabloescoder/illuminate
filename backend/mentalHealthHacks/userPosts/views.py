from django.shortcuts import render
from django.core import serializers
# Create your views here.
from userPosts import models
from rest_framework import permissions, generics, status, viewsets
from rest_framework.response import Response
from django.http import JsonResponse, HttpResponse

from rest_framework.generics import (
    ListAPIView,
    CreateAPIView,
    RetrieveUpdateDestroyAPIView,
    ListCreateAPIView,
    RetrieveUpdateAPIView,
    
)
from .serializers import (
    PostSerializer, 
    CommentSerializer, 
    UpdatePostLikeSerializer, 
    PostLikeSerializer,
    UpdateLikeNumberSerializer
)
from rest_framework.parsers import MultiPartParser, FormParser


# Create your views here.
class CreatePostView(ListCreateAPIView):
    serializer_class = PostSerializer
    queryset = models.Posts.objects.all()
    permission_classes = (
        permissions.IsAuthenticated,
    )
    parser_classes = [MultiPartParser, FormParser]

    def perform_create(self, serializer, format=None):
        return serializer.save(username=self.request.user)
    
    def get_queryset(self):
        return self.queryset.filter(username=self.request.user)

class AddLikesView(ListCreateAPIView):
    serializer_class = PostLikeSerializer
    queryset = models.PostLikes.objects.all()
    permission_classes = (
        permissions.IsAuthenticated,
    )
    parser_classes = [MultiPartParser, FormParser]

    def perform_create(self, serializer, format=None):
        return serializer.save(like_author=self.request.user)
  
    
    
class ReadLikeView(ListAPIView):
    serializer_class = PostLikeSerializer
    queryset = models.PostLikes.objects.all()
    def list(self,request,id):
        queryset = models.PostLikes.objects.filter(post_id=id,like_author=self.request.user)
        data = serializers.serialize('json', queryset)
        return HttpResponse(data, content_type='application/json')
    
class UpdateLikeStatusView(generics.GenericAPIView):
    serializer_class = UpdatePostLikeSerializer
    queryset = models.PostLikes.objects.all()
    permission_classes = (
        permissions.IsAuthenticated,
    )
    parser_classes = [MultiPartParser, FormParser]

    def patch(self, request):
        serializer = self.serializer_class(data=request.data)
        id = request.data['pk']
        user = models.PostLikes.objects.get(pk=id)
        serializer.is_valid(raise_exception=True)
        try:
            user.like = False
            user.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

  
class UpdateLikeNumberView(generics.GenericAPIView):
    serializer_class = UpdateLikeNumberSerializer
    queryset = models.PostLikes.objects.all()
    permission_classes = (
        permissions.IsAuthenticated,
    )
    parser_classes = [MultiPartParser, FormParser]

    def patch(self, request):
        serializer = self.serializer_class(data=request.data)
        id = request.data['id']
        ln = request.data['likes']
        user = models.Posts.objects.get(id=id)
        serializer.is_valid(raise_exception=True)
        try:
            user.likes = ln
            user.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class ListCurrentUserPostsView(ListAPIView):
    serializer_class = PostSerializer
    queryset = models.Posts.objects.all()
    
    permission_classes = (
        permissions.IsAuthenticated,
    )
    parser_classes = [MultiPartParser, FormParser]

    def get_queryset(self):
        return self.queryset.filter(username=self.request.user)


class ListAllUsersPostsView(ListAPIView):
    serializer_class = PostSerializer
    parser_classes = [MultiPartParser, FormParser]
    queryset = models.Posts.objects.all()

    def display_queryset(self):
        return self.queryset.all()

class CreateCommentView(CreateAPIView):
    serializer_class = CommentSerializer
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = (
        permissions.IsAuthenticated,
    )
    def perform_create(self, serializer, format=None):
        return serializer.save(comment_author=self.request.user)

class ReadCommentView(ListAPIView):
    serializer_class = CommentSerializer
    queryset = models.Comments.objects.all()
    def list(self,request,id):
        queryset = models.Comments.objects.filter(post_id=id)
        data = serializers.serialize('json', queryset)
        return HttpResponse(data, content_type='application/json')        
