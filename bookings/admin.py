from django.contrib import admin
from .models import Booking


class AdminBookingOverview(admin.ModelAdmin):
<<<<<<< HEAD
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

=======
    list_display = ("id","customer", "property",)
    search_fields = ("customer", "property",)
    ordering = ("property",)
    list_filter = ("customer", "property",)
>>>>>>> branch-01

admin.site.register(Booking, AdminBookingOverview)
