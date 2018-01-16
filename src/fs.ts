import fs = require("fs");

export const readFile = (path: string) => new Promise<string>((resolve, reject) => {
  fs.readFile(path, 'utf-8', (err, file) => {
    if (err) {
      reject(err);
    } else {
      resolve(file);
    }
  });
});

export const writeFile = (path: string, data: any) => new Promise<void>((resolve, reject) => {
  fs.writeFile(path, data, (err) => {
    if (err) {
      reject(err);
    } else {
      resolve();
    }
  });
});
