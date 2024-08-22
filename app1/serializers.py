from rest_framework import serializers
from app1.models import Property, Category, UnitImages, Unit, PropertyImages
from mainauth.serializers import UserSerializer
from django.contrib.auth.models import User
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
        fields = "__all__"



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
<<<<<<< HEAD
    owner = serializers.HiddenField(default=serializers.CurrentUserDefault())
    images = PropertyImageSerializer(many=True)

=======
    owner = serializers.ReadOnlyField(source='owner.username')
    images = PropertyImageSerializer(many=True, required=False)
    units = UnitSerializer(many=True, read_only=True, required=False)
    category = serializers.SlugRelatedField(slug_field='name',
                                            queryset=Category.objects.all())
    
>>>>>>> branch-01
    class Meta:
        model = Property
        fields = ['id', 'owner', 'name', 'location', 'category', 'images', 'units']
        read_only_fields = ['owner']

    def create(self, validated_data):
        images_data = validated_data.pop('images', [])
        property_instance = Property.objects.create(**validated_data)
        for image_data in images_data:
            PropertyImages.objects.create(property=property_instance, **image_data)
        print(property_instance)
        return property_instance

class SubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscription
        fields = ['id', 'user', 'property', 'subscribed_at']
