const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
	square: {type: String, required: true},
	floar: {type: String, required: true},
	firstFloar: {type: String, required: true},
	secondFloar: {type: String, required: true},
	terassa: {type: String, required: true},
	bedroom: {type: String, required: true},
	garage	: {type: String, required: true},
});

module.exports = mongoose.model('ProjectDetail', orderSchema);