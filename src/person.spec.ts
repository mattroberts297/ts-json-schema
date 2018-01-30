import { expect } from "chai";
import "mocha";

import { parsePerson, Person } from "./person";

function isPerson(person: Person | Error): person is Person {
  return (person as Error).message === undefined;
}

function isError(person: Person | Error): person is Error {
  return !isPerson(person);
}

describe("generated parsePerson", () => {
  it("should parse person json with no optional properties", () => {
    const firstName = "Matt";
    const lastName = "Roberts";
    const json = `{"firstName": "${firstName}", "lastName": "${lastName}"}`;
    const person = parsePerson(json);
    expect(isPerson(person)).to.eq(true);
    if (isPerson(person)) {
      expect(person.firstName).to.eq(firstName);
      expect(person.lastName).to.eq(lastName);
      expect(person.age).to.be.undefined;
    }
  });

  it("should parse the person json with optional properties", () => {
    const firstName = "Matt";
    const lastName = "Roberts";
    const age = 30;
    const json = `{"firstName": "${firstName}", "lastName": "${lastName}", "age": ${age}}`;
    const person = parsePerson(json);
    expect(isPerson(person)).to.eq(true);
    if (isPerson(person)) {
      expect(person.firstName).to.eq(firstName);
      expect(person.lastName).to.eq(lastName);
      expect(person.age).to.eq(age);
    }
  });

  it("should error on missing field", () => {
    const firstName = "Matt";
    const lastName = "Roberts";
    const json = `{"lastName": "${lastName}"}`;
    expect(() => parsePerson(json)).to.throw(Error, "Expected string but actually found undefined");
  });

  it("should error on mistyped field", () => {
    const firstName = "Matt";
    const lastName = "Roberts";
    const json = `{"firstName": 123, "lastName": "${lastName}"}`;
    expect(() => parsePerson(json)).to.throw(Error, "Expected string but actually found 123");
  });
});
