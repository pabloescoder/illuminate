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
    # path(
    #     "post-like/",
    #     views.PostLikesView.as_view(),
    #     name="post-like",
    # ),
    path(
        "create-comments/",
        views.CreateCommentView.as_view(),
        name="create-comments",
    ),
    # path(
    #     "read-comments/<id>/",
    #     views.ReadCommentView.as_view(),
    #     name="read-comments",
    # ),
    path(
        "add-likes/",
        views.AddLikesView.as_view(),
        name="add-likes",
    ), 
]