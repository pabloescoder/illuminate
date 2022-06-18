from django.shortcuts import render

# Create your views here.
from userPosts import models
from rest_framework import permissions, generics, status
from rest_framework.response import Response

from rest_framework.generics import (
    ListAPIView,
    CreateAPIView,
    RetrieveUpdateDestroyAPIView,
    ListCreateAPIView
    
)
from .serializers import PostSerializer, CommentSerializer, CommentLikesSerializer, PostLikeSerializer, AddLikesSerializer
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

class AddLikesView(CreateAPIView):
    serializer_class = PostLikeSerializer
    permission_classes = (
        permissions.IsAuthenticated,
    )
    parser_classes = [MultiPartParser, FormParser]

    def perform_create(self, serializer, format=None):
        return serializer.save(like_author=self.request.user)

# class PostLikesView(generics.GenericAPIView):
#     serializer_class = PostLikeSerializer
#     queryset = models.Comments.objects.all()
#     permission_classes = (
#         permissions.IsAuthenticated,
#     )

    # def patch(self, request):
    #     serializer = self.serializer_class(data=request.data)
    #     id = request.data["post_id"]
    #     user = models.Posts.objects.get(id=id)
    #     serializer.is_valid(raise_exception=True)
    #     try:
    #         # l1 = models.PostLikes.objects.get(post_id=id, like_author=request.user)
    #         # if l1.like==True:
    #         #     like = user.likes
    #         #     user.likes = like-1
    #         #     l1.like = False
    #         #     user.save()
    #         # else:
    #         #     like = user.likes
    #         #     user.likes = like+1
    #         #     AddLikesView.create(self, serializer)
    #         #     user.save()
            
    #         user.likes = user.likes+1
    #         return Response(serializer.data, status=status.HTTP_200_OK)
    #     except Exception as e:
    #         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
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

# class ReadCommentView(generics.GenericAPIView):
#     serializer_class = CommentSerializer
#     queryset = models.Comments.objects.all()
    
#     def get(self, request, id, *args, **kwargs):
#         try:
#             return JsonResponse(self.serializer_class(self.queryset.filter(id=id)).data)
#         except Exception as e:
#             return Response(status=status.HTTP_400_BAD_REQUEST)
    
    

        
        
