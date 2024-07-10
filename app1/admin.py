from django.contrib import admin
from .models import Property, Unit, PropertyImages, UnitImages, Category

class AdminPropertyOverview(admin.ModelAdmin):
    list_display = ("id","name", "location", "category", )
    search_fields = ("name", "category",)
    ordering = ("name",)
    list_filter = ("name", "category",)

class AdminUnitsOverview(admin.ModelAdmin):
    list_display = ("id", "name", "unit_property", "occupied",)
    search_fields = ("name",)
    ordering = ("name",)
    list_filter = ("name", "unit_property",)
    
class AdminPropertyImagesOverview(admin.ModelAdmin):
    list_display = ("name", "file", "property")

class AdminUnitImagesOverview(admin.ModelAdmin):
    list_display = ("name", "file", "unit",)

class AdminCategoryOverview(admin.ModelAdmin):
    list_display = ("name", "id",)

admin.site.register(Property, AdminPropertyOverview)
admin.site.register(Unit, AdminUnitsOverview)
admin.site.register(PropertyImages, AdminPropertyImagesOverview)
admin.site.register(UnitImages, AdminUnitImagesOverview)
admin.site.register(Category, AdminCategoryOverview)