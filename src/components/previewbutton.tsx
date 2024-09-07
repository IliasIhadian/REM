import DownloadButton from "./downloadbutton";
import { Button } from "./ui/button";
import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface Props {
  foreground: string;
  labelname: string;
  previewImage: string;
  previewTrimap: string;
  setLabelname: any;
  setForeground: any;
}

const PreviewButton: React.FC<Props> = ({
  labelname,
  previewImage,
  previewTrimap,
  foreground,
  setLabelname,
  setForeground,
}) => {
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

      fetch(
        "https://iliasihadian.pythonanywhere.com/api/inputs",
        /* "http://127.0.0.1:5000/api/inputs", */
        requestOptions
      )
        .then((response) => response.text())
        .then(async (data) => {
          if (data !== "image and trimap different size") {
            const k = b64toBlob(data);
            setForeground(URL.createObjectURL(await k));
            setLabelname("Calculated!");
          } else {
            setLabelname("Error!");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      {labelname === "Calculating..." ||
      labelname === "Calculated!" ||
      labelname === "Error!" ? undefined : (
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
        <DownloadButton
          urlObject={foreground}
          filename={"foreground"}
          buttonname={"Download"}
        ></DownloadButton>
      )}
      {labelname !== "Error!" ? undefined : (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Your Image and Trimap need to have the same size! Plz reload the
            page.
          </AlertDescription>
        </Alert>
      )}
    </>
  );
};

export default PreviewButton;
