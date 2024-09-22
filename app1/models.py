from django.utils import timezone
from django.db import models
from django.contrib.auth.models import User
from django.core.mail import send_mail


class Category(models.Model):
    """
    Category model
    """

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


class Property(models.Model):
    """
    Property model
    """

    name = models.CharField(max_length=100, blank=True)
    location = models.CharField(max_length=500, blank=False, null=True)
    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        related_name="building",
        blank=True,
        null=True,
    )
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    booked_count = models.IntegerField(blank=True, default=0)
    occupied = models.BooleanField(default=False)
    subscribers_count = models.IntegerField(blank=True, default=0)
    price_per_month = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    created_at = models.DateTimeField(default=timezone.now)
    objects = PropertyManager()

    def __str__(self) -> str:
        return self.name

    def notify_subscribers(self):
        subscribers = self.subscribers.all()
        for subscriber in subscribers:
            # Send notification about the rental update
            if self.has_units:
                send_mail(
                    "Property Availability Notification",
                    f'The property "{self.name}" has a unit available for rental',
                    "simbarashemutombe1@gmail.com",
                    [subscriber.user.email],
                    fail_silently=False,
                )


class PropertyImages(models.Model):
    """
    Property Images model
    """

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

        if type(self.name) != None:
            return self.name
        else:
            return self.file.url


class Unit(models.Model):
    """
    Unit model
    """

    name = models.CharField(max_length=100, blank=True)
    unit_property = models.ForeignKey(
        Property, related_name="units", blank=True, on_delete=models.CASCADE, null=True
    )
    kitchen = models.BooleanField(default=False)
    bathroom = models.BooleanField(default=False)
    toilet = models.BooleanField(default=False)
    water = models.BooleanField(default=False)
    solar = models.BooleanField(default=False)
    occupied = models.BooleanField(default=False)
    price_per_month = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    booked_count = models.IntegerField(blank=True, default=0)

    def __str__(self) -> str:
        return self.name

    @property
    def location(self):
        return self.unit_property.location

    # def save(self, *args, **kwargs):
    #   if not self.occupied:
    #       self.unit_property.notify_subscribers()
    #   super().save(*args, **kwargs)


class UnitImages(models.Model):
    """
    Unit Images model
    """

    name = models.CharField(max_length=1000, default=None, blank=True, null=True)
    unit = models.ForeignKey(
        Unit, on_delete=models.CASCADE, related_name="images", blank=False, null=True
    )
    file = models.FileField(upload_to="", blank=False)

    def __str__(self) -> str:
        if type(self.name) != None:
            return self.name
        else:
            return self.file.url
        return self.name if self.name else self.file.url


class PinnedProperty(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="pinned_properties"
    )
    property = models.ForeignKey(
        "Property", on_delete=models.CASCADE, related_name="pinned_by"
    )
    pinned_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user", "property")


class Subscription(models.Model):
    """
    Subscription model
    """

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    property = models.ForeignKey(
        Property, on_delete=models.CASCADE, related_name="subscribers"
    )
    subscribed_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user", "property")

    def __str__(self):
        return f"{self.user.username} subscribed to {self.property.name}"
