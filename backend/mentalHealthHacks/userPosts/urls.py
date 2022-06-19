from django.urls import path
from . import views
app_name = "userPosts"


urlpatterns = [
    path(
        "create-post/",
        views.CreatePostView.as_view(),
        name="create-post",
    ),
    path(
        "current-user-posts-history/",
        views.ListCurrentUserPostsView.as_view(),
        name="user-posts-history",
    ),
    path(
        "all-users-posts/",
        views.ListAllUsersPostsView.as_view(),
        name="all-users-posts",
    ),
    
    path(
        "create-comments/",
        views.CreateCommentView.as_view(),
        name="create-comments",
    ),
    path(
        "read-comments/<id>/",
        views.ReadCommentView.as_view(),
        name="read-comments",
    ),
    path(
        "add-likes/",
        views.AddLikesView.as_view(),
        name="add-likes",
    ),
    path(
        "read-like/<id>/",
        views.ReadLikeView.as_view(),
        name="read-like",
    ),
    path(
        "update-like-status",
        views.UpdateLikeStatusView.as_view(),
        name="update-like-status",
    ), 
    path(
        "update-like-number",
        views.UpdateLikeNumberView.as_view(),
        name="update-like-number",
    )
]