from app1.serializers import PropertySerializer, UnitSerializer, UnitImageSerializer, PropertyImageSerializer
from app1.models import Property, Unit, PropertyImages
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework import authentication, permissions, mixins, generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from .permissions import IsOwner
from .utils import get_object

class PropertyView(viewsets.ModelViewSet):
    serializer_class = PropertySerializer
    queryset = Property.objects.all() 

class PropertyListCreateView(generics.ListCreateAPIView):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer
    #permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        category = self.request.query_params.get('category', None)
        if category:
            return Property.objects.filter(category__name=category)
        return super().get_queryset()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        data = serializer.data
        for property_data in data:
            property_data['has_units'] = Unit.objects.filter(unit_property=property_data['id']).exists()
            property_data['has_images'] = PropertyImages.objects.filter(property=property_data['id']).exists()
        return Response(data)


class PropertyDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer
    permission_classes = [permissions.IsAuthenticated]

class UnitListCreateView(generics.ListCreateAPIView):
    queryset = Unit.objects.all()
    serializer_class = UnitSerializer

    def get_queryset(self):
        property_id = self.kwargs.get('property_id')
        if property_id:
            return Unit.objects.filter(unit_property_id=property_id)
        return super().get_queryset()

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

class UnitDetailView(generics.RetrieveUpdateDestroyAPIView):
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

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def subscribe_property(request, property_id):
    try:
        property = Property.objects.get(id=property_id)
        property.subscribers_count += 1
        property.save()
        # Add the user to a subscription list or send an email, etc.
        # This is a simplified example.
        return Response({"message": "Subscribed successfully!"}, status=status.HTTP_200_OK)
    except Property.DoesNotExist:
        return Response({"error": "Property not found"}, status=status.HTTP_404_NOT_FOUND)