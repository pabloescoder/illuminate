# Importing the djongo models.
from datetime import datetime
from django.db import models
import datetime

from users.models import NewUser

# Create your models here.
from django.utils.translation import gettext_lazy as _


    


class Posts(models.Model):

    # The Meta class is a class that holds meta data about the class
    class Meta:
        verbose_name = "User's Post"
        verbose_name_plural = "User's Post"

    is_happy = models.BooleanField(
        default=False,
    )

    post_title = models.CharField(
        max_length=400,
        blank=False,
        verbose_name="Title",
    )

    post_description = models.TextField(
        blank=True,
        null=True,
        verbose_name="Description",
    )


    username = models.ForeignKey(
        NewUser,
        unique=False,
        on_delete=models.PROTECT,
        verbose_name=_("Post Author Username"),
    )
    

    post_image = models.ImageField(
        upload_to="postImages",
        blank=True,
        null=True,
        verbose_name="Image",
    )

    upload_date = models.DateField(_("Date"), default=datetime.date.today)
    likes = models.IntegerField(
        blank=False,
        # null=False,
        default=0,
        verbose_name="Number of Likes",
    )
   

class Comments(models.Model):
    comment_author = models.ForeignKey(
        NewUser,
        unique=False,
        on_delete=models.PROTECT,
        verbose_name=_("Comment Author"),
        
    )

    comment_text = models.TextField(
        blank=False,
    )

    
    post_id = models.ForeignKey(
        Posts,
        unique=False,
        on_delete=models.PROTECT,
        verbose_name=_("Post"),    
    )
    
    comment_date = models.DateField(_("Date"), default=datetime.date.today)
    
class PostLikes(models.Model):
    like_author = models.ForeignKey(
        NewUser,
        unique=False,
        null=False,
        on_delete=models.PROTECT,
        verbose_name=_("Like Author"),
    )
    
    post_id = models.ForeignKey(
        Posts,
        # unique=False,
        null=True,
        on_delete=models.PROTECT,
        verbose_name=_("Post id"),
    )
    
    like = models.BooleanField(
        default=False,
        null=True,
        verbose_name=_("like"),   
    )