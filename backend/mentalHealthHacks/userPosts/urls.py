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
]