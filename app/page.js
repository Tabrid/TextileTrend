'use client';

import CelebritySection from "@/components/CelebritySection/page";
import Exclusive from "@/components/Exclusive/page";
import ExclusiveContent from "@/components/ExclusiveContent/page";
import FoodAndTravel from "@/components/FoodAndTravel/page";
import HomePageLayout from "@/components/HomePageLayout/page";
import Publications from "@/components/Publications/page";
import Trending from "@/components/Trending/page";
import Image from "next/image";

export default function Home() {



  return (
    <main className="overflow-x-hidden">
      <Trending />
      <HomePageLayout />
      <ExclusiveContent />
      <CelebritySection />
      <FoodAndTravel />
      <div className="grid grid-cols-2 gap-10 my-14 mx-20">
        <Image
          width={600}
          height={100}
          src="https://i.ibb.co/WK3TZpP/rec-co-jpg.png"
          alt="Fresh Stories"
          className="w-full h-[100px] object-cover"
        /><Image
          width={600}
          height={100}
          src="https://i.ibb.co/WK3TZpP/rec-co-jpg.png"
          alt="Fresh Stories"
          className="w-full h-[100px] object-cover"
        />
      </div>
      <Exclusive />
      <Publications />
    </main>
  );
}
