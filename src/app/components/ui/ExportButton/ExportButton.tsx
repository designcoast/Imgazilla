import React from 'react';

export const ExportButton = () => {
  return (
    <div className="flex absolute bottom-0 w-full">
      <div className="bg-gradient-to-t from-exportButtonShadowFrom via-exportButtonShadowFrom to-exportButtonShadowTo h-14 w-full absolute bottom-[43px]"></div>
      <button className="flex justify-center w-full bg-exportButtonBGColor text-center p-[9.6px]">Export</button>
    </div>
  )
};
