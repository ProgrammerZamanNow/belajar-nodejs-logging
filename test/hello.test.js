import express from "express";
import request from "supertest";
const app = express();

app.get("/", (req, res) => {
  res.send("hello world");
});

test("Test Express", async () => {
  const response = await request(app).get("/");
  expect(response.text).toBe("hello world");
});

/* Request:

*/
test("Request", async () => {
  const app = express();
  app.get("/", (req, res) => {
    res.send(`Hello ${req.query.name}`);
  });

  const response = await request(app).get("/").query({ name: "World" });
  expect(response.text).toBe("Hello World");
});

test("RequestURL", async () => {
  const app = express();
  app.get("/hello/world", (req, res) => {
    res.json({
      path: req.path,
      originalUrl: req.originalUrl,
      hostname: req.hostname,
      protocol: req.protocol,
    });
  });

  const response = await request(app)
    .get("/hello/world")
    .query({ name: "World" });

  expect(response.body).toEqual({
    path: "/hello/world",
    originalUrl: "/hello/world?name=World",
    hostname: "127.0.0.1",
    protocol: "http",
  });
});

// request query parameter
test("Query_Parameter", async () => {
  const app = express();
  app.get("/", (req, res) => {
    res.send(`Hello ${req.query.firstName} ${req.query.lastName}`);
  });
  const response = await request(app)
    .get("/")
    .query({ firstName: "laludoni", lastName: "setiawan" });
  expect(response.text).toBe("Hello laludoni setiawan");
});

test("Request Header", async () => {
  const app = express();
  app.get("/", (req, res) => {
    const type = req.get("Accept");
    res.send(`Hello ${type}`);
  });
  const response = await request(app).get("/").set("Accept", "text/plain");
  expect(response.text).toBe("Hello text/plain");
});

test("Response Request", async () => {
  const app = express();
  app.get("/", (req, res) => {
    res.send("Hello Response");
  });
  const response = await request(app).get("/");
  expect(response.text).toBe("Hello Response");
});

