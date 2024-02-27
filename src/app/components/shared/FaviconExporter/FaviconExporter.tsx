import React from 'react';
import { Separator, FaviconExporterSettings, FaviconPreview } from '@/app/components';

export const FaviconExporter = () => {
  return (
    <div className="flex flex-col">
      <FaviconPreview />
      <Separator />
      <FaviconExporterSettings />
    </div>
  )
}