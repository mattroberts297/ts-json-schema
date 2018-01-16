export interface MustacheDataView {
  objects: MustacheJsonObject[];
}

export interface MustacheJsonObject {
  title: string;
  properties: MustacheJsonProperty[];
}

export interface MustacheJsonProperty {
  name: string;
  type: string;
  required: boolean;
  object: boolean;
  array: boolean;
  last: boolean;
}
