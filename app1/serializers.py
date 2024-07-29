from rest_framework import serializers
from app1.models import Property, UnitImages, Unit, PropertyImages

class UnitImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = UnitImages
        fields = [
            "id",
            "unit",
            "file",
            "name",
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
    
    class Meta:
        model = Property
        fields = '__all__'
        read_only_fields = ['owner']
