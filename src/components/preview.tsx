"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { Label } from "@radix-ui/react-label";
import DefaultImage from "./defaultimage";
import { Type } from "lucide-react";
import { headers } from "next/headers";

export default function Preview() {
  const [previewImage, setPreviewImage] = useState("");
  const [previewTrimap, setPreviewTrimap] = useState("");
  const [labelname, setLabelname] = useState("Image");
  const [uploadReady, setUploadReady] = useState(false);

  function blobToBase64(blob: any) {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      // the docs say that result should always be a string, but double-check for future-proofing
      reader.onload = (ev) =>
        typeof reader.result === "string"
          ? resolve(reader.result)
          : reject("Unexpected type received from FileReader");
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(blob);
    });
  }

  const handleUpload = async () => {
    const upload = new FormData();

    if (labelname === "Trimap") {
      let imageBlob = await fetch(previewImage).then((r) => r.blob());
      let trimapBlob = await fetch(previewTrimap).then((r) => r.blob());
      upload.append("Image", imageBlob, "Image");
      upload.append("Trimap", trimapBlob, "Trimap");
      setUploadReady(true);
    }

    if (upload.has("Image") && upload.has("Trimap")) {
      let imageBlob = await fetch(previewImage).then((r) => r.blob());
      var imageBlob_encoded: string = await blobToBase64(imageBlob);
      imageBlob_encoded = imageBlob_encoded.replace(
        /^data:image\/[a-z]+;base64,/,
        ""
      );

      let trimapBlob = await fetch(previewTrimap).then((r) => r.blob());
      var trimapBlob_encoded: string = await blobToBase64(trimapBlob);
      trimapBlob_encoded = trimapBlob_encoded.replace(
        /^data:image\/[a-z]+;base64,/,
        ""
      );

      let data = {
        Image: imageBlob_encoded,
        Trimap: trimapBlob_encoded,
      };

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };

      fetch("http://127.0.0.1:5000/api/inputs", requestOptions)
        .then((response) => response.text())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => console.log(error));
    }

    // POST request using fetch inside useEffect React hook

    setLabelname("Trimap");
  };

  function handlePreview(prop: any | null) {
    if (labelname === "Image") {
      setPreviewImage(URL.createObjectURL(prop));
    } else if (labelname === "Trimap") {
      setPreviewTrimap(URL.createObjectURL(prop));
    }
  }

  return (
    <>
      <Label htmlFor="picture">{labelname}</Label>
      <label
        htmlFor="dropzone-file"
        className="  p-8 flex flex-col items-center justify-center w-full h-64 border-spacing-8 border-2 border-black rounded-sm  cursor-pointer bg-gray-50"
      >
        <div className="w-full h-full flex flex-col items-center justify-center pt-5 pb-6">
          {labelname === "Image" ? (
            previewImage === "" ? (
              <DefaultImage />
            ) : (
              <Image
                src={previewImage}
                width={0}
                height={0}
                className="  object-contain h-48 w-full"
                alt={"prview of the inputed image"}
              ></Image>
            )
          ) : previewTrimap === "" ? (
            <DefaultImage />
          ) : (
            <Image
              src={previewTrimap}
              width={0}
              height={0}
              className="  object-contain h-48 w-full"
              alt={"prview of the inputed image"}
            ></Image>
          )}
        </div>
        <input
          name="image"
          id="dropzone-file"
          type="file"
          className="hidden"
          onChange={(event) =>
            event.target.files ? handlePreview(event.target.files[0]) : null
          }
        />
        <Button
          type="submit"
          onClick={
            (previewImage !== "" && labelname === "Image") ||
            (previewTrimap !== "" && labelname === "Trimap")
              ? handleUpload
              : undefined
          }
        >
          {uploadReady ? "Get your Foreground" : "Submit"}
        </Button>
      </label>
    </>
  );
}
