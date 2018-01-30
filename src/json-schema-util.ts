import * as _ from "lodash";
import {JsonSchema} from "./json-schema";

export function parse(str: string): JsonSchema {
  const json = JSON.parse(str);
  return parseAny(json);
}

function parseAny(json: any): JsonSchema {
  if (json.type !== undefined && typeof json.type === "string") {
    if (json.type === "object") {
      if (json.properties !== undefined && _.isPlainObject(json.properties)) {
        const properties = _.mapValues(json.properties, (v) => parseAny(v));
        const title = (json.title !== undefined && typeof json.title === "string") ? <string> json.title : undefined;
        const required = (json.required !== undefined && _.isArray(json.required)) ? <string[]> _.filter(json.required, a => (typeof a === "string")) : undefined;
        return <JsonSchema>({ type: "object", title: title, properties: properties, required: required });
      } else {
        throw new Error("Missing properties array");
      }
    } else if (json.type === "string") {
      return <JsonSchema>({ type: "string" });
    } else if (json.type === "integer") {
      return <JsonSchema>({ type: "integer" });
    } else if (json.type === "boolean") {
      return <JsonSchema>({ type: "boolean" });
    } else {
      // TODO Add support for all json schema types.
      throw new Error(`Unsupported type: ${json.type}`);
    }
  } else {
    throw new Error("Missing type");
  }
}
