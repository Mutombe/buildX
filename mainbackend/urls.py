from django.contrib import admin
from django.urls import path, include
from app1 import views
import mainauth.urls
from mainbackend import settings
from django.conf.urls.static import static
from rest_framework import routers
from app1.views import *
import mainauth
from bookings.views import (
    BookingListCreateView,
    book_unit, book_property, booking_status, manage_bookings, approve_booking, deny_booking
)

router = routers.DefaultRouter()
router.register(r'properties', views.PropertyView, 'properties')
router.register(r'units', views.UnitView, 'units')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    path('list', ListProperties.as_view(), name='list-properties'),
    path('units/<int:pk>/', UnitDetail.as_view()),
    path('uploads/', UserPropertiesView.as_view()),
    path('properties/', PropertyListCreateView.as_view(), name='property-list-create'),
    path('user/properties/', UserPropertiesView.as_view(), name='user-properties'),
    path('properties/<int:pk>/', PropertyDetailView.as_view(), name='property-detail'),
    path('bookings/', BookingListCreateView.as_view(), name='booking-list-create'),
    path('book/unit/<int:unit_id>/', book_unit, name='book-unit'),
    path('book/property/<int:property_id>/', book_property, name='book-property'),
    path('booking/status/<int:booking_id>/', booking_status, name='booking-status'),
    path('manage/bookings/', manage_bookings, name='manage-bookings'),
    path('approve/booking/<int:booking_id>/', approve_booking, name='approve-booking'),
    path('deny/booking/<int:booking_id>/', deny_booking, name='deny-booking'),
    path('', include('mainauth.urls')), 
    path('api-auth/', include('rest_framework.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)