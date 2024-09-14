from rest_framework import serializers
from bookings.models import Booking
from app1.models import Property, Unit


class BookingSerializer(serializers.ModelSerializer):
    
    customer = serializers.ReadOnlyField(source="customer.username")
    class Meta:
        model = Booking
        fields = [
            "id",
            "property",
            "unit",
            "customer",
            "booking_type",
            "start_date",
            "end_date",
            "total_price",
            "status",
            "created_at",
        ]
        read_only_fields = ["id", "customer", "created_at"]

    def validate(self, data):
        # Ensure that either a unit or property is booked, not both or none.
        if data.get("property") and data.get("unit"):
            raise serializers.ValidationError("Cannot book both a unit and a property.")

        # Check if end date is valid for 'specified' booking type
        if data["booking_type"] == "Specified" and data.get("start_date") and data.get("end_date"):
            if data["end_date"] <= data["start_date"]:
                raise serializers.ValidationError("End date must be after start date.")

        return data
