const Review = require('../models/Review');

const getReviews = {
    method: 'GET',
    path: '/api/reviews',
    options: {
        auth: false // No auth required to view reviews
    },
    handler: async (request, h) => {
        try {
            const reviews = await Review.find().sort({ date: -1 });
            return h.response(reviews);
        } catch (error) {
            console.error('Error fetching reviews:', error);
            return h.response({ message: 'Failed to fetch reviews' }).code(500);
        }
    }
};

const createReview = {
    method: 'POST',
    path: '/api/reviews',
    options: {
        auth: 'jwt' // Require JWT auth to create reviews
    },
    handler: async (request, h) => {
        try {
            const { username, roomType, rating, comment } = request.payload;
            
            const review = new Review({
                username,
                roomType,
                rating,
                comment,
                date: new Date()
            });

            await review.save();
            return h.response(review).code(201);
        } catch (error) {
            console.error('Error creating review:', error);
            return h.response({ message: error.message || 'Failed to create review' }).code(500);
        }
    }
};

module.exports = {
    name: 'reviews',
    register: async (server) => {
        server.route([getReviews, createReview]);
    }
}; 