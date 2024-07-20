from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from django.contrib.auth.models import User

UserModel = User

class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ('username', 'email', 'password')

    def validate_email(self, email):
        if UserModel.objects.filter(email=email).exists():
            raise serializers.ValidationError('Email address is already registered ')
        return email

    def create(self, clean_data):
        user_obj = UserModel.objects.create_user(username=clean_data['username'],
                                                 email=clean_data['email'],
                                                 password=clean_data['password'])
        user_obj.save()
        return user_obj
    
class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def check_user(self, clean_data):
        user = authenticate(username=clean_data['username'], password=clean_data['password'])
        if not user:
            raise serializers.ValidationError('User not found')
        return user
    
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model= UserModel
        fields = ('email', 'username')

class AllUsersSerializer(serializers.ModelSerializer):
    class Meta:
        model= UserModel
        fields = ('username', 'email', 'id')
