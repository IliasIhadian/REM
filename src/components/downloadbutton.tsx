import React from "react";
import { saveAs } from "file-saver";
import { Button } from "./ui/button";

export default function DownloadButton({ urlObject }: { urlObject: string }) {
  const saveFile = (urlObject: string | Blob) => {
    saveAs(urlObject, "foreground.png");
  };
  return (
    <div>
      <Button className="bg-green-700" onClick={() => saveFile(urlObject)}>
        <svg
          className="fill-current w-4 h-4 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
        </svg>
        <span>Download</span>
      </Button>
    </div>
  );
}
