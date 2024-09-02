import axios from "axios";
import { useEffect, useState } from "react";

const ManageBookings = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        axios.get('/manage-bookings')
            .then(response => setBookings(response.data))
            .catch(error => console.error(error))
    }, []);

    const handleApprove = (bookingId) => {
        axios.post.(`approve-booking/${bookingId}/`)
            .then(response => {
                alert("Booking Approved");
                setBookings(bookings.map(booking => booking.id === bookingId ? response.data));
            })
            .catch (error => console.error(error));

    };


    const handleDeny = (bookingId) => {
        axios.post.(`deny-booking/${bookingId}/`)
            .then(response => {
                alert('Booking Denied.');
                setBooking(bookings.map(booking => booking.id === bookingId ? response.data : booking));
            })
        .catch(error => console.error(error));
    };

return (
    <div>
        <h1>Manage Booking</h1>
        <ul>
            {booking.map(booking => (
                <li key={booking.id}>
                    <h3>Booking for {booking.unit.name} by {booking.customer.username}</h3>
                    <p>Status: {booking.status}</p>
                    {booking.status === 'pending' && (
                        <div>
                            <button onClick={() => handleApprove(booking.id)}>fgf</button>
                            <button onClick={() => handleDeny(booking.id)}>fgf</button>
                        </div>
                    )}
                </li>
            ))}
        </ul>
    </div>
);


};