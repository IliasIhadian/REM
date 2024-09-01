"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "./ui/button";

export default function Preview() {
  const [preview, setPreview] = useState("");

  const handleUpload = async () => {
    /* const upload = new FormData();
    upload.append("file", preview);
    */
    let blob = await fetch(preview).then((r) => r.blob());
    console.log(blob);
    // POST request using fetch inside useEffect React hook
    const requestOptions = {
      method: "POST",

      body: blob,
    };

    fetch("http://127.0.0.1:5000/api/inputs", requestOptions)
      .then((response) => response.text())
      .then((data) => {
        /* var reader: any = new FileReader();
        reader.readAsDataURL(data);
        var result = reader.result;
        //don't need type informations
        result = data.split(",").pop();
        console.log(result); */
        console.log(data);
      })
      .catch((error) => console.log(error));
    /*     console.log("i fire once");
     */
  };

  function handlePreview(prop: any | null) {
    setPreview(URL.createObjectURL(prop));
  }

  function inputImage() {
    const image = "";
  }

  return (
    <>
      <div className="w-full h-full flex flex-col items-center justify-center pt-5 pb-6">
        {preview === "" ? (
          <>
            <svg
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </>
        ) : (
          <Image
            src={preview}
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
      <Button type="submit" onClick={preview !== "" ? handleUpload : undefined}>
        Submit
      </Button>
    </>
  );
}

/**<label
        htmlFor="dropzone-file"
        className="  p-8 flex flex-col items-center justify-center w-full h-64 border-spacing-8 border-2 border-black rounded-sm  cursor-pointer bg-gray-50"
      >
        <div className="w-full h-full flex flex-col items-center justify-center pt-5 pb-6">
          {preview === "" ? (
            <>
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </>
          ) : (
            <Image
              src={preview}
              width={0}
              height={0}
              className="  object-contain h-48 w-full"
              alt={"prview of the inputed image"}
            ></Image>
          )}
        </div>
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          onChange={(event) =>
            event.target.files ? handlePreview(event.target.files[0]) : null
          }
        />
      </label> */
