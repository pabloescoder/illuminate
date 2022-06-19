from rest_framework import serializers
from userPosts.models import Posts
from userPosts.models import Comments
from userPosts.models import PostLikes


class PostSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='username.username')
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
            "username",
            "is_happy",
            "post_title",
            "post_description",
            "post_image",
            "upload_date",
            "likes"
        ]
        
class PostLikeSerializer(serializers.ModelSerializer):
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
        
class UpdatePostLikeSerializer(serializers.ModelSerializer):
    pk = serializers.IntegerField(read_only=False)
    
    class Meta:
        model = PostLikes
        fields = [
            "pk", 
        ]

class UpdateLikeNumberSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=False)
    class Meta:
        model = Posts
        fields = [
            "id",
            "likes",
        ]
   

class CommentSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    comment_author = serializers.ReadOnlyField(source='comment_author.username')
    comment_text = serializers.CharField(max_length=200, required=True)
   
    class Meta:
        model = Comments
        fields = [
            "id",
            "comment_author",
            "post_id",
            "comment_text",
        ]
        
    def to_representation(self, instance):
        response = super().to_representation(instance)
        response["post_id"] = PostSerializer(instance.post_id).data
        return response