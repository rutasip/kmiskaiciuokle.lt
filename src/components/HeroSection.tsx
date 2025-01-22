import React, { FC, ReactNode } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

const backgroundImageUrl =
  "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?fit=crop&w=1920&q=80";

interface HeroSectionProps {
  scrolled: boolean;
  heroContentLeft?: ReactNode;
  heroContentRight?: ReactNode;
}

const HeroSection: FC<HeroSectionProps> = ({
  scrolled,
  heroContentLeft,
  heroContentRight,
}) => {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center bg-fixed bg-center bg-no-repeat shadow-xl"
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: "cover",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/90" />

      <div className="relative z-10 mx-auto max-w-5xl w-full px-6 py-16 sm:py-20 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1 md:col-span-1 text-white space-y-5 sm:space-y-6">
            {heroContentLeft}
          </div>
          <div className="order-1 md:order-2 md:col-span-1 flex justify-center md:justify-end">
            {heroContentRight}
          </div>
        </div>
      </div>

      {!scrolled && (
        <div className="hidden md:flex absolute bottom-8 inset-x-0 justify-center animate-bounce">
          <div className="bg-white/30 p-2 rounded-full">
            <ChevronDownIcon className="h-5 w-5 text-white" />
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;
