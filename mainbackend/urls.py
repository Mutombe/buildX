from django.contrib import admin
from django.urls import path, include
from app1 import views
import mainauth.urls
from mainbackend import settings
from django.conf.urls.static import static
from rest_framework import routers
from app1.views import *
import mainauth

router = routers.DefaultRouter()
router.register(r'properties', views.PropertyView, 'properties')
router.register(r'units', views.UnitView, 'units')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    path('', ListProperties.as_view(), name='list-properties'),
    path('<int:pk>/', PropertyDetail.as_view()),
    path('units/<int:pk>/', UnitDetail.as_view()),
    path('api-auth/', include('rest_framework.urls')),
    path('', include('mainauth.urls')), 
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
