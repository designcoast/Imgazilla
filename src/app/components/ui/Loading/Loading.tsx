import React from 'react';
import { LoaderCircle } from 'lucide-react';

export const Loading = () => {
  return (
    <div className="flex gap-3.5">
      <LoaderCircle className="animate-spin" />
      <p>Loading...</p>
    </div>
  )
}