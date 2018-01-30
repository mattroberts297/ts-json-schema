import { generate } from "./json-schema-gen";

import { expect } from "chai";
import "mocha";

describe("generate", () => {
  it("should generate code for the person schema", (done) => {
    generate("./etc/person.schema.json", "./src/person.ts").then(() => done(), (err) => done(err));
  });

  it("should generate code for the employee schema", (done) => {
    generate("./etc/employee.schema.json", "./src/employee.ts").then(() => done(), (err) => done(err));
  });

  it("should generate code for the jwks schema", (done) => {
    generate("./etc/jwks.schema.json", "./src/jwks.ts").then(() => done(), (err) => done(err));
  });
});
