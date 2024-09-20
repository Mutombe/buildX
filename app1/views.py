from app1.serializers import PropertySerializer, UnitSerializer
from django.db.models import Q
from app1.models import (
    Category,
    PinnedProperty,
    Property,
    Subscription,
    Unit,
    PropertyImages,
)
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
from .serializers import (
    CategorySerializer,
    PinnedPropertySerializer,
    SubscriptionSerializer,
)
from django.shortcuts import get_object_or_404


class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class PropertyView(viewsets.ModelViewSet):
    serializer_class = PropertySerializer
    queryset = Property.objects.all()


class PropertyListCreateView(generics.ListCreateAPIView):
    serializer_class = PropertySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = Property.objects.all()
        category = self.request.query_params.get("category", None)
        search_query = self.request.query_params.get("search", None)

        if category:
            queryset = queryset.filter(category__name=category)

        if search_query:
            queryset = queryset.filter(
                Q(name__icontains=search_query) | Q(location__icontains=search_query)
            )

        return queryset

    def perform_create(self, serializer):
        property_instance = serializer.save(owner=self.request.user)
        for image_data in self.request.FILES.getlist("images"):
            PropertyImages.objects.create(property=property_instance, file=image_data)

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        data = serializer.data

        pinned_properties = PinnedProperty.objects.filter(
            user=request.user
        ).values_list("property_id", flat=True)

        for property_data in data:
            property_data["has_units"] = Unit.objects.filter(
                unit_property=property_data["id"]
            ).exists()
            property_data["has_images"] = PropertyImages.objects.filter(
                property=property_data["id"]
            ).exists()
            property_data["pinned"] = property_data["id"] in pinned_properties

        return Response(data)


class PropertyPinView(generics.CreateAPIView, generics.DestroyAPIView):
    serializer_class = PinnedPropertySerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        property_id = kwargs.get("pk")
        try:
            property = Property.objects.get(id=property_id)
        except Property.DoesNotExist:
            return Response(
                {"error": "Property not found"}, status=status.HTTP_404_NOT_FOUND
            )

        pinned_property, created = PinnedProperty.objects.get_or_create(
            user=request.user, property=property
        )

        if created:
            return Response(
                {"status": "property pinned"}, status=status.HTTP_201_CREATED
            )
        else:
            return Response(
                {"status": "property already pinned"}, status=status.HTTP_200_OK
            )

    def destroy(self, request, *args, **kwargs):
        property_id = kwargs.get("pk")
        try:
            pinned_property = PinnedProperty.objects.get(
                user=request.user, property_id=property_id
            )
        except PinnedProperty.DoesNotExist:
            return Response(
                {"error": "Pinned property not found"}, status=status.HTTP_404_NOT_FOUND
            )

        pinned_property.delete()
        return Response(
            {"status": "property unpinned"}, status=status.HTTP_204_NO_CONTENT
        )


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
        property_id = self.kwargs.get("property_id")
        if property_id:
            return Unit.objects.filter(unit_property__id=property_id)
        return super().get_queryset()

    def perform_create(self, serializer):
        property_id = self.kwargs.get("property_id")
        try:
            # Get the Property instance
            property_instance = Property.objects.get(id=property_id)
            # Save the unit with the property instance
            serializer.save(unit_property=property_instance)
        except Property.DoesNotExist:
            raise serializers.ValidationError("Property does not exist.")


class UnitUpdateView(generics.UpdateAPIView):
    queryset = Unit.objects.all()
    serializer_class = UnitSerializer

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop("partial", False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, "_prefetched_objects_cache", None):
            # If 'prefetch_related' has been applied to a queryset, we need to forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)


class ListProperties(APIView):

    def get(self, request, format=None):
        """
        Return a list of all buildings
        """
        all_properties = [property.name for property in Property.objects.all()]
        return Response(all_properties)


class UserPropertiesView(generics.ListAPIView):
    serializer_class = PropertySerializer
    permission_classes = [IsAuthenticated]

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


class UnitDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Unit.objects.all()
    serializer_class = UnitSerializer


class PropertyUpdateView(APIView):
    permission_classes = [IsOwner]


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def subscribe_property(request, property_id):
    property = get_object_or_404(Property, id=property_id)
    user = request.user

    # Check if user is already subscribed
    if Subscription.objects.filter(user=user, property=property).exists():
        return Response(
            {"error": "You are already subscribed."}, status=status.HTTP_400_BAD_REQUEST
        )

    # Subscribe user
    Subscription.objects.create(user=user, property=property)

    # Increment subscribers_count
    property.subscribers_count += 1
    property.save()

    return Response({"message": "Subscribed successfully!"}, status=status.HTTP_200_OK)


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def unsubscribe_property(request, property_id):
    property = get_object_or_404(Property, id=property_id)
    user = request.user

    # Check if the subscription exists
    try:
        subscription = Subscription.objects.get(user=user, property=property)
    except Subscription.DoesNotExist:
        return Response(
            {"error": "You are not subscribed to this property."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    # Unsubscribe the user
    subscription.delete()

    # Decrement subscribers_count
    if property.subscribers_count > 0:
        property.subscribers_count -= 1
        property.save()

    return Response(
        {"message": "Unsubscribed successfully!"}, status=status.HTTP_200_OK
    )


class CheckSubscriptionStatus(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, property_id):
        user = request.user
        is_subscribed = Subscription.objects.filter(
            user=user, property_id=property_id
        ).exists()
        return Response({"is_subscribed": is_subscribed, "property_id": property_id})


class SubscriptionViewSet(viewsets.ModelViewSet):
    queryset = Subscription.objects.all()
    serializer_class = SubscriptionSerializer

    def get_queryset(self):
        """
        Optionally restricts the returned subscriptions to a given user,
        by filtering against a `user` query parameter in the URL.
        """
        queryset = Subscription.objects.all()
        user = self.request.query_params.get("user", None)
        if user is not None:
            queryset = queryset.filter(user=user)
        return queryset


class SubscriptionDetailView(generics.RetrieveDestroyAPIView):
    queryset = Subscription.objects.all()
    serializer_class = SubscriptionSerializer
