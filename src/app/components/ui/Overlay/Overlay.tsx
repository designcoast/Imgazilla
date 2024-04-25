import React from 'react';
import { Loading } from '@/app/components';

export const Overlay = () => {
  return (
    <div className="fixed inset-0 top-[115px] bg-black bg-opacity-50 z-50">
      <div className="flex justify-center items-center h-full">
        <Loading/>
      </div>
    </div>
  )
};
