const mongoose = require('mongoose');
const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('@hapi/joi');
const PasswordComplexity = require('joi-password-complexity');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 50
	},
	email: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 255,
		unique: true
	},
	password: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 1024
	},
	isAdmin: Boolean
});

userSchema.methods.generateAuthToken = function () {

	const payload = { 
		_id: this._id, 
		isAdmin: this.isAdmin, 
		email: this.email 
	};

	const token = jwt.sign(payload, config.get('jwtPrivateKey'), { expiresIn: '24h' });
	return token;
};

const User = mongoose.model('UserBasic', userSchema);

function validateUser(user) {

	const complexityOptions = {
		min: 5,
		max: 255,

		lowerCase: 1,
		upperCase: 2,
		numeric: 2,
		symbol: 1,

		requirementCount: 4 
		/* 
			Min & Max not considered in the count. 
			Only lower, upper, numeric and symbol. 
			requirementCount could be from 1 to 4 
			If count=0, then it takes requirementCount as 4
		*/
	};

	const schema = {
		name: Joi.string().min(5).max(50).required(),
		email: Joi.string().min(5).max(255).required().email(),
		//password: Joi.string().min(5).max(255).required()
		password: new PasswordComplexity(complexityOptions).required()

	};

	return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;