import "dotenv/config.js";
import mongoose from "mongoose";
import should from "should";
import request from "supertest";

import app from "../index";

const UserModel = mongoose.model("User");
const agent = request.agent(app);

describe("User Controller Integration Test:", async () => {
  before((done) => {
    UserModel.deleteMany({}).exec();
    done();
  });
  it("should create a new user in the DB and return the email and token after creation", async () => {
    const userData = {
      email: "john1@doe.com",
      password: "12345",
    };

    const response = await agent.post("/register").send(userData);

    response.status.should.equal(201);
    response.body.success.should.equal(true);
    response.body.data.should.have.property("email");
    response.body.data.should.have.property("token");
  });
  it("a newly created user should be able to log in", async () => {
    const userData = {
      email: "john2@doe.com",
      password: "12345",
    };

    //first create the user
    await agent.post("/register").send(userData);

    //try to log in with the user
    const results = await agent.post("/login").send(userData);

    results.status.should.equal(200);
    results.body.success.should.equal(true);
    results.body.data.should.have.property("email");
    results.body.data.should.have.property("token");
  });
  it("should not allow to log in a user with incorrect credentials", async () => {
    const userData = {
      email: "john3@doe.com",
      password: "12345",
    };
    const incorrectUserData = {
      email: "john3@doe.com",
      password: "54321",
    };

    //first create the user
    await agent.post("/register").send(userData);

    //try to log in with the user with incorrect credentials
    const results = await agent.post("/login").send(incorrectUserData);

    results.status.should.equal(409);
    results.body.success.should.equal(false);
    results.body.data.should.not.have.property("email");
    results.body.data.should.not.have.property("token");
    results.body.data.should.have.property("msg");
    results.body.data.msg.should.equal("Invalid user or password");
  });
  it("should not allow to update favorite characters to non logged in users", async () => {
    const userData = {
      email: "john4@doe.com",
      password: "12345",
    };

    //first create the user
    await agent.post("/register").send(userData);

    //try to add a new favorite character without providing access token
    const results = await agent.patch("/favorites/1/true");

    results.status.should.equal(403);
    results.body.success.should.equal(false);
    results.body.data.should.only.have.property("msg");
    results.body.data.should.have.property("msg");
    results.body.data.msg.should.equal("Authentication token is missing");
  });
  it("should allow to update favorite characters to logged in users", async () => {
    const userData = {
      email: "john5@doe.com",
      password: "12345",
    };
    const characterId = 123;
    const addFavorite = true;

    //first create the user
    await agent.post("/register").send(userData);

    //log in the user
    const logInResults = await agent.post("/login").send(userData);
    const { token } = logInResults.body.data;

    //try to add a new favorite character providing access token
    const updateResults = await agent
      .patch(`/favorites/${characterId}/${addFavorite}`)
      .set("x-access-token", token)
      .send();

    updateResults.status.should.equal(200);
    updateResults.body.success.should.equal(true);
    updateResults.body.data.should.only.have.property("userData");
    updateResults.body.data.userData.should.only.have.property("favorites");
    updateResults.body.data.userData.favorites.should.containEql(characterId);
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
