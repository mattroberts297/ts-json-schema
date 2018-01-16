import { generate } from "./json-schema-gen";

import "mocha";
import { expect } from "chai";

describe("generate", () => {
  it("should generate code for the person schema", (done) => {
    generate("./etc/person.schema.json", "./gen/person.ts").then(() => done(), err => done(err))
  });

  it("should generate code for the employee schema", (done) => {
    generate("./etc/employee.schema.json", "./gen/employee.ts").then(() => done(), err => done(err))
  });
});
