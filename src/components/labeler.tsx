import React from "react";
import { saveAs } from "file-saver";
import { Button } from "./ui/button";
import { Label } from "@radix-ui/react-label";
import { Loader2 } from "lucide-react";

export default function Labeler({ labelname }: { labelname: string }) {
  return (
    <>
      {labelname !== "Calculating..." ? (
        <Label htmlFor="picture">{labelname}</Label>
      ) : (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      )}
    </>
  );
}
