import React from 'react';
import { ServerCrash } from 'lucide-react';
export const ErrorComponent = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full gap-5">
      <div className="flex flex-col justify-center items-centerl text-center">
        <p className="text-3xl font-bold">An error has occurred.</p>
        <p className="text-2xl font-medium">Please try reopening the application.</p>
      </div>
      <div className="flex">
        <ServerCrash width={120} height={120} strokeWidth={1}/>
      </div>
    </div>
  )
}
