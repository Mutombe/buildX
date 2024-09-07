from django.contrib import admin
from .models import Booking


class AdminBookingOverview(admin.ModelAdmin):
    list_display = (
        "id",
        "user",
        "property",
    )
    search_fields = (
        "user",
        "property",
    )
    ordering = ("property",)
    list_filter = (
        "user",
        "property",
    )
    list_display = ("id","customer", "property",)
    list_display = ("id","customer", "property", "status")
    search_fields = ("customer", "property",)
    ordering = ("property",)
    list_filter = ("customer", "property",)


admin.site.register(Booking, AdminBookingOverview)
