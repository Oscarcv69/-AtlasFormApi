process.env.NODE_ENV = "test";

let mongoose = require("mongoose");
let User = require("../models/user.model");
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../../../server");
let should = chai.should();

chai.use(chaiHttp);
describe("Users", () => {
  beforeEach(done => {
    User.remove({}, err => {
      done();
    });
  });

  describe("/GET User", () => {
    it("it should GET all the users", done => {
      chai
        .request(server)
        .get("/users")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });
  describe("/POST Users", () => {
    it("it should not POST a  email field", done => {
      let user = {
        name: "Fake Fake",
        document: "12345678A",
        subscribe: "Si",
        captation: "Web",
        address: "Fake street",
        zipcode: "28987",
        region: "Andalucia",
        city: "Malaga",
        country: "Espana",
        observations: "ninguna"
      };
      chai
        .request(server)
        .post("/user/create")
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("errors");
          res.body.errors.should.have.property("email");
          res.body.errors.email.should.have.property("kind").eql("required");
          done();
        });
    });
  });
  it("it should POST a book ", done => {
    let user = {
      name: "Fake Fake",
      email: "fake@fake.com",
      document: "12345678A",
      subscribe: "Si",
      captation: "Web",
      address: "Fake street",
      zipcode: "28987",
      region: "Andalucia",
      city: "Malaga",
      country: "Espana",
      observations: "ninguna"
    };
    chai
      .request(server)
      .post("/user/create")
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  describe("/GET/:email user", () => {
    it("it should GET a user by the given id", done => {
      let user = new User({
        name: "Fake Fake",
        email: "fake@fake.com",
        document: "12345678A",
        subscribe: "Si",
        captation: "Web",
        address: "Fake street",
        zipcode: "28987",
        region: "Andalucia",
        city: "Malaga",
        country: "Espana",
        observations: "ninguna"
      });
      user.save((err, user) => {
        chai
          .request(server)
          .get("/users/" + user.email)
          .send(user)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("Array");
            done();
          });
      });
    });
  });
});
