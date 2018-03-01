"use strict";

const request = require("supertest");
const app = require("../src/app");

describe("routing", () => {
  it("will render root", () => {
    return request(app)
      .get("/")
      .then(res => {
        expect(res.statusCode).toBe(200);
      });
  });
});
