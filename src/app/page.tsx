import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Playground from "@/components/playground";
import Preview from "@/components/preview";

import React, { useEffect, useState } from "react";

export default function Home() {
  return (
    <Playground>
      <InputFile></InputFile>
    </Playground>
  );
}
/* 

export function Hello() {
  const [hello, setHello] = useState("");

  useEffect(() => {
    async function fetchHello() {
      let res = await fetch("http://127.0.0.1:5000/api/python");

      let data = await res.text();
      setHello(data);
    }
    fetchHello();
  }, []);

  if (!hello) return <div>Loading...</div>;

  return <div>{hello}</div>;
} */

export function InputFile() {
  return (
    <div className="grid w-full items-center gap-1.5">
      <Label htmlFor="picture">Image</Label>
      <label
        htmlFor="dropzone-file"
        className="  p-8 flex flex-col items-center justify-center w-full h-64 border-spacing-8 border-2 border-black rounded-sm  cursor-pointer bg-gray-50"
      >
        <Preview />
      </label>
      <Button type="submit">Submit</Button>
    </div>
  );
}
