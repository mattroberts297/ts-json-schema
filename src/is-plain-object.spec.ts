import { isPlainObject } from "./is-plain-object";
import "mocha";
import { expect } from "chai";

describe("isPlainObject", () => {
  it("should return true for object", () => {
    const obj = {foo: "bar"};
    expect(isPlainObject(obj)).to.eq(true);
  });

  it("should return true for parsed json object", () => {
    const obj = JSON.parse('{"foo": "bar"}');
    expect(isPlainObject(obj)).to.eq(true);
  });

  it("should return false for string", () => {
    expect(isPlainObject("foo")).to.eq(false);
  });
});
