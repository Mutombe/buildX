from rest_framework import serializers
from bookings.models import Booking
from app1.models import Property, Unit

class BookingSerializer(serializers.ModelSerializer):
    property_id = serializers.PrimaryKeyRelatedField(
        queryset=Property.objects.all(), 
        source='property', 
        required=False,
        write_only=True
    )
    unit_id = serializers.PrimaryKeyRelatedField(
        queryset=Unit.objects.all(), 
        source='unit', 
        required=False,
        write_only=True
    )
    customer = serializers.ReadOnlyField(source='customer.username')

    class Meta:
        model = Booking
        fields = [
            'id', 'property_id', 'unit_id', 'customer', 'booking_type', 
            'start_date', 'end_date', 'total_price', 'status', 'created_at'
        ]
        read_only_fields = ['id', 'customer', 'status', 'created_at']

    def validate(self, data):
        """ Custom validation to ensure either property or unit is booked """
        property_ = data.get('property')
        unit = data.get('unit')

        if not property_ and not unit:
            raise serializers.ValidationError("Either a property or a unit must be booked.")

        # Ensure the end date is after the start date if booking for a specified period
        if data['booking_type'] == 'specified' and 'start_date' in data and 'end_date' in data:
            if data['end_date'] <= data['start_date']:
                raise serializers.ValidationError("End date must be after start date.")

        return data

