from pyexpat import model
from rest_framework import serializers
from userPosts.models import Posts
from userPosts.models import Comments
from userPosts.models import PostLikes


class PostSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    is_happy = serializers.BooleanField(required=True)
    post_title = serializers.CharField(max_length=200, required=True)
    post_description = serializers.CharField(required=False)
    post_image = serializers.ImageField(required=False)
    upload_date = serializers.DateField(read_only=True)
    likes = serializers.IntegerField(read_only=True)

    class Meta:
        model = Posts
        fields = [
            "id",
            "is_happy",
            "post_title",
            "post_description",
            "post_image",
            "upload_date",
            "likes"
        ]
        

class PostLikeSerializer(serializers.ModelSerializer):
    # like = serializers.BooleanField(read_only=True)
    class Meta:
        model = PostLikes
        fields = [
            "post_id",
            "like", 
        ]
    def to_representation(self, instance):
        response = super().to_representation(instance)
        response["post_id"] = PostSerializer(instance.post_id).data
        return response
        

class AddLikesSerializer(serializers.ModelSerializer):
    Like = serializers.BooleanField(default=False)
    class Meta:
        model = PostLikes
        fields = [
            "Like"
        ]
    def to_representation(self, instance):
        response = super().to_representation(instance)
        response["post_id"] = PostSerializer(instance.post_id).data
        return response


class CommentSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    comment_text = serializers.CharField(max_length=200, required=True)
    # comment_date = serializers.DateField(required=True)
    # likes = serializers.IntegerField(required=False, default=0)

    class Meta:
        model = Comments
        fields = [
            "id",
            "post_id",
            "comment_text",
            # "likes",
        ]
        
    def to_representation(self, instance):
        response = super().to_representation(instance)
        response["post_id"] = PostSerializer(instance.post_id).data
        return response
    
class CommentLikesSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=False)
    class Meta:
        model = Comments
        fields = [
            "id",
        ]
        
