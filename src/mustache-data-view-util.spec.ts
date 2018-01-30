import { readFile } from "./fs";
import { JsonSchema } from "./json-schema";
import { parse} from "./json-schema-util";
import { convert } from "./mustache-data-view-util";

import { expect } from "chai";
import * as _ from "lodash";
import "mocha";

// TODO Improve assertions.

describe("convert", () => {
  it("should convert the person schema to a mustache data view", (done) => {
    const file = readFile("./etc/person.schema.json");
    const schema = file.then(parse);
    const view = schema.then(convert);
    view
      .then((v) => expect(v.objects.length).to.eq(1))
      .then(() => done(), (err) => done(err));
  });

  it("should convert the employee schema to a mustache data view", (done) => {
    const file = readFile("./etc/employee.schema.json");
    const schema = file.then(parse);
    const view = schema.then(convert);
    view
      .then((v) => expect(v.objects.length).to.eq(2))
      .then(() => done(), (err) => done(err));
  });

  it("should convert the jwks schema to a mustache data view", (done) => {
    const file = readFile("./etc/jwks.schema.json");
    const schema = file.then(parse);
    const view = schema.then(convert);
    view
      .then((v) => expect(v.objects.length).to.eq(2))
      .then(() => done(), (err) => done(err));
  });
});
