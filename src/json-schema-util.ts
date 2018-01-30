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
        const title = hasTitle(json) ? json.title : undefined;
        const required = hasRequired(json) ? json.required : undefined;
        return ({ type: "object", title, properties, required }) as JsonSchema;
      } else {
        throw new Error("Missing properties array");
      }
    } else if (json.type === "string") {
      return ({ type: "string" }) as JsonSchema;
    } else if (json.type === "integer") {
      return ({ type: "integer" }) as JsonSchema;
    } else if (json.type === "boolean") {
      return ({ type: "boolean" }) as JsonSchema;
    } else {
      // TODO Add support for all json schema types i.e. array.
      throw new Error(`Unsupported type: ${json.type}`);
    }
  } else {
    throw new Error("Missing type");
  }
}

function hasTitle(json: any): json is { title: string } {
  return (json.title !== undefined && typeof json.title === "string");
}

function hasAnyRequired(json: any): json is { required: any[] } {
  return (json.required !== undefined && _.isArray(json.required));
}

function hasRequired(json: any): json is { required: string[] } {
  return hasAnyRequired(json) ? _.every(json.required, (a) => (typeof a === "string")) : false;
}
