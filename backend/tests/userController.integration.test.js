import "dotenv/config.js";
import mongoose from "mongoose";
import should from "should";
import request from "supertest";

import app from "../index";

const UserModel = mongoose.model("User");
const agent = request.agent(app);

describe("User Controller Integration Test:", async () => {

  it("should create a new user in the DB and return it after creation", (done) => {
    const userData = {
      email: "john@doe.com",
      password: "12345",
    };

    agent.post("/register").send(userData).expect(201).end((err, results) => {
      results.body.success.should.equal(true);
      results.body.user.should.have.property('_id');
      done();
    });
  });

  afterEach((done) => {
    UserModel.deleteMany({}).exec();
    done();
  });

  after((done) => {
    mongoose.connection.close();
    app.serverInstance.close(done);
  });
});
