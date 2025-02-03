import React, {
  ReactNode,
  forwardRef,
  ForwardRefRenderFunction,
  HTMLAttributes,
} from "react";

function classNames(...classes: Array<string | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

interface PageContentSectionProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  scrolled?: boolean;
  className?: string;
}

const PageContentSection: ForwardRefRenderFunction<
  HTMLDivElement,
  PageContentSectionProps
> = ({ children, scrolled, className, ...rest }, ref) => {
  let translationClass = "";
  if (typeof scrolled === "boolean") {
    translationClass = scrolled ? "translate-y-0" : "translate-y-[200px]";
  }

  return (
    <section
      ref={ref}
      {...rest}
      className={classNames(
        "relative transition-transform duration-500 ease-in-out",
        translationClass,
        className
      )}
    >
      <div className="max-w-3xl mx-auto sm:px-4 -mt-12 sm:-mt-16 pb-20">
        <div className="bg-white rounded-xl p-4 sm:p-8 relative z-10 shadow text-base sm:text-md">
          {children}
        </div>
      </div>
    </section>
  );
};

export default forwardRef(PageContentSection);
