import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Playground from "@/components/playground";
import Preview from "@/components/preview";
import FormInput from "@/components/forminput";

export default function Home() {
  return (
    <Playground>
      <InputFile></InputFile>
    </Playground>
  );
}

function InputFile() {
  return (
    <div className="grid w-full items-center gap-1.5">
      <Preview />

      {/*       <Button type="submit">Submit</Button>
       */}
    </div>
  );
}
