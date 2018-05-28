module.exports = app => {
  const userController = require("../controllers/user.controller.js");

  app.post("/user/create", userController.create);
  app.get("/users/:userEmail", userController.findByEmail);
  app.get("/users/document/:userDoc", userController.findByDocument);
  app.get("/users", userController.findAll);
  app.put("/user/:userEmail", userController.update);
  app.get("/user/busy/email/:userEmail", userController.isBusyEmail);
  app.get("/user/busy/document/:userDocument", userController.isBusyDocument);
};
