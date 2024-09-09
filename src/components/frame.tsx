import HelpSheet from "./helpsheet";

export default function Frame({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="p-8 h-screen">
      <div className="border-spacing-8 border-2 border-black rounded-sm h-full  ">
        {children}
      </div>
    </main>
  );
}
