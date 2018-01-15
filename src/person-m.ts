export interface Person {
  firstName: string;
  lastName: string;
  age?: number;
}

export function parsePerson(json: string): Person | Error {
  const obj = JSON.parse(json);
  if (obj["firstName"] === undefined || typeof obj["firstName"] !== "string") {
    return new Error("Expected field of type string: firstName");
  }
  if (obj["lastName"] === undefined || typeof obj["lastName"] !== "string") {
    return new Error("Expected field of type string: lastName");
  }
  return {
    firstName: <string> obj["firstName"],
    lastName: <string> obj["lastName"],
    age: <number | undefined> obj["age"]
  };
}
