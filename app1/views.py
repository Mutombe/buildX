from app1.serializers import PropertySerializer, UnitSerializer, UnitImageSerializer, PropertyImageSerializer
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

class PropertyListCreateView(generics.ListCreateAPIView):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer
    #permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class PropertyDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer
    permission_classes = [permissions.IsAuthenticated]

class UnitView(viewsets.ModelViewSet):
    serializer_class = UnitSerializer
    queryset = Unit.objects.all()

class ListProperties(APIView):

    def get(self, request, format=None):
        """
        Return a list of all buildings
        """
        all_properties = [property.name for property in Property.objects.all()]
        return Response(all_properties)
  
class UserPropertiesView(generics.ListAPIView):
    serializer_class = PropertySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Property.objects.filter(owner=self.request.user)

    
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
