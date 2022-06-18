
from django.contrib import admin
from django.urls import path, include
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from django.conf import settings
from django.conf.urls.static import static


schema_view = get_schema_view(
    # Creating a JSON file that is used by Swagger UI to display the API.
    openapi.Info(
        title="Illuminate API's",
        default_version="v1",
        description="Test Description",
        terms_of_service="https://www.ourapp.com/policies/terms/",
        contact=openapi.Contact(email="contact@Illuminate.local"),
        license=openapi.License(name="Test Liscence"),
    ),

    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path("user/api/", include("users.urls"), name="users"),
    path("userPosts/api/", include("userPosts.urls"), name="userPosts"),

    # Swagger
    path("", schema_view.with_ui("swagger", cache_timeout=0), name="schema-swagger-ui"),
    path("api/api.json/", schema_view.without_ui(cache_timeout=0), name="schema-swagger-ui"),
    path("redoc/", schema_view.with_ui("redoc", cache_timeout=0), name="schema-redoc"),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


# Adding a header to the admin page.
admin.site.site_header = "Illuminate"

# Adding a title to the admin page.
admin.site.site_title = "Illuminate - Making the world a better place"
admin.site.index_title = "Hello Admin 👋, Welcome 😊"
