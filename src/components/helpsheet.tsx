"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import DownloadButton from "./downloadbutton";
import { useMediaQuery } from "react-responsive";

const useDesktopMediaQuery = () =>
  useMediaQuery({ query: "(min-width: 1280px)" });

const useTabletAndBelowMediaQuery = () =>
  useMediaQuery({ query: "(max-width: 1279px)" });

const Desktop = ({ children }: { children: any }) => {
  const isDesktop = useDesktopMediaQuery();

  return isDesktop ? children : null;
};

const TabletAndBelow = ({ children }: { children: any }) => {
  const isTabletAndBelow = useTabletAndBelowMediaQuery();

  return isTabletAndBelow ? children : null;
};

export default function HelpSheet() {
  return (
    <>
      <Desktop>
        <Sheet>
          <div>
            <SheetTrigger className="absolute top-0 right-0  bg-black text-white p-2 rounded-sm">
              Do you need help?
            </SheetTrigger>
          </div>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>How to use REM.</SheetTitle>
              <SheetDescription>
                1. Upload your Image of choice (it needs to be .png)
              </SheetDescription>
              <Image
                src={"/tut1.png"}
                width={0}
                height={0}
                className="  object-contain h-40 w-full "
                alt={"lemur"}
                unoptimized
              ></Image>
              <SheetDescription>
                2. Upload the associated Trimap (it needs to have the same size)
              </SheetDescription>
              <Image
                src={"/tut2.png"}
                width={0}
                height={0}
                className="  object-contain h-40 w-full "
                alt={"lemur"}
                unoptimized
              ></Image>
              <SheetDescription>
                3. Voilà! You have REMoved your background (it takes a few
                seconds)
              </SheetDescription>
              <Image
                src={"/tut3.png"}
                width={0}
                height={0}
                className="  object-contain h-40 w-full "
                alt={"lemur"}
                unoptimized
              ></Image>
              <SheetDescription>
                Here are some example images to use:
              </SheetDescription>
              <div className="grid grid-flow-col grid-cols-2 gap-4">
                <div>
                  <DownloadButton
                    urlObject="/lemur.png"
                    filename="Image"
                    buttonname="Image"
                  ></DownloadButton>
                </div>
                <div>
                  <DownloadButton
                    urlObject="/lemur_trimap.png"
                    filename="Trimap"
                    buttonname="Trimap"
                  ></DownloadButton>
                </div>
              </div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </Desktop>

      <TabletAndBelow>
        <Sheet>
          <div>
            <SheetTrigger className="absolute top-0 right-0  bg-black text-white p-2 rounded-sm">
              ?
            </SheetTrigger>
          </div>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>How to use REM.</SheetTitle>
              <SheetDescription className="text-xs">
                1. Upload your Image of choice (it needs to be .png)
              </SheetDescription>
              <Image
                src={"/tut1.png"}
                width={0}
                height={0}
                className="object-contain h-28 w-full "
                alt={"lemur"}
                unoptimized
              ></Image>
              <SheetDescription className="text-xs">
                2. Upload the associated Trimap (it needs to have the same size)
              </SheetDescription>
              <Image
                src={"/tut2.png"}
                width={0}
                height={0}
                className="  object-contain h-28 w-full "
                alt={"lemur"}
                unoptimized
              ></Image>
              <SheetDescription className="text-xs">
                3. Voilà! You have REMoved your background (it takes a few
                seconds)
              </SheetDescription>
              <Image
                src={"/tut3.png"}
                width={0}
                height={0}
                className="  object-contain h-28  w-full "
                alt={"lemur"}
                unoptimized
              ></Image>
              <div></div>
              <SheetDescription className="text-xs">
                Here are some example images to use:
              </SheetDescription>
              <div className="grid grid-flow-col grid-cols-2 gap-4 ">
                <div>
                  <DownloadButton
                    urlObject="/lemur.png"
                    filename="Image"
                    buttonname="Image"
                  ></DownloadButton>
                </div>
                <div>
                  <DownloadButton
                    urlObject="/lemur_trimap.png"
                    filename="Trimap"
                    buttonname="Trimap"
                  ></DownloadButton>
                </div>
              </div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </TabletAndBelow>
    </>
  );
}
