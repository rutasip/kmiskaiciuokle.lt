import React from "react";
import { ArrowUpIcon } from "@heroicons/react/24/solid";

interface BackToTopButtonProps {
  show: boolean;
  onClick: () => void;
}

export default function BackToTopButton({ show, onClick }: BackToTopButtonProps) {
  if (!show) return null;

  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 md:bottom-8 md:right-8 bg-emerald-600 hover:bg-emerald-700 text-white p-3 rounded-full transition shadow-xl"
    >
      <ArrowUpIcon className="h-5 w-5" />
      <span className="sr-only">Grįžti į viršų</span>
    </button>
  );
}
