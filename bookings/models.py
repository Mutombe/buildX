from django.db import models
from django.contrib.auth.models import User
from app1.models import Property, Unit

class Book(models.Model):
    id = models.IntegerField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False)
    property = models.ForeignKey(Property, on_delete=models.CASCADE, null=False)
    unit = models.ForeignKey(Unit, on_delete=models.CASCADE)
    start_date = models.DateField()
    end_date = models.DateField()

    def duration(self):
        return self.start_date - self.end_date
    
    def __str__(self) -> str:
        return f"Renter: {self.user.username}, Property Type: {self.property.category} Property Name: {self.property.name}, Time: {self.duration}"


