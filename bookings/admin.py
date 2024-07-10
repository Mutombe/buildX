from django.contrib import admin
from .models import Book

class AdminBookingOverview(admin.ModelAdmin):
    list_display = ("id","user", "property",)
    search_fields = ("user", "property",)
    ordering = ("property",)
    list_filter = ("user", "property",)

admin.site.register(Book, AdminBookingOverview)
