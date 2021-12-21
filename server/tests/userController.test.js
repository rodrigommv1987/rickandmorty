import { strict as assert } from "assert";
import { beforeEach, describe } from "mocha";
import sinon from "sinon";
import should from "should";

import userController from "../controller/UserController";
import { hash } from "../utils/bcrypt";

describe("User Controller Unit Test:", async () => {
  let controller;
  let res;
  class MockUserModel {
    async findOne({ email }) {
      if (email === "john@doe.com") {
        return Promise.resolve(
          this.create({
            email: "john@doe.com",
            password: await hash("12345"),
            favorite: [],
          })
        );
      } else return Promise.resolve(false);
    }
    create(user) {
      return Promise.resolve({
        save: () => {},
        _id: Math.floor(Math.random() * 10000),
        ...user,
      });
    }
  }

  describe("register function tests:", () => {
    beforeEach(() => {
      controller = userController(new MockUserModel());
      res = {
        status: sinon.spy(),
        send: sinon.spy(),
        json: sinon.spy(),
      };
    });
    it("should not allow to register a new user with an email that exists in the db", async () => {
      const req = {
        body: {
          email: "john@doe.com",
          password: "12345",
        },
      };
      await controller.register(req, res);

      res.status.calledWith(409).should.equal(true);

      res.json
        .calledWith({
          success: false,
          data: { msg: "User already exists" },
        })
        .should.equal(true);
    });
    it("should register a new user correctly", async () => {
      const req = {
        body: {
          email: "johnny@doe.com",
          password: "54321",
        },
      };
      await controller.register(req, res);
      const { token } = res.json.args[0][0].data;

      res.status.calledWith(201).should.equal(true);
      res.json
        .calledWith({
          success: true,
          data: {
            email: req.body.email,
            token,
          },
        })
        .should.equal(true);
    });
  });
  describe("login function tests:", () => {
    beforeEach(() => {
      controller = userController(new MockUserModel());
      res = {
        status: sinon.spy(),
        json: sinon.spy(),
      };
    });
    it("should not login a user with an email that does not exist in the db", async () => {
      const req = {
        body: {
          email: "johnny@doe.com",
          password: "12345",
        },
      };
      await controller.login(req, res);

      res.status.calledWith(409).should.equal(true);
      res.json
        .calledWith({
          success: false,
          data: { msg: "Invalid user or password" },
        })
        .should.equal(true);
    });
    it("should not login a user with incorrect password", async () => {
      const req = {
        body: {
          email: "john@doe.com",
          password: "123456789",
        },
      };

      await controller.login(req, res);

      res.status.calledWith(409).should.equal(true);
      res.json
        .calledWith({
          success: false,
          data: { msg: "Invalid user or password" },
        })
        .should.equal(true);
    });
    it("should login a user with correct password", async () => {
      const req = {
        body: {
          email: "john@doe.com",
          password: "12345",
        },
      };

      await controller.login(req, res);
      const { token } = res.json.args[0][0].data;

      res.status.calledWith(200).should.equal(true);
      res.json
        .calledWith({
          success: true,
          data: {
            email: req.body.email,
            token,
          },
        })
        .should.equal(true);
    });
  });
});
