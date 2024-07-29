import React from 'react';
import { cn } from '@/app/lib/utils';

type Props = {
  imageData: string;
  isLight: boolean;
};

export const ChromeSearchResultBrowserPreview = ({ imageData, isLight }: Props) => {
  return (
    <div className={cn("p-4 rounded shadow-md", isLight ? "bg-white" : "bg-gray-800")}>
      <div className="flex items-center mb-2">
        <img
          src={imageData}
          alt="imgazilla.app"
          className="rounded-full w-7 h-7"
        />
        <div className={cn("ml-2 text-sm", isLight ? "text-gray-600" : "text-gray-400")}>
          <a href="#" className="hover:underline">
            imgazilla.app
          </a>
          <p>https://imgazilla.app</p>
        </div>
      </div>
      <h2 className={cn("text-lg mb-2", isLight ? "text-blue-600" : "text-blue-400")}>
        <a href="#" className="hover:underline">
          imgazilla: Figma Plugin for Favicons & Image Optimization
        </a>
      </h2>
      <p className={cn("text-sm", isLight ? "text-gray-800" : "text-gray-300")}>
        <strong className={cn(isLight ? "text-gray-900" : "text-gray-100")}>imgazilla</strong> — is a powerful Figma plugin that simplifies the creation of favicons and optimizes images for web use.
        With Imgazilla, you can generate high-quality favicons in various sizes and formats directly from your Figma designs.
      </p>
    </div>
  )
}