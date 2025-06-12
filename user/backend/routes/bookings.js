const Booking = require('../models/Booking');

const createBooking = {
    method: 'POST',
    path: '/api/bookings',
    options: {
        auth: 'jwt'
    },
    handler: async (request, h) => {
        try {
            const { roomType, checkIn, checkOut, guests, totalPrice } = request.payload;
            const username = request.auth.credentials.user.username;
            
            const booking = new Booking({
                username,
                roomType,
                checkIn,
                checkOut,
                guests,
                totalPrice
            });

            await booking.save();
            return h.response(booking).code(201);
        } catch (error) {
            console.error('Error creating booking:', error);
            return h.response({ message: 'Failed to create booking' }).code(500);
        }
    }
};

const getBookings = {
    method: 'GET',
    path: '/api/bookings',
    options: {
        auth: 'jwt'
    },
    handler: async (request, h) => {
        try {
            const username = request.auth.credentials.user.username;
            const bookings = await Booking.find({ username }).sort({ createdAt: -1 });
            return h.response(bookings);
        } catch (error) {
            console.error('Error fetching bookings:', error);
            return h.response({ message: 'Failed to fetch bookings' }).code(500);
        }
    }
};

module.exports = {
    name: 'bookings',
    register: async (server) => {
        server.route([createBooking, getBookings]);
    }
}; 