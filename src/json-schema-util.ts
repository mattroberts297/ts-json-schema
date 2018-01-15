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
    } else {
      throw new Error(`Unsupported type: ${json.type}`);
    }
  } else {
    throw new Error("Missing type");
  }
}

export function generateInterface(schema: JsonSchema, title?: string): string {
  if (schema.type === "object") {
    const maybeTitle = (title !== undefined) ? title : (schema.type === "object") ? schema.title : undefined;
    if (maybeTitle === undefined) {
      throw new Error("Missing title");
    } else {
      const interfaceStart = `export interface ${maybeTitle} {`;
      // TODO Handle object and number properties.
      const types = _.map(schema.properties, (v, k) => {
        if (v.type === "object") {
          const kt = (v.title === undefined) ? _.capitalize(k) : v.title
          return `${k}: ${kt};`;
        } else if (v.type === "string") {
          return `${k}: string;`;
        }
      });
      const indentedTypes = _.map(types, s => `  ${s}`);
      const interfaceEnd = "}";
      return _.join(_.flatten([interfaceStart, indentedTypes, interfaceEnd]), "\n");;
    }
  } else {
    // TODO Handle array, object and number.
    throw new Error(`Unsupported type: ${schema.type}`);
  }
}

export function generateParser(schema: JsonSchema, title?: string): string {
  if (schema.type === "object") {
    const maybeTitle = (title !== undefined) ? title : (schema.type === "object") ? schema.title : undefined;
    if (maybeTitle !== undefined) {
      // TODO Generate parser.
      const defStart = `export function parse(json: string): ${maybeTitle} {`;
      const parseJson = `const obj = JSON.parse(json);`;
      const validateFieldsRaw = _.map(schema.properties, (v, k) => {
        if (v.type === "string") {
          const ifStart = `if (obj["${k}"] === undefined || typeof obj["${k}"] !== "string") {`;
          const thowError = `  throw new Error("Expected field of type string: ${k}");`;
          const ifEnd = `}`
          return _.map([ifStart, thowError, ifEnd], s => `${s}`);
        } else {
          // TODO Handle array, object and number.
          throw new Error(`Unsupported type: ${v.type}`);
        }
      });
      const validateFields = _.flatten(validateFieldsRaw);
      const returnObjectStart = `return {`
      const fieldsRaw = _.map(schema.properties, (v, k) => {
        if (v.type === "string") {
          return `${k}: <string> obj["${k}"]`;
        } else {
          // TODO Handle array, object and number.
          throw new Error(`Unsupported type: ${v.type}`);
        }
      });
      const fieldsIndented = _.map(fieldsRaw, s => `  ${s}`);
      const returnObjectBody = _.concat(_.map(_.dropRight(fieldsIndented, 1), s => `${s},`), _.takeRight(fieldsIndented, 1));
      const returnObjectEnd = `};`;
      const defEnd = `}`;
      const defBody = _.map(_.flatten([parseJson, validateFields, returnObjectStart, returnObjectBody, returnObjectEnd]), s => `  ${s}`);
      return _.join(_.flatten([defStart, defBody, defEnd]), "\n");
    } else {
      throw new Error(`Missing title`);
    }
  } else {
    // TODO Handler array, object and number.
    throw new Error(`Unsupported type: ${schema.type}`);
  }
}
