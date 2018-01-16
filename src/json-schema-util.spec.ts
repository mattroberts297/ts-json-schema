import { JsonSchema } from "./json-schema"
import { parse, generateInterface, generateParser } from "./json-schema-util";
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
        lastName: { type: "string" }
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
            size: { type: "integer" }
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

describe("generateInteface", () => {
  it("should generate an interface for person", (done) => {
    const schema = readFile('etc/person.schema.json');
    const expected = "export interface Person {\n  firstName: string;\n  lastName: string;\n}"
    schema
      .then(str => parse(str))
      .then(schema => expect(generateInterface(schema)).to.equal(expected))
      .then(() => done(), err => done(err));
  });
});

describe("generateParser", () => {
  it("should generate a parser for person", (done) => {
    const schema = readFile('etc/person.schema.json');
    const expected = _.join([
      'export function parse(json: string): Person {',
      '  const obj = JSON.parse(json);',
      '  if (obj["firstName"] === undefined || typeof obj["firstName"] !== "string") {',
      '    throw new Error("Expected field of type string: firstName");',
      '  }',
      '  if (obj["lastName"] === undefined || typeof obj["lastName"] !== "string") {',
      '    throw new Error("Expected field of type string: lastName");',
      '  }',
      '  return {',
      '    firstName: <string> obj["firstName"],',
      '    lastName: <string> obj["lastName"]',
      '  };',
      '}'
    ], '\n');
    schema
      .then(str => parse(str))
      .then(schema => expect(generateParser(schema)).to.eq(expected))
      .then(() => done(), err => done(err));
  });
});
