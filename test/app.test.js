"use strict";

const request = require("supertest");
const app = require("../src/app");

describe("routing", () => {
  it("will render root", () => {
    return request(app)
      .get("/")
      .then(res => {
        expect(res.statusCode).toBe(200);
        expect(res.text).toEqual(expect.stringContaining("<h1>Hello</h1>"));
      });
  });

  it("will render an article title", () => {
    return request(app)
      .get("/articles/4172")
      .then(res => {
        expect(res.statusCode).toBe(200);
        expect(res.text).toEqual(
          expect.stringContaining("<h1>Article 4172</h1>")
        );
      });
  });

  it("will 404 if page is not found", async () => {
    const res = await request(app).get("/where-am-i");
    expect(res.statusCode).toBe(404);
    expect(res.text).toEqual("Error 404. Page not found.");
  });
});
