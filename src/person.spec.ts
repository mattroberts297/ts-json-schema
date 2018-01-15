import { parse } from "./person";
import "mocha";
import { expect } from "chai";

describe("generated parse", () => {
  it("should parse the person json into the persson interface", () => {
    const firstName = "Matt";
    const lastName = "Roberts";
    const json = `{"firstName": "${firstName}", "lastName": "${lastName}"}`;
    const person = parse(json);
    expect(person.firstName).to.eq(firstName);
    expect(person.lastName).to.eq(lastName);
  });

  it("should error on missing field", () => {
    const firstName = "Matt";
    const lastName = "Roberts";
    const json = `{"lastName": "${lastName}"}`;
    expect(() => parse(json)).to.throw(Error, "Expected field of type string: firstName");
  });

  it("should error on mistyped field", () => {
    const firstName = "Matt";
    const lastName = "Roberts";
    const json = `{"firstName": 123, "lastName": "${lastName}"}`;
    expect(() => parse(json)).to.throw(Error, "Expected field of type string: firstName");
  });
});
