from django.contrib import admin
from .models import Booking

class AdminBookingOverview(admin.ModelAdmin):
    list_display = ("id","customer", "property",)
    search_fields = ("customer", "property",)
    ordering = ("property",)
    list_filter = ("customer", "property",)

admin.site.register(Booking, AdminBookingOverview)
