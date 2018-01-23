import {JsonSchema, ObjectJsonSchema} from "./json-schema";
import {MustacheDataView, MustacheJsonObject, MustacheJsonProperty} from "./mustache-data-view";

import * as _ from "lodash";

export function convert(schema: JsonSchema): MustacheDataView {
  function loop(schema: JsonSchema): MustacheJsonObject[] {
    if (schema.type === "object") {
      const lastKey = _.last(_.keys(schema.properties))
      const mustacheProps = _.map(schema.properties, (v, k) => createMustacheJsonProperty(schema, v, k, k === lastKey));
      const mustacheObj = {title: schema.title, properties: mustacheProps} as MustacheJsonObject;
      const mustacheObjs = _.flatMap(_.values(schema.properties), schema => loop(schema));
      return _.concat([mustacheObj], mustacheObjs);
    } else if (schema.type === "string") {
      return [];
    } else if (schema.type === "integer") {
      return [];
    } else {
      // TODO Array support.
      throw new Error(`Not implemented: ${schema.type}`)
    }  
  }

  const mustacheObjs = loop(schema);
  return {objects: mustacheObjs};  
}

function deriveType(v: JsonSchema, k: string): string {
  if (v.type === "object") {
    return (v.title === undefined) ? _.capitalize(k) : v.title;
  } else if (v.type === "array") {
    return deriveType(v.items, k);
  } else if (v.type === "integer") {
    return "number";
  } else if (v.type === "string") {
    return "string";
  } else {
    throw new Error("Unsupported type!");
  }
} 

function createMustacheJsonProperty(s: ObjectJsonSchema, v: JsonSchema, k: string, last: boolean): MustacheJsonProperty {
  return {
    name: k,
    type: deriveType(v, k),
    capitalizedType: _.capitalize(deriveType(v, k)),
    required: (_.findIndex(s.required, r => r === k) !== -1),
    object: (v.type === "object"),
    array: (v.type === "array"),
    last: last
  }
} 
