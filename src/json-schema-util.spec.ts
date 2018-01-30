import { expect } from "chai";
import * as _ from "lodash";
import "mocha";

import { readFile } from "./fs";
import { JsonSchema } from "./json-schema";
import { parse } from "./json-schema-util";

describe("parse", () => {
  it("should parse the person schema", (done) => {
    const schema = readFile("etc/person.schema.json");
    const expected: JsonSchema = {
      properties: {
        age: { type: "integer" },
        firstName: { type: "string" },
        lastName: { type: "string" },
      },
      required: ["firstName", "lastName"],
      title: "Person",
      type: "object",
    };
    schema
      .then((s) => expect(parse(s)).to.deep.equal(expected))
      .then(() => done(), (err) => done(err));
  });

  it("should parse the employee schema", (done) => {
    const schema = readFile("etc/employee.schema.json");
    const expected: JsonSchema = {
      properties: {
        company: {
          properties: {
            name: { type: "string" },
            public: { type: "boolean" },
            size: { type: "integer" },
          },
          required: ["name"],
          title: "Company",
          type: "object",
        },
        firstName: { type: "string" },
        lastName: { type: "string" },
      },
      required: ["firstName", "lastName"],
      title: "Employee",
      type: "object",
    };
    schema
      .then((s) => expect(parse(s)).to.deep.equal(expected))
      .then(() => done(), (err) => done(err));
  });

  it("should parse the jwks schema", (done) => {
    const schema = readFile("etc/jwks.schema.json");
    const expected: JsonSchema = {
      properties: {
        keys: {
          items: {
            properties: {
              alg: { type: "string" },
              e: { type: "string" },
              kid: { type: "string" },
              kty: { type: "string" },
              n: { type: "string" },
              use: { type: "string" },
            },
            required: ["alg", "e", "kid", "kty", "n"],
            title: "Jwk",
            type: "object",
          },
          type: "array",
        },
      },
      required: ["keys"],
      title: "JwkSet",
      type: "object",
    };
    schema
      .then((s) => expect(parse(s)).to.deep.equal(expected))
      .then(() => done(), (err) => done(err));
  });
});
