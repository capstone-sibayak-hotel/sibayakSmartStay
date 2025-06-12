const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');
const mongoose = require('mongoose');
require('dotenv').config();

const init = async () => {
    const server = Hapi.server({
        port: process.env.PORT || 5000,
        host: 'localhost',
        routes: {
            cors: {
                origin: ['*'],
                headers: ['Accept', 'Content-Type', 'Authorization'],
                additionalHeaders: ['X-Requested-With'],
                exposedHeaders: ['Accept'],
                maxAge: 60,
                credentials: true
            }
        }
    });

    // Register JWT plugin
    await server.register(Jwt);

    // Configure JWT
    server.auth.strategy('jwt', 'jwt', {
        keys: process.env.JWT_SECRET || 'hotel_booking_secret_key_2024',
        verify: {
            aud: 'urn:audience:test',
            iss: 'urn:issuer:test',
            sub: false,
            maxAgeSec: 14400 // 4 hours
        },
        validate: (artifacts, request, h) => {
            return {
                isValid: true,
                credentials: { user: artifacts.decoded.payload.user }
            };
        }
    });

    // Connect to MongoDB
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://punyaKami:Kamipunya@cluster0.ojtq4cr.mongodb.net/hotel_db');
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }

    // Register routes
    await server.register(require('./routes/auth'));
    await server.register(require('./routes/reviews'));
    await server.register(require('./routes/bookings'));

    // Add a test route
    server.route({
        method: 'GET',
        path: '/',
        options: {
            auth: false // No auth required for test route
        },
        handler: (request, h) => {
            return { message: 'Hotel Booking API is running!' };
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init(); 