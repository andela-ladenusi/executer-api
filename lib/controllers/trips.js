var env = process.env.NODE_ENV || 'development',
    config = require('../../config/config')[env],
    Firebase = require('firebase'),
    _ = require('lodash'),
    request = require('request'),
    moment = require('moment'),
    User = require('../models/users'),
    Trip = require('../models/trips'),
    Request = require('../models/requests'),
    ObjectId = require('mongoose').Types.ObjectId;


function listAll(req, res) { // route controller to return all trips for a user
    var trips,
        uuid = req.params.uuid;

    User.findOne({ _id: uuid })
    .where('active')
    .equals(true)
    .exec(function (err, user) {
        if (err) { // Return an error if computation was incomplete
            return res.status(400).json({ message: 'An error occurred while processsing this request. Please, try again later.', error: err });
        }

        if (!user) { // Return a 404 if user is not found and exit.
            return res.status(404).json({ message: 'User not found.' });
        }

        Trip.find({ uuid: new ObjectId(uuid) }) // Find the trips that has the supplied user id.
        .exec(function (err, trips) {
            if (err) { // Return an error if computation was incomplete
                return res.status(400).json({ message: 'An error occurred while processsing this request. Please, try again later.', error: err });
            }

            if (!trips.length) { // Return a 404 if user has no trips available and exit.
                return res.status(404).json({ message: 'No trips available for this user.' });
            }

            // Return the trips object as a response if none of the above was true.
            return res.status(200).json({ message: 'Successfully returned trips for this user.', response: trips });
        });
    });
}

function create(req, res) {
    var user, requestData, request_id, params,
        uuid = req.params.uuid,
        tripBody = req.body;

    if (!tripBody || !tripBody.request_id) {
        return res.status(400).json({ error: 'This request cannot be processed!' });
    }

    request_id = tripBody.request_id;

    User.findOne({ _id: uuid })
    .where('active')
    .equals(true)
    .exec(function (err, user) {
        if (err) { // Return an error if computation was incomplete
            return res.status(400).json({ message: 'An error occurred while processsing this request. Please, try again later.', error: err });
        }

        if (!user) {
            return res.status(400).json({ message: 'Invalid user.' });
        }

        Request.findOne({ _id: request_id })
        .exec(function (err, requestData) {
            if (err) { // Return an error if computation was incomplete
                return res.status(400).json({ message: 'An error occurred while processsing this request. Please, try again later.', error: err });
            }

            if (!requestData) {// Return an error if computation was incomplete
                return res.status(400).json({ message: 'An error occurred while processsing this request. Please, try again later.' });
            }

            params = {
                url     : config.uber.sandbox_base_url + 'requests',
                headers : {
                    'Authorization': 'Bearer ' + user.accessToken,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(buildTripObject(requestData))
            };

            request.post(params, function (err, response, tripData) {
                if (err) { return res.status(400).json({ message: 'Unable to complete this request. Please, try again later.', error: err }); }

                if (!tripData) { return res.status(400).json({ error: 'This request could not be completed.\nUnable to create request from Uber API.' }); }
                
                tripData = JSON.parse(tripData);

                new Trip(tripData).save(function (err, trip) {
                    if (err) {
                        return res.status(400).json({ message: 'Unable to complete this request. Please, try again later.', error: err });
                    }

                    return res.status(200).json({ message: 'Successfully created trip.', response: trip });
                });
            });
        });
    });
}

function listOne(req, res) {
    var uuid = req.params.uuid,
        trip_id = req.params.trip_id;

    User.findOne({ _id: uuid })
    .where('active')
    .equals(true)
    .exec(function (err, user) {
        if (err) { // Return an error if computation was incomplete
            return res.status(400).json({ message: 'An error occurred while processsing this request. Please, try again later.', error: err });
        }

        if (!user) { // Return a 404 if user is not found and exit.
            return res.status(404).json({ message: 'User not found.' });
        }

        Trip.findOne({ _id: trip_id }) // Find the trip that has the supplied id.
        .exec(function (err, trip) {
            if (err) { // Return an error if computation was incomplete
                return res.status(400).json({ message: 'An error occurred while processsing this request. Please, try again later.', error: err });
            }

            if (!trip) { // Return a 404 if the trip is not available and exit.
                return res.status(404).json({ message: 'No trips available for this user.' });
            }

            // Return the trip object as a response if none of the above was true.
            return res.status(200).json({ message: 'Successfully returned trips for this user.', response: trip });
        });
    });
}

function buildTripObject(requestData) {
    return {
        product_id      : requestData.product.id,
        start_latitude  : requestData.location.latitude,
        start_longitude : requestData.location.longitude,
        end_latitude    : requestData.destination.latitude,
        end_longitude   : requestData.destination.longitude
    };
}

module.exports = {
    createOne   : create,
    listOne     : listOne,
    listAll     : listAll
};
