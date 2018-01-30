import { expect } from "chai";
import "mocha";

import { Jwk, JwkSet, parseJwkSet } from "./jwks";

describe("generated parseEmployee", () => {
  const alg = "HS256";
  const e = "1234";
  const kid = "ae3f56";
  const kty = "rsa";
  const n = "5678";
  const use = "sig";

  const jwk: Jwk = { alg, e, kid, kty, n, use };

  const jwkSet: JwkSet = {
    keys: [jwk],
  };

  const jwkSetWithMissingProperties = {
    keys: [{ alg, e, kid, kty }],
  };

  const jwkSetWithMistypedProperties = {
    keys: [{ alg, e, kid, kty, n: 123 }],
  };

  it("should parse jwks json", () => {
    const json = JSON.stringify(jwkSet);
    const result = parseJwkSet(json);
    expect(result).to.deep.eq(jwkSet);
  });

  it("should error on missing field", () => {
    const json = JSON.stringify(jwkSetWithMissingProperties);
    expect(() => parseJwkSet(json)).to.throw(Error, "Expected string but actually found undefined");
  });

  it("should error on missing field", () => {
    const json = JSON.stringify(jwkSetWithMistypedProperties);
    expect(() => parseJwkSet(json)).to.throw(Error, "Expected string but actually found 123");
  });
});
