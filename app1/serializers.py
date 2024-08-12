from rest_framework import serializers
from app1.models import Property, Category, UnitImages, Unit, PropertyImages
from .models import Subscription

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']

class UnitImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = UnitImages
        fields = [
            "id",
            "name",
            "unit",
            "file",
        ]

class PropertyImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyImages
        fields = '__all__'


class UnitSerializer(serializers.ModelSerializer):
    images = UnitImageSerializer(many=True)

    class Meta:
        model = Unit
        fields = [  
            "id",
            "name",
            "images",
            "kitchen",
            "bathroom",
            "toilet",
            "water",
            "solar",
            "occupied",
            "booked_count",
        ]

class PropertySerializer(serializers.ModelSerializer):
    owner = serializers.HiddenField(default=serializers.CurrentUserDefault())
    images = PropertyImageSerializer(many=True)
    units = UnitSerializer(many=True, read_only=True)
    
    class Meta:
        model = Property
        fields = '__all__'
        read_only_fields = ['owner']

class SubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscription
        fields = ['id', 'user', 'property', 'subscribed_at']
