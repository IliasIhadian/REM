"use client";

import React, { useState } from "react";
import { Progress } from "@/components/ui/progress";
import Labeler from "./labeler";
import DropzonePreview from "./dropzonepreview";
import PreviewButton from "./previewbutton";

export default function Preview() {
  const [previewImage, setPreviewImage] = useState("");
  const [previewTrimap, setPreviewTrimap] = useState("");
  const [labelname, setLabelname] = useState("Image");
  const [foreground, setForeground] = useState("");
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    if (previewImage !== "" || previewTrimap !== "" || foreground !== "") {
      setProgress((progress) => progress + 33.333);
    }
  }, [previewImage, previewTrimap, foreground]);

  function handlePreview(prop: any | null) {
    if (labelname === "Image") {
      setPreviewImage(URL.createObjectURL(prop));
    } else if (labelname === "Trimap") {
      setPreviewTrimap(URL.createObjectURL(prop));
    }
  }

  return (
    <>
      <Progress value={progress} />
      <Labeler labelname={labelname} />
      <DropzonePreview
        foreground={foreground}
        labelname={labelname}
        previewImage={previewImage}
        previewTrimap={previewTrimap}
        onPreview={handlePreview}
      />
      <PreviewButton
        foreground={foreground}
        labelname={labelname}
        previewImage={previewImage}
        previewTrimap={previewTrimap}
        setLabelname={setLabelname}
        setForeground={setForeground}
      />
    </>
  );
}
