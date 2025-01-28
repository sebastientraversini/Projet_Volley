const mongoose = require('mongoose')

const volleyballPlayerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    pointsWon: {    
        type: Number,
        default: 0,
    },
    pointsLost: { 
        type: Number,
        default: 0,
    },
    pointsWonServe: { 
        type: Number,
        default: 0,
    },
    pointsLostServe: { 
        type: Number,
        default: 0,
    }

})

module.exports = mongoose.model('VolleyballPlayer', volleyballPlayerSchema)