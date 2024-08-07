from app1.serializers import (
    PropertySerializer,
    UnitSerializer,
    UnitImageSerializer,
    PropertyImageSerializer,
)
from app1.models import Property, Unit
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework import authentication, permissions, mixins, generics, status
from rest_framework.response import Response
from .permissions import IsOwner
from .utils import get_object


class PropertyView(viewsets.ModelViewSet):
    serializer_class = PropertySerializer
    queryset = Property.objects.all()


class UnitView(viewsets.ModelViewSet):
    serializer_class = UnitSerializer
    queryset = Unit.objects.all()


class ListProperties(APIView):
    """
    View to list all users in the system.
    Requires token authentication.
    """

    def get(self, request, format=None):
        """
        Return a list of all buildings
        """
        all_properties = [property.name for property in Property.objects.all()]
        return Response(all_properties)


class UserListPropertyView(APIView):
    serializer_class = PropertySerializer
    permission_classes = [IsOwner]

    def get_queryset(self):

        user_property = [
            x.name for x in Property.objects.for_user(owner=self.request.user)
        ]
        return Response({"User Uploads": user_property}, status=status.HTTP_200_OK)


class PropertyDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.AllowAny,)
    queryset = Property.objects.all()
    serializer_class = PropertySerializer


class UnitDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.AllowAny,)
    queryset = Unit.objects.all()
    serializer_class = UnitSerializer


class DeleteProperty(APIView):
    pass


class PropertyUpdateView(APIView):
    permission_classes = [IsOwner]


class BookUnit(APIView):
    pass


class NotifyOwner(APIView):
    pass


class SubscribeProperty(APIView):
    pass
