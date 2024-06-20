from django.db import models

class Image(models.Model):
    name = models.CharField(max_length=1000, default=None, blank=True, null=True)
    images = models.FileField(upload_to='', blank=False)

    def __str__(self) -> str:
        if type(self.name) != None:
            return self.name  
        else: return self.images.url
    
class Building(models.Model):
    name = models.CharField(max_length=100, blank=True)
    location = models.CharField(max_length=500, blank=False, null=True)
    images = models.OneToOneField(
        Image,
        on_delete=models.CASCADE,
        verbose_name="images", null=True
    )
    
    
    def __str__(self) -> str:
        return self.name
    
class Unit(models.Model):
    name = models.CharField(max_length=100, blank=True, )
    unit_building = models.ForeignKey(Building, 
                              verbose_name="building", 
                              null=True, 
                              on_delete=models.SET_NULL, 
                              blank=True)
    kitchen = models.BooleanField(default=False)
    bathroom = models.BooleanField(default=False)
    toilet  = models.BooleanField(default=False)
    water = models.BooleanField(default=False)
    solar = models.BooleanField(default=False)
    occupied = models.BooleanField(default=False)
    images = models.OneToOneField(
        Image,
        on_delete=models.CASCADE,
        verbose_name="images", null=True
    )

    def __str__(self) -> str:
        return self.name
    
    @property
    def location(self):
        return self.unit_building.location

    


