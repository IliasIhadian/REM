"use client";

import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { Label } from "@radix-ui/react-label";
import DefaultImage from "./defaultimage";
import { Type } from "lucide-react";
import { headers } from "next/headers";
import { Progress } from "@/components/ui/progress";

export default function Preview() {
  const [previewImage, setPreviewImage] = useState("");
  const [previewTrimap, setPreviewTrimap] = useState("");
  const [labelname, setLabelname] = useState("Image");
  const [uploadReady, setUploadReady] = useState(false);
  const [foreground, setforeground] = useState("");
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    if (previewImage !== "" || previewTrimap !== "" || foreground !== "") {
      setProgress((progress) => progress + 33.333);
    }
  }, [previewImage, previewTrimap, foreground]);

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
  const b64toBlob = (base64: any, type = "application/octet-stream") =>
    fetch(`data:${type};base64,${base64}`).then((res) => res.blob());

  const handleUpload = async () => {
    if (labelname === "Image") setLabelname("Trimap");
    if (labelname === "Trimap") setLabelname("Calculating...");

    if (labelname === "Trimap" && previewTrimap !== "") {
      setUploadReady(true);

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
        .then(async (data) => {
          const k = b64toBlob(data);
          setforeground(URL.createObjectURL(await k));
          console.log(foreground);
          setUploadReady(false);
          setLabelname("Calculated!");
        })
        .catch((error) => console.log(error));
    }
  };

  function handlePreview(prop: any | null) {
    if (labelname === "Image") {
      console.log(prop);
      setPreviewImage(URL.createObjectURL(prop));
      console.log(URL.createObjectURL(prop));
    } else if (labelname === "Trimap") {
      setPreviewTrimap(URL.createObjectURL(prop));
    }
  }

  return (
    <>
      <Progress value={progress} />

      {labelname !== "Calculating..." ? (
        <Label htmlFor="picture">{labelname}</Label>
      ) : (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      )}
      <label
        htmlFor="dropzone-file"
        className="p-8 flex flex-col items-center justify-center w-full h-64 border-spacing-8 border-2 border-black rounded-sm  cursor-pointer bg-gray-50"
      >
        <div className="w-full h-full flex flex-col items-center justify-center pt-5 pb-6"></div>

        {foreground !== "" ? (
          <Image
            src={foreground}
            width={0}
            height={0}
            className="  object-contain h-48 w-full"
            alt={"prview of the inputed image"}
          ></Image>
        ) : labelname === "Image" ? (
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
        <input
          name="image"
          id="dropzone-file"
          type="file"
          className="hidden"
          onChange={(event) =>
            event.target.files ? handlePreview(event.target.files[0]) : null
          }
        />
      </label>
      {labelname === "Calculating..." ||
      labelname === "Calculated!" ? undefined : (
        <Button
          type="submit"
          onClick={
            (previewImage !== "" && labelname === "Image") ||
            (previewTrimap !== "" && labelname === "Trimap")
              ? handleUpload
              : undefined
          }
        >
          {labelname === "Trimap" && previewTrimap !== ""
            ? "Get your Foreground"
            : "Submit"}
        </Button>
      )}
      {labelname !== "Calculated!" ? undefined : (
        <Button className="bg-green-700">
          <svg
            className="fill-current w-4 h-4 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
          </svg>
          <span>Download</span>
        </Button>
      )}
    </>
  );
}
