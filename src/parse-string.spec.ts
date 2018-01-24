import { expect } from "chai";
import "mocha";
import { parseString } from "./parse-string";

describe("parseString", () => {
  it("should parse a string", () => {
    const obj = {foo: "bar"};
    expect(parseString(obj, "foo")).to.eq("bar");
  });

  it("should error on mistyped field", () => {
    const obj = {foo: 1};
    expect(() => parseString(obj, "foo")).to.throw(Error, "Expected value of type string at key: foo");
  });

  it("should error on missing field", () => {
    const obj = {};
    expect(() => parseString(obj, "foo")).to.throw(Error, "Expected value of type string at key: foo");
  });
});
