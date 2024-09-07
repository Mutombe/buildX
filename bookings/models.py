from datetime import date
from django.db import models
from django.contrib.auth.models import User
from django.core.mail import send_mail
from app1.models import Property, Unit

class Booking(models.Model):

    """
    Booking model
    """
    booking_type = models.CharField(max_length=50)
    unit = models.ForeignKey(Unit, null=True, blank=True, on_delete=models.CASCADE)
    property = models.ForeignKey(Property, null=True, blank=True, on_delete=models.CASCADE)
    customer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bookings')
    status = models.CharField(max_length=20, choices=[('pending', 'Pending'), ('approved', 'Approved'), ('denied', 'Denied')], default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    start_date = models.DateField(default=date.today)
    end_date = models.DateField(null=True, blank=True)
    total_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)

    def __str__(self):
        if self.unit:
            return f"Booking by {self.customer.username} for {self.unit.name}"
        else:
            return f"Booking by {self.customer.username} for {self.property.name}"


class Notification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
