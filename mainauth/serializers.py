from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from django.contrib.auth.models import User

<<<<<<< HEAD
UserModel = User


class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ("username", "email", "password")

    def validate_email(self, email):
        if UserModel.objects.filter(email=email).exists():
            raise serializers.ValidationError("Email address is already registered ")
        return email

    def create(self, clean_data):
        user_obj = UserModel.objects.create_user(
            username=clean_data["username"],
            email=clean_data["email"],
            password=clean_data["password"],
        )
        user_obj.save()
        return user_obj


=======
class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def validate_email(self, email):
        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError('Email address is already registered ')
        return email

    def create(self, clean_data):
        user = User.objects.create_user(username=clean_data['username'],
                                                 email=clean_data['email'],
                                                 password=clean_data['password'])
        user.save()
        return user
    
>>>>>>> branch-01
class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def check_user(self, clean_data):
        user = authenticate(
            username=clean_data["username"], password=clean_data["password"]
        )
        if not user:
<<<<<<< HEAD
            raise serializers.ValidationError("User not found")
        print(user)
=======
            raise serializers.ValidationError('User not found')
>>>>>>> branch-01
        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
<<<<<<< HEAD
        model = UserModel
        fields = ("email", "username")


class AllUsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ("username", "email", "id")
=======
        model= User
        fields = ('id', 'email', 'username')

class AllUsersSerializer(serializers.ModelSerializer):
    class Meta:
        model= User
        fields = ('username', 'email', 'id')
>>>>>>> branch-01
