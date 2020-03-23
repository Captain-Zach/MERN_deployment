const UserController = require("../controllers/user.controller");

module.exports = app => {
  app.get("/testRun/", UserController.testRun);
  app.post("/api/pets/new", UserController.newPet);
  app.get("/api/pets", UserController.findAllPets);
  app.get("/api/pets/:id", UserController.findPet);
  app.delete("/api/pets/:id", UserController.deletePet);
  // Below here be dragons
  app.get("/api/users/", UserController.findAllUsers);
  app.get("/api/users/:id", UserController.findOneSingleUser);
  app.put("/api/users/update/:id", UserController.updateExistingUser);
  app.post("/api/users/new", UserController.createNewUser);
  app.delete("/api/users/delete/:id", UserController.deleteAnExistingUser);
};