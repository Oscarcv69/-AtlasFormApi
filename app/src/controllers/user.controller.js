const User = require("../models/user.model.js");
const expressValidator = require("express-validator");

const { body } = require("express-validator/check");

exports.create = (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    document: req.body.document,
    subscribe: req.body.subscribe,
    captation: req.body.captation,
    address: req.body.address,
    zipcode: req.body.zipcode,
    region: req.body.region,
    city: req.body.city,
    country: req.body.country,
    observations: req.body.observations
  });

  user
    .save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.send(err);
    });
};

exports.findAll = (req, res) => {
  User.find()
    .then(users => {
      res.send(users);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message
      });
    });
};

exports.findOne = (req, res) => {
  User.find({ email: req.params.userId })
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: "User not found with " + req.params.userId
        });
      }
      res.send(user);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({ message: "User not found" });
      }
    });
};

exports.update = (req, res) => {
  if (!req.body.email) {
    return res.status(400).send({
      message: "User content can not be empty"
    });
  }
  User.findOneAndUpdate(
    { email: req.params.userEmail },
    {
      name: req.body.name,
      email: req.body.email,
      document: req.body.document,
      subscribe: req.body.subscribe,
      captation: req.body.captation,
      address: req.body.address,
      zipcode: req.body.zipcode,
      region: req.body.region,
      city: req.body.city,
      country: req.body.country,
      observations: req.body.observations
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  )
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message:
            "User not found with email or document " + req.params.userEmail
        });
      }
      res.send(user);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "User not found with id " + req.params.userEmail
        });
      }
      return res.status(500).send({
        message: "Error updating User with id " + req.params.userEmail
      });
    });
};

exports.isBusyEmail = (req, res) => {
  User.find({ email: req.params.userEmail })
    .then(user => {
      if (user.length === 0) {
        res.send(false);
      }
      res.send(true);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({ message: "User not found" });
      }
    });
};
exports.isBusyDocument = (req, res) => {
  User.find({ document: req.params.userDocument })
    .then(user => {
      if (user.length === 0) {
        res.send(false);
      }
      res.send(true);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({ message: "User not found" });
      }
    });
};

exports.deleteUser = (req, res) => {
  User.remove({ email: req.params.email }, (err, result) => {
    res.json({ message: "User successfully deleted!", result });
  });
};
