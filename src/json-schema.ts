export interface ObjectJsonSchema {
  type: "object";
  title: string;
  properties: Properties;
  required?: string[];
}
  
export interface Properties {
  [key: string]: JsonSchema;
}

export interface ArrayJsonSchema {
  type: "array";
  items: JsonSchema
}

export interface StringJsonSchema {
  type: "string";
}

export interface IntegerJsonSchema {
  type: "integer";
}

export type JsonSchema = ObjectJsonSchema | ArrayJsonSchema | StringJsonSchema | IntegerJsonSchema;