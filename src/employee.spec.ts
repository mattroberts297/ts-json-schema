import { expect } from "chai";
import "mocha";

import { Employee, parseEmployee } from "./employee";

describe("generated parseEmployee", () => {
  const firstName = "Matt";
  const lastName = "Roberts";
  const companyName = "ACME";
  const companyPublic = true;
  const companySize = 1000;

  const employeeWithNoOptionalProperties: Employee = {
    firstName,
    lastName,
  };

  const employeeWithOptionalProperties: Employee = {
    company: {
      name: companyName,
      public: companyPublic,
      size: companySize,
    },
    firstName,
    lastName,
  };

  const employeeWithSomeOptionalProperties: Employee = {
    company: {
      name: companyName,
    },
    firstName,
    lastName,
  };

  const employeeWithMissingProperties = {
    lastName,
  };

  const employeeWithMistypedProperties = {
    firstName: 1,
    lastName,
  };

  it("should parse employee json with no optional properties", () => {
    const json = JSON.stringify(employeeWithNoOptionalProperties);
    const employee = parseEmployee(json);
    expect(employee.firstName).to.eq(firstName);
    expect(employee.lastName).to.eq(lastName);
    expect(employee.company).to.be.undefined;
  });

  it("should parse the employee json with optional properties", () => {
    const json = JSON.stringify(employeeWithOptionalProperties);
    const employee = parseEmployee(json);
    expect(employee.firstName).to.eq(firstName);
    expect(employee.lastName).to.eq(lastName);
    expect(employee.company).to.not.be.undefined;
    if (employee.company !== undefined) {
      expect(employee.company.name).to.eq(companyName);
      expect(employee.company.public).to.eq(companyPublic);
      expect(employee.company.size).to.be.eq(companySize);
    }
  });

  it("should parse the employee json with some optional properties", () => {
    const json = JSON.stringify(employeeWithSomeOptionalProperties);
    const employee = parseEmployee(json);
    expect(employee.firstName).to.eq(firstName);
    expect(employee.lastName).to.eq(lastName);
    expect(employee.company).to.not.be.undefined;
    if (employee.company !== undefined) {
      expect(employee.company.name).to.eq(companyName);
      expect(employee.company.public).to.be.undefined;
      expect(employee.company.size).to.be.undefined;
    }
  });

  it("should error on missing field", () => {
    const json = JSON.stringify(employeeWithMissingProperties);
    expect(() => parseEmployee(json)).to.throw(Error, "Expected value of type string at key: firstName");
  });

  it("should error on missing field", () => {
    const json = JSON.stringify(employeeWithMistypedProperties);
    expect(() => parseEmployee(json)).to.throw(Error, "Expected value of type string at key: firstName");
  });
});
