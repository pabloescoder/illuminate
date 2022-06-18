from django.shortcuts import render

# Create your views here.
from userPosts import models
from rest_framework import permissions
from rest_framework.generics import (
    ListAPIView,
    CreateAPIView,
)
from .serializers import PostSerializer
from rest_framework.parsers import MultiPartParser, FormParser


# Create your views here.
class CreatePostView(CreateAPIView):
    serializer_class = PostSerializer
    permission_classes = (
        permissions.IsAuthenticated,
    )
    parser_classes = [MultiPartParser, FormParser]

    def create(self, serializer, format=None):
        return serializer.save(username=self.request.user)


class ListCurrentUserPostsView(ListAPIView):
    serializer_class = PostSerializer
    permission_classes = (
        permissions.IsAuthenticated,
    )
    parser_classes = [MultiPartParser, FormParser]

    def display_queryset(self):
        return self.queryset.filter(username=self.request.user)


class ListAllUsersPostsView(ListAPIView):
    serializer_class = PostSerializer
    parser_classes = [MultiPartParser, FormParser]
    queryset = models.Posts.objects.all()

    def display_queryset(self):
        return self.queryset.filter()
