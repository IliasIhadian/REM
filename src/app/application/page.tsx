import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Playground from "@/components/frame";
import Preview from "@/components/preview";
import FormInput from "@/components/forminput";
import HelpSheet from "@/components/helpsheet";
import Link from "next/link";

export default function Home() {
  return (
    <Playground>
      <div className="grid grid-flow-row grid-rows-3  gap-2 ">
        <div className="grid grid-flow-col grid-cols-2 pt-8 px-8 gap-8">
          <div>
            <Link href={"/"}>
              <h1 className="text-6xl">REM.</h1>
            </Link>
          </div>
          <div className="relative">
            <HelpSheet />
          </div>
        </div>

        <div className="px-8 pb-8  row-span-2 w-full h-auto">
          <InputFile></InputFile>
        </div>
      </div>
    </Playground>
  );
}

function InputFile() {
  return (
    <div className="grid w-full items-center gap-1.5">
      <Preview />
    </div>
  );
}
