const {User, Pet} = require("../models/user.model");

module.exports.testRun = (req, res) => {
  
  res.json({message: "Server connected, release the penguins."});
}

module.exports.newPet = (req, res) => {
  Pet.create(req.body)
    .then(newestPet => res.json({ pet: newestPet }))
    .catch(err => res.json({ message: "You yeet the geese, you get the meese.", error: err}));
}

module.exports.findAllPets = (req, res) => {
  console.log("We findin' pets.")
  Pet.find()
    .then(allPets => res.json({ pets: allPets}))
    .catch(err => res.json({message: "This didn't work, send the programmer", error: err}));
}

module.exports.findPet = (req, res) => {
  console.log("findone pet")
  Pet.findOne({ _id: req.params.id})
    .then(singlePet => res.json({ pet: singlePet}))
    .catch(err => res.json({ message: "It's all very bad.", error: err}))
}

module.exports.deletePet = (req, res) => {
  console.log("Delete pet")
  Pet.deleteOne({ _id: req.params.id})
    .then(result => res.json({result: result}))
    .catch(err => res.json({ message: "something went wrong", error: err}));
}
// Below here be dragons
module.exports.findAllUsers = (req, res) => {
  User.find()
    .then(allDaUsers => res.json({ users: allDaUsers }))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};

module.exports.findOneSingleUser = (req, res) => {
	User.findOne({ _id: req.params.id })
		.then(oneSingleUser => res.json({ user: oneSingleUser }))
		.catch(err => res.json({ message: "Something went wrong", error: err }));
};

module.exports.createNewUser = (req, res) => {
  User.create(req.body)
    .then(newlyCreatedUser => res.json({ user: newlyCreatedUser }))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};

module.exports.updateExistingUser = (req, res) => {
  User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then(updatedUser => res.json({ user: updatedUser }))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};

module.exports.deleteAnExistingUser = (req, res) => {
  User.deleteOne({ _id: req.params.id })
    .then(result => res.json({ result: result }))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};
