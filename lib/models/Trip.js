var mongoose = require('mongoose'),
    tripSchema;

tripSchema = new mongoose.Schema({
    'request': {
        type: mongoose.Schema.ObjectId,
        ref: 'Request',
        required: true,
        index: true
    },
    'user': {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    'request_id': {
        type: String,
        required: true
    },
    'vehicle': {
        'make': {
            type: String,
            default: null
        },
        'model': {
            type: String,
            default: null
        },
        'picture_url': {
            type: String,
            default: null
        },
        'plate': {
            type: String,
            default: null
        }
    },
    'location': {
        'bearing': {
            type: String,
            default: null
        },
        'latitude': {
            type: Number,
            default: null
        },
        'longitude': {
            type: Number,
            default: null
        }
    },
    'driver': {
        'name': {
            type: String,
            default: null
        },
        'phone': {
            type: Number,
            default: null
        },
        'picture_url': {
            type: String,
            default: null
        },
        'rating': {
            type: Number,
            default: null
        }
    },
    'eta': Number,
    'surge_multiplier': Number,
    'status': {
        type: String,
        required: true
    },
    'created': {
        type: Date,
        default: Date.now
    }
});

tripSchema.method('toJSON', function () {
    var trip = {
        id          : this._id,
        request_id  : this.request_id,
        request     : this.request,
        user        : this.user,
        vehicle     : this.vehicle,
        location    : this.location,
        driver      : this.driver,
        eta         : this.eta,
        surge       : this.surge_multiplier,
        status      : this.status,
        created     : this.created
    };

    return trip;
});

// Compile the trip model
mongoose.model('Trip', tripSchema);

// Export the model
module.exports = mongoose.model('Trip');
