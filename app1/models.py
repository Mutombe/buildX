from django.utils import timezone
from django.db import models
from django.contrib.auth.models import User
from django.core.mail import send_mail
from django.db.models.functions import Now


class Category(models.Model):
    TYPE = [
        ("Commercial", "Commercial"),
        ("House", "House"),
        ("Shop", "Shop"),
        ("Cabin", "Cabin"),
        ("Warehouse", "Warehouse"),
        ("Tent", "Tent"),
    ]
    name = models.CharField(max_length=12, choices=TYPE)

    def __str__(self) -> str:
        return self.name


class PropertyManager(models.Manager):
    def for_user(self, user):
        return self.filter(owner=user)

<<<<<<< HEAD

class Property(models.Model):
    name = models.CharField(max_length=100, blank=True)
    location = models.CharField(max_length=500, blank=False, null=True)
    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        related_name="building",
        blank=True,
        null=True,
    )
    owner = models.ForeignKey(User, on_delete=models.CASCADE, null=False)
=======
class Property(models.Model):
    name = models.CharField(max_length=100, blank=True)
    location = models.CharField(max_length=500, blank=False, null=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='building', blank=True, null=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
>>>>>>> branch-01
    booked_count = models.IntegerField(blank=True, default=0)
    subscribers_count = models.IntegerField(blank=True, default=0)
    objects = PropertyManager()

    def __str__(self) -> str:
        return self.name

<<<<<<< HEAD

=======
>>>>>>> branch-01
class PropertyImages(models.Model):
    name = models.CharField(max_length=1000, default=None, blank=True, null=True)
    property = models.ForeignKey(
        Property,
        on_delete=models.CASCADE,
        related_name="images",
        blank=False,
        null=True,
    )
    file = models.FileField(upload_to="", blank=False)

    def __str__(self) -> str:
<<<<<<< HEAD
        if type(self.name) != None:
            return self.name
        else:
            return self.file.url


class Unit(models.Model):
    name = models.CharField(
        max_length=100,
        blank=True,
    )
    unit_property = models.ForeignKey(
        Property, null=True, on_delete=models.SET_NULL, blank=True
    )
=======
        return self.name if self.name else self.file.url

class Unit(models.Model):
    name = models.CharField(max_length=100, blank=True)
    unit_property = models.ForeignKey(Property, null=True, on_delete=models.SET_NULL, blank=True)
>>>>>>> branch-01
    kitchen = models.BooleanField(default=False)
    bathroom = models.BooleanField(default=False)
    toilet = models.BooleanField(default=False)
    water = models.BooleanField(default=False)
    solar = models.BooleanField(default=False)
    occupied = models.BooleanField(default=False)
    booked_count = models.IntegerField(blank=True, default=0)

    def __str__(self) -> str:
        return self.name

    @property
    def location(self):
        return self.unit_property.location

<<<<<<< HEAD

=======
>>>>>>> branch-01
class UnitImages(models.Model):
    name = models.CharField(max_length=1000, default=None, blank=True, null=True)
    unit = models.ForeignKey(
        Unit, on_delete=models.CASCADE, related_name="images", blank=False, null=True
    )
    file = models.FileField(upload_to="", blank=False)

    def __str__(self) -> str:
<<<<<<< HEAD
        if type(self.name) != None:
            return self.name
        else:
            return self.file.url
=======
        return self.name if self.name else self.file.url

class Subscription(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='subscribers')
    subscribed_at = models.DateTimeField(auto_now_add=True)


    class Meta:
        unique_together = ('user', 'property')
    
    def __str__(self):
        return f"{self.user.username} subscribed to {self.property.name}"







    


>>>>>>> branch-01
