import fs from 'fs';

export const deleteFile = (filename:string):void => {
  try {
    fs.promises.stat(filename);
  } catch {
    return;
  }
  fs.promises.unlink(filename);
};
