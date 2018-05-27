module.exports = app => {
  const userController = require("../controllers/user.controller.js");

  app.post("/user/create", userController.create);
  app.get("/users/:userId", userController.findOne);
  app.get("/users", userController.findAll);
  app.put("/user/:userEmail", userController.update);
  app.get("/user/busy/email/:userEmail", userController.isBusyEmail);
  app.get("/user/busy/document/:userDocument", userController.isBusyDocument);
};
