import React from "react";
import { saveAs } from "file-saver";

export default function App(urlObject: string) {
  const saveFile = (urlObject: string | Blob) => {
    saveAs(urlObject, "foreground.png");
  };
  return (
    <div>
      <button onClick={() => saveFile(urlObject)}>Download</button>
    </div>
  );
}
