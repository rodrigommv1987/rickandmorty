import { strict as assert } from "assert";
import sinon from "sinon";
import should from "should";
import { userInputValidation } from "../middleware/userInputValidation";
import { describe } from "mocha";

describe("userInputValidation middleware tests:", () => {
  const next = sinon.spy();
  const res = {
    status: sinon.spy(),
    json: sinon.spy(),
  };
  it("should require email parameter in body", () => {
    const req = {
      body: {
        password: "12345",
      },
    };
    const expectedResponse = {
      success: false,
      msg: "All inputs are required",
    };
    userInputValidation(req, res, next);

    res.status.calledWith(400).should.equal(true);

    res.json.calledWith(expectedResponse).should.equal(true);
  });
  it("should require password parameter in body", () => {
    const req = {
      body: {
        email: "john@doe.com",
      },
    };
    const expectedResponse = {
      success: false,
      msg: "All inputs are required",
    };
    userInputValidation(req, res, next);

    res.status.calledWith(400).should.equal(true);

    res.json.calledWith(expectedResponse).should.equal(true);
  });
  it("should not allow a non valid email address", () => {
    const req = {
      body: {
        email: "john@d oe.com",
        password: "12345",
      },
    };
    const expectedResponse = {
      success: false,
      msg: "Invalid email address",
    };
    userInputValidation(req, res, next);

    res.status.calledWith(400).should.equal(true);

    res.json.calledWith(expectedResponse).should.equal(true);
  });
  it("should call 'next' function once if all parameters are valid", () => {
    const req = {
      body: {
        email: "john@doe.com",
        password: "12345",
      },
    };
    userInputValidation(req, res, next);

    sinon.assert.calledOnce(next);
  });
});
