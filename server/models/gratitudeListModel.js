'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GratitudeListSchema = new Schema({
	name: {
		type: String,
		required: "Enter one thing you are grateful for today."
	},
	Created_date:{
		type: Date,
		default: Date.now
	},
	status: {
		type: [{
			type: String,
			enum: ['ongoing','delete']
		}],
		default: ['ongoing']
	}
});

module.exports = mongoose.model('Items', GratitudeListSchema);