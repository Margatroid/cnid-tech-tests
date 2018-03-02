"use strict";

const request = require("supertest");
const app = require("../src/app");

describe("routing", () => {
  it("will render root", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);

    // Assert two random titles from the dataset.
    expect(res.text).toEqual(
      expect.stringContaining("An unknown printer took a")
    );
    expect(res.text).toEqual(
      expect.stringContaining("It was popularised in the 1960s")
    );
  });

  it("will render an article title", async () => {
    const res = await request(app).get("/articles/1");
    expect(res.statusCode).toBe(200);

    expect(res.text).toEqual(
      expect.stringContaining("Lorem Ipsum has been the")
    );
  });

  it("will 404 if article does not exist", async () => {
    const res = await request(app).get("/articles/999");
    expect(res.statusCode).toBe(404);
  });

  it("will 404 if page is not found", async () => {
    const res = await request(app).get("/where-am-i");
    expect(res.statusCode).toBe(404);
    expect(res.text).toEqual("Error 404. Page not found.");
  });
});
