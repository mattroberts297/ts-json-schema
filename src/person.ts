export interface Person {
  firstName: string;
  lastName: string;
}

export function parse(json: string): Person {
  const obj = JSON.parse(json);
  if (obj["firstName"] === undefined || typeof obj["firstName"] !== "string") {
    throw new Error("Expected field of type string: firstName");
  }
  if (obj["lastName"] === undefined || typeof obj["lastName"] !== "string") {
    throw new Error("Expected field of type string: lastName");
  }
  return {
    firstName: <string> obj["firstName"],
    lastName: <string> obj["lastName"]
  };
}
