import React, { FC, ReactNode, forwardRef } from "react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface PageContentSectionProps {
  scrolled: boolean;
  children: ReactNode;
}

const PageContentSection = forwardRef<HTMLDivElement, PageContentSectionProps>(
  function PageContentSection({ scrolled, children }, ref) {
    return (
    <section
      ref={ref}
      className={classNames(
        "relative transition-transform duration-500 ease-in-out",
        scrolled ? "translate-y-0" : "translate-y-[200px]"
      )}
    >
      <div className="max-w-3xl mx-auto sm:px-4 -mt-12 sm:-mt-16 pb-10">
        <div className="bg-white rounded-xl p-4 sm:p-8 relative z-10 shadow text-base sm:text-md">
          {children}
        </div>
      </div>
    </section>
  );
});

export default PageContentSection;
