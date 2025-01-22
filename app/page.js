'use client';

import AutoChangingBanner3 from "@/components/AutoChangingBanner3/page";
import AutoChangingBanner4 from "@/components/AutoChangingBanner4/page";
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 my-14 md:mx-20 lg:mx-20">
        <AutoChangingBanner3 />
        <AutoChangingBanner4 />
      </div>
      <Exclusive />
      <Publications />
    </main>
  );
}
