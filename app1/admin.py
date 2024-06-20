from django.contrib import admin
from .models import Building, Unit, Image

class AdminBuildingsOverview(admin.ModelAdmin):
    list_display = ("name", "location", "images")
    search_fields = ("name",)
    ordering = ("name",)
    list_filter = ("name",)

class AdminUnitsOverview(admin.ModelAdmin):
    list_display = ("name", "unit_building", "location",)
    search_fields = ("name",)
    ordering = ("name",)
    list_filter = ("name",)
    
class AdminImagesOverview(admin.ModelAdmin):
    list_display = ("images", "name",)

admin.site.register(Building, AdminBuildingsOverview)
admin.site.register(Unit, AdminUnitsOverview)
admin.site.register(Image, AdminImagesOverview)