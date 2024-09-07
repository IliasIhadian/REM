import HelpSheet from "./helpsheet";

export default function Playground({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="p-8 h-screen">
      <div className="border-spacing-8 border-2 border-black rounded-sm h-full  ">
        <div className="grid grid-flow-row grid-rows-3 gap-4 ">
          <div className="grid grid-flow-col grid-cols-2 p-8">
            <div>
              <h1 className="text-6xl">REM.</h1>
            </div>
            <div className="relative">
              <HelpSheet />
            </div>
          </div>

          <div className="p-8  row-span-2 w-full h-full">{children}</div>
        </div>
      </div>
    </main>
  );
}
