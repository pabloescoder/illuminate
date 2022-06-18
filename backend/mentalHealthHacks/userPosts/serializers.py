from rest_framework import serializers
from userPosts.models import Posts


class PostSerializer(serializers.ModelSerializer):
    id = serializers.CharField(max_length=100)
    is_happy = serializers.BooleanField(required=True)
    post_title = serializers.CharField(max_length=200, required=True)
    post_description = serializers.TextField(required=False)
    post_image = serializers.ImageField(required=False)
    upload_date = serializers.DateField(required=True)
    likes = serializers.IntegerField(required=True)
    comments = serializers.ArrayField(required=False)

    class Meta:
        model = Posts
        fields = [
            "id",
            "is_happy",
            "post_title",
            "post_description",
            "post_image",
            "upload_date",
            "likes",
            "comments",
        ]
