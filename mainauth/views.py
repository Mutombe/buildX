from django.contrib.auth import login, logout
from rest_framework.authtoken.models import Token
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserRegisterSerializer, UserLoginSerializer, UserSerializer, AllUsersSerializer
from rest_framework import permissions, status
from django.contrib.auth.models import User
    

class UserRegister(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request):
        serializer = UserRegisterSerializer(data=request.data)
        clean_data = request.data
        if serializer.is_valid(raise_exception=True):
            user = serializer.create(clean_data)
            user.save()
            token, _ = Token.objects.get_or_create(user=user)
            if user:
                return Response({'token': token.key}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserLogin(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (SessionAuthentication,)

    def post(self, request):
        data = request.data
        #assert validate_email(data)
        #assert validate_password(data)
        serializer = UserLoginSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.check_user(data)
            login(request, user)
            token, _ = Token.objects.get_or_create(user=user)
            return Response({'token': token.key}, status=status.HTTP_200_OK)
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

class UserLogout(APIView):
    def post(self, request):
        logout(request)
        return Response(status=status.HTTP_200_OK)

class UserView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response({'user': serializer.data}, status=status.HTTP_200_OK)
    
class AllUsers(APIView):
    permission_classes = (permissions.IsAdminUser,)
    authentication_classes = (SessionAuthentication,)

    def get(self, request, format=None):
        """
        Return a list of all users
        """
        all_users = [[user.username, user.email] for user in User.objects.all()]
        return Response(all_users)
