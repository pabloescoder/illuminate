
from django.contrib import admin
from django.urls import path, include

# from django.contrib.auth import views as auth_views


from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from django.conf import settings
from django.conf.urls.static import static




schema_view = get_schema_view(
    openapi.Info(
        title=" API",
        default_version="v1",
        description="Test description",
        terms_of_service="https://www.ourapp.com/policies/terms/",
        contact=openapi.Contact(email="contact@admin.local"),
        license=openapi.License(name="TEST License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)


urlpatterns = [
    path("admin/", admin.site.urls),
    path("user/api/", include("users.urls"), name="users"),
    path("", schema_view.with_ui("swagger", cache_timeout=0), name="schema-swagger-ui"),
    path("api/api.json/", schema_view.without_ui(cache_timeout=0), name="schema-swagger-ui"),
    path("redoc/", schema_view.with_ui("redoc", cache_timeout=0), name="schema-redoc"),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
