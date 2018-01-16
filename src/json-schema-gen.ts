import {parse} from "./json-schema-util";
import {convert} from "./mustache-data-view-util";
import {MustacheDataView} from "./mustache-data-view";
import {readFile, writeFile} from "./fs";
import * as Mustache from "mustache";

export function generate(schemaPath: string, outputPath: string): Promise<void> {
  function render(view: MustacheDataView): Promise<void> {
    return readFile("./etc/template.mustache").then(template => {
      return writeFile(outputPath, Mustache.render(template, view));
    });    
  }
  return readFile(schemaPath).then(parse).then(convert).then(render);
}
