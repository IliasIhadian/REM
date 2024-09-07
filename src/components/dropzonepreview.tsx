import Image from "next/image";
import DefaultImage from "./defaultimage";

interface Props {
  foreground: string;
  labelname: string;
  previewImage: string;
  previewTrimap: string;
  onPreview: any;
}

const DropzonePreview: React.FC<Props> = ({
  foreground,
  labelname,
  previewImage,
  previewTrimap,
  onPreview,
}) => {
  return (
    <>
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
            alt={"preview of the inputed image"}
            unoptimized
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
              unoptimized
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
            unoptimized
          ></Image>
        )}
        <input
          name="image"
          id="dropzone-file"
          type="file"
          accept="image/png"
          className="hidden"
          onChange={(event) =>
            event.target.files ? onPreview(event.target.files[0]) : null
          }
        />
      </label>
    </>
  );
};

export default DropzonePreview;
