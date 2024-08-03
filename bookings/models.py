from django.db import models
from django.contrib.auth.models import User
from django.core.mail import send_mail
from app1.models import Property, Unit

class Booking(models.Model):

    """
    Booking model
    """

    unit = models.ForeignKey(Unit, null=True, blank=True, on_delete=models.CASCADE)
    property = models.ForeignKey(Property, null=True, blank=True, on_delete=models.CASCADE)
    customer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bookings')
    status = models.CharField(max_length=20, choices=[('pending', 'Pending'), ('approved', 'Approved'), ('denied', 'Denied')], default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        if self.unit:
            return f"Booking by {self.customer.username} for {self.unit.name}"
        else:
            return f"Booking by {self.customer.username} for {self.property.name}"

    def approve(self):
        self.status = 'approved'
        self.unit.occupied = True
        self.unit.save()
        self.save()
        send_mail(
            'Booking Approved',
            f'Your booking for {self.unit.name} at {self.unit.location} has been approved.',
            'from@example.com',
            [self.customer.email],
            fail_silently=False,
        )

    def deny(self):
        self.status = 'denied'
        self.save()
        send_mail(
            'Booking Denied',
            f'Your booking for {self.unit.name} has been denied.',
            'from@example.com',
            [self.customer.email],
            fail_silently=False,
        )

