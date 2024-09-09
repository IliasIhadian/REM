"use client";
import { Button } from "@/components/ui/button";
import Frame from "@/components/frame";
import Preview from "@/components/preview";
import Link from "next/link";
import Image from "next/image";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
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

export default function Home() {
  return (
    <Frame>
      <div className="grid grid-flow-row grid-rows-4  gap-4">
        <div className="p-8">
          <h1 className=" text-center text-6xl">REMove the Background.</h1>
          <p className=" text-center p-2">
            REM cuts out the foreground of your choosen image using alphamatting
            Algorithm.
          </p>
        </div>
        <div className=" grid grid-flow-col grid-col-5  px-8 pb-8  w-5/6 h-auto  place-self-center border-spacing-8 border-2 border-black rounded-sm">
          <Desktop>
            <div className="p-8">
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Image
                    src={"/lemur.png"}
                    width={0}
                    height={0}
                    className="object-contain h-40 w-full"
                    alt={"lemur"}
                    unoptimized
                  ></Image>
                </HoverCardTrigger>
                <HoverCardContent>
                  Das lemur.png stammt von Mathias Appel lizensiert unter CC0
                  1.0 Universal (CC0 1.0) Public Domain License.
                </HoverCardContent>
              </HoverCard>
            </div>
            <div className=" place-self-center">
              <p className="text-7xl  ">+</p>
            </div>
            <div className="p-8">
              <Image
                src={"/lemur_trimap.png"}
                width={0}
                height={0}
                className="object-contain h-40 w-full"
                alt={"lemur trimap"}
                unoptimized
              ></Image>
            </div>
            <div className=" place-self-center rotate-90">
              {/*             <p className="text-7xl py-4 ">☞</p>
               */}
              <p className="h-0 w-0 border-x-8 border-spacing-1 border-x-transparent border-b-[30px] border-b-black "></p>
            </div>
            <div className="p-8">
              <Image
                src={"/foreground.png"}
                width={0}
                height={0}
                className="object-contain h-40 w-full"
                alt={"lemur"}
                unoptimized
              ></Image>
            </div>
          </Desktop>
          <TabletAndBelow>
            <HoverCard>
              <HoverCardTrigger asChild>
                <Image
                  src={"/frontimg.png"}
                  width={0}
                  height={0}
                  className="object-contain h-40 w-full"
                  alt={"example imagery"}
                  unoptimized
                ></Image>
              </HoverCardTrigger>
              <HoverCardContent>
                Das lemur.png stammt von Mathias Appel lizensiert unter CC0 1.0
                Universal (CC0 1.0) Public Domain License.
              </HoverCardContent>
            </HoverCard>
          </TabletAndBelow>
        </div>
        {/* <div>
          <HoverCard>
          <HoverCardTrigger className="p-2" asChild>
          <Button variant="link">@Image Source</Button>
          </HoverCardTrigger>
          <HoverCardContent>
          Das lemur.png stammt von Mathias Appel lizensiert unter CC0 1.0
          Universal (CC0 1.0) Public Domain License.
          </HoverCardContent>
          </HoverCard>
          </div> */}
        <div className=" px-8  w-full h-auto  ">
          <div className=" flex place-content-center">
            <Link href="/application" className="relative justify-center">
              <Button>Get started</Button>
            </Link>
          </div>
        </div>
      </div>
    </Frame>
  );
}

function InputFile() {
  return (
    <div className="grid w-full items-center gap-1.5">
      <Preview />
    </div>
  );
}
