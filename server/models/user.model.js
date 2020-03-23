const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	name: String,
	age: Number
});

const PetSchema = new mongoose.Schema({
	name: String,
	type: String,
	description: String,
	skill1: String,
	skill2: String,
	skill3: String,
})

const Pet = mongoose.model("Pet", PetSchema);
const User = mongoose.model("User", UserSchema);

module.exports = {Pet, User};