import React, { FC, ReactNode } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

const backgroundImageUrl =
  "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?fit=crop&w=1920&q=80";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  calculatorForm: ReactNode;
  scrolled: boolean;
}

const HeroSection: FC<HeroSectionProps> = ({
  title,
  subtitle,
  calculatorForm,
  scrolled,
}) => {
  return (
    <section
      className="relative min-h-screen bg-fixed bg-center bg-no-repeat shadow-lg flex items-center justify-center"
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: "cover",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/90" />

      <div className="relative z-10 w-full max-w-5xl">
        <div className="block md:hidden px-6 py-20 sm:py-20 md:py-24">
          <div className="flex flex-col items-center space-y-6 text-white">
            <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
            <div className="bg-white p-6 shadow-2xl rounded-lg max-w-md w-full text-gray-900">
              {calculatorForm}
            </div>
            <p className="text-base leading-8 text-gray-300">{subtitle}</p>
          </div>
        </div>

        <div className="hidden md:block px-6 py-16 sm:py-20 md:py-24">
          <div className="grid grid-cols-2 gap-8 items-center">
            <div className="text-white space-y-6">
              <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
              <p className="text-lg leading-8 text-gray-300">{subtitle}</p>
            </div>
            <div className="flex justify-end">
              <div className="bg-white p-6 shadow-2xl rounded-lg max-w-md w-full text-gray-900">
                {calculatorForm}
              </div>
            </div>
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
