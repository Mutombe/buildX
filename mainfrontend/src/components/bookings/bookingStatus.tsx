import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container, Card } from "react-bootstrap";

const BookingStatus = () => {
    const { id } = useParams();
    const [booking, setBooking] = useState(null);

    useEffect(() => {
        axios.get(`/api/booking-status${id}/`)
            .then(response => setBooking(response.data))
            .catch(error => console.error(error));
    }, [id]);

    if (!booking) return <div></div>;

    return (
        <Container>
            <Card>
                <Card.Body>
                    <Card.Title>Status: {booking}</Card.Title>
                    {booking === 'approved' && (
                        <Card.Text>Your booking has been approved @{booking}</Card.Text>
                    )}

                    {booking === 'approved' && (
                        <Card.Text>Your booking is pending approval from the owner</Card.Text>
                    )}
                </Card.Body>
            </Card>
        </Container>
    )
};

export default BookingStatus;