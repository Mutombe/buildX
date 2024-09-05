<<<<<<< HEAD
from app1.serializers import (
    PropertySerializer,
    UnitSerializer,
    UnitImageSerializer,
    PropertyImageSerializer,
)
from app1.models import Property, Unit
=======
from app1.serializers import PropertySerializer, UnitSerializer
from app1.models import Category, Property, Subscription, Unit, PropertyImages
>>>>>>> branch-01
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework import permissions, generics, status
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from .permissions import IsOwner
from rest_framework import serializers
from .utils import get_object
from .serializers import CategorySerializer, SubscriptionSerializer

class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class PropertyView(viewsets.ModelViewSet):
<<<<<<< HEAD
    serializer_class = PropertySerializer
<<<<<<< HEAD
    queryset = Property.objects.all()

=======
    queryset = Property.objects.all()  
>>>>>>> branch-01
=======
    queryset = Property.objects.all()  
    serializer_class = PropertySerializer
>>>>>>> branch-01

class PropertyListCreateView(generics.ListCreateAPIView):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        category = self.request.query_params.get('category', None)
        if category:
            return Property.objects.filter(category__name=category)
        return self.queryset.filter(owner=self.request.user)

    def perform_create(self, serializer):
        property_instance = serializer.save(owner=self.request.user)
        for image_data in self.request.FILES.getlist('images'):
            PropertyImages.objects.create(property=property_instance, file=image_data)

    def list(self, request, *args, **kwargs):
        queryset = Property.objects.all()
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
    authentication_classes = [TokenAuthentication]
    

class UnitListView(viewsets.ModelViewSet):
    queryset = Unit.objects.all()  
    serializer_class = UnitSerializer

class UnitListCreateView(generics.ListCreateAPIView):
    queryset = Unit.objects.all()
    serializer_class = UnitSerializer

    def get_queryset(self):
        property_id = self.kwargs.get('property_id')
        if property_id:
            return Unit.objects.filter(unit_property__id=property_id)
        return super().get_queryset()

<<<<<<< HEAD
=======
    def perform_create(self, serializer):
        property_id = self.kwargs.get('property_id')
        try:
            # Get the Property instance
            property_instance = Property.objects.get(id=property_id)
            # Save the unit with the property instance
            serializer.save(unit_property=property_instance)
        except Property.DoesNotExist:
            raise serializers.ValidationError("Property does not exist.")
>>>>>>> branch-01

class ListProperties(APIView):

    def get(self, request, format=None):
        """
        Return a list of all buildings
        """
        all_properties = [property.name for property in Property.objects.all()]
        return Response(all_properties)
<<<<<<< HEAD


class UserListPropertyView(APIView):
    serializer_class = PropertySerializer
    permission_classes = [IsOwner]

    def get_queryset(self):

        user_property = [
            x.name for x in Property.objects.for_user(owner=self.request.user)
        ]
        return Response({"User Uploads": user_property}, status=status.HTTP_200_OK)


=======
  
class UserPropertiesView(generics.ListAPIView):
    serializer_class = PropertySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Property.objects.filter(owner=self.request.user)
    
>>>>>>> branch-01
class PropertyDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.AllowAny,)
    queryset = Property.objects.all()
    serializer_class = PropertySerializer

<<<<<<< HEAD

class UnitDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.AllowAny,)
    queryset = Unit.objects.all()
    serializer_class = UnitSerializer

=======
class UnitDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Unit.objects.all()
    serializer_class = UnitSerializer
    
<<<<<<< HEAD
>>>>>>> branch-01

class DeleteProperty(APIView):
    pass


=======
>>>>>>> branch-01
class PropertyUpdateView(APIView):
    permission_classes = [IsOwner]


<<<<<<< HEAD
class BookUnit(APIView):
    pass


class NotifyOwner(APIView):
    pass



=======
>>>>>>> branch-01
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
    
      
class SubscriptionViewSet(viewsets.ModelViewSet):
    queryset = Subscription.objects.all()
    serializer_class = SubscriptionSerializer

    def get_queryset(self):
        """
        Optionally restricts the returned subscriptions to a given user,
        by filtering against a `user` query parameter in the URL.
        """
        queryset = Subscription.objects.all()
        user = self.request.query_params.get('user', None)
        if user is not None:
            queryset = queryset.filter(user=user)
        return queryset
    
class SubscriptionListCreateCreateView(generics.ListCreateAPIView):
    queryset = Subscription.objects.all()
    serializer_class = SubscriptionSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class SubscriptionDetailView(generics.RetrieveDestroyAPIView):
    queryset = Subscription.objects.all()
    serializer_class = SubscriptionSerializer
