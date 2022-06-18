# Importing the djongo models.
from django.db import models
# from djongo import models

# Create your models here.
'''
class Comments(models.Model):
    username = models.ForeignKey(
    )

    comment_description = models.TextField(
        blank=False,
    )

    likes = models.IntegerField(
        blank=False,
        # null=False,
        default=0,
        verbose_name="Number of Likes",
    )
'''

class Posts(models.Model):

    # The Meta class is a class that holds meta data about the class
    class Meta:
        verbose_name = "User's Post"
        verbose_name_plural = "User's Post"

    is_happy = models.BooleanField(
        default=False,
    )

    post_title = models.CharField(
        max_length=200,
        blank=False,
        verbose_name="Title",
    )

    post_description = models.TextField(
        blank=True,
        null=True,
        verbose_name="Description",
    )

    '''
    username = models.ForeignKey(
        NewUser,
        unique=False,
        on_delete=models.PROTECT,
        verbose_name=_("Post Author Username"),
    )
    '''

    post_image = models.ImageField(
        upload_to="postImages",
        blank=True,
        null=True,
        verbose_name="Image",
    )

    upload_date = models.DateField(
        blank=False,
        # null=False,
        verbose_name="Date",
    )

    likes = models.IntegerField(
        blank=False,
        # null=False,
        default=0,
        verbose_name="Number of Likes",
    )

    '''
    comments = models.ArrayField(
        model_container=Comments,
    )
    '''
