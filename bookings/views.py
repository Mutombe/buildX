from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from app1.models import Property, Unit
from bookings.models import Booking
from bookings.serializers import BookingSerializer

# 
class BookingListCreateView(generics.ListCreateAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer

    def perform_create(self, serializer):
        serializer.save(customer=self.request.user)

class BookingDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def book_unit(request, unit_id):
    unit = get_object_or_404(Unit, id=unit_id)
    if unit.occupied:
        return Response({"detail": "Unit is already occupied."}, status=status.HTTP_400_BAD_REQUEST)
    booking = Booking.objects.create(unit=unit, customer=request.user)
    return Response({"booking_id": booking.id}, status=status.HTTP_201_CREATED)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def book_property(request, property_id):
    property = get_object_or_404(Property, id=property_id)
    if property.units.exists():
        return Response({"detail": "Property has units. Book a unit instead."}, status=status.HTTP_400_BAD_REQUEST)
    booking = Booking.objects.create(property=property, customer=request.user)
    return Response({"booking_id": booking.id}, status=status.HTTP_201_CREATED)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def manage_bookings(request):
    bookings = Booking.objects.filter(unit__unit_property__owner=request.user) | Booking.objects.filter(property__owner=request.user)
    serializer = BookingSerializer(bookings, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def booking_status(request, booking_id):
    booking = get_object_or_404(Booking, id=booking_id)
    serializer = BookingSerializer(booking)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def approve_booking(request, booking_id):
    booking = get_object_or_404(Booking, id=booking_id)
    booking.status = 'approved'
    if booking.unit:
        booking.unit.occupied = True
        booking.unit.save()
    booking.save()
    return Response({"detail": "Booking approved."})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def deny_booking(request, booking_id):
    booking = get_object_or_404(Booking, id=booking_id)
    booking.status = 'denied'
    booking.save()
    return Response({"detail": "Booking denied."})
