import { JsonSchema } from "./json-schema"
import { parse } from "./json-schema-util";
import "mocha";
import { expect } from "chai";
import { readFile } from "./fs";
import * as _ from "lodash";

describe("parse", () => {
  it("should parse the person schema", (done) => {
    const schema = readFile('etc/person.schema.json');
    const expected: JsonSchema = {
      type: "object",
      title: "Person",
      properties: {
        firstName: { type: "string" },
        lastName: { type: "string" },
        age: { type: "integer" }
      },
      required: ["firstName", "lastName"]
    };
    schema
      .then(s => expect(parse(s)).to.deep.equal(expected))
      .then(() => done(), err => done(err));
  });

  it("should parse the employee schema", (done) => {
    const schema = readFile('etc/employee.schema.json');
    const expected: JsonSchema = {
      type: "object",
      title: "Employee",
      properties: {
        firstName: { type: "string" },
        lastName: { type: "string" },
        company: {
          type: "object",
          title: "Company",
          properties: {
            name: { type: "string" },
            size: { type: "integer" },
            public: { type: "boolean" }
          },
          required: ["name"]
        }
      },
      required: ["firstName", "lastName"]
    };
    schema
      .then(s => expect(parse(s)).to.deep.equal(expected))
      .then(() => done(), err => done(err));
  });
});
