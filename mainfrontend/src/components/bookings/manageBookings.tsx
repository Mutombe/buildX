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
        axios.post(`approve-booking/${bookingId}/`)
            .then(response => {
                alert("Booking Approved");
                setBookings(bookings.map(booking => booking === bookingId ? response.data));
            })
            .catch (error => console.error(error));

    };


    const handleDeny = (bookingId) => {
        axios.post(`deny-booking/${bookingId}/`)
            .then(response => {
                alert('Booking Denied.');
                setBookings(bookings.map(booking => booking === bookingId ? response.data : booking));
            })
        .catch(error => console.error(error));
    };

return (
    <div>
        <h1>Manage Booking</h1>
        <ul>
            {bookings.map(booking => (
                <li key={booking}>
                    <h3>Booking for {booking} by {booking}</h3>
                    <p>Status: {booking}</p>
                    {booking === 'pending' && (
                        <div>
                            <button onClick={() => handleApprove(booking)}>fgf</button>
                            <button onClick={() => handleDeny(booking)}>fgf</button>
                        </div>
                    )}
                </li>
            ))}
        </ul>
    </div>
);


};

export default ManageBookings;