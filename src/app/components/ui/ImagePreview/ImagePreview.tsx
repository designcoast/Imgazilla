import React from 'react';

type Props = {
  imageUrl: string;
};

export const ImagePreview = ({ imageUrl }: Props) => {
  return (
    <div className="flex flex-col justify-center items-center mb-[29px]">
      <div className="flex">
        <div
          className="flex justify-center items-center w-[150px] h-[150px] mb-[3px]">
          <img src={imageUrl} alt="Preview favicon image" className="w-[150px] h-[150px] border-dashed border-2 border-borderSquare preview"/>
        </div>
        <div className="ml-[5px]">
          <div
            className="flex justify-center items-center w-[32px] h-[32px] mb-[3px]">
            <img src={imageUrl} alt="Preview favicon image" className="w-[32px] h-[32px] border-dashed border-2 border-borderSquare preview"/>
          </div>
          <div
            className="flex justify-center items-center w-[48px] h-[48px] mb-[3px]">
            <img src={imageUrl} alt="Preview favicon image" className="w-[48px] h-[48px] border-dashed border-2 border-borderSquare preview"/>
          </div>
          <div
            className="flex justify-center items-center w-[64px] h-[64px] mb-[3px]">
            <img src={imageUrl} alt="Preview favicon image" className="w-[64px] h-[64px] border-dashed border-2 border-borderSquare preview"/>
          </div>
        </div>
      </div>
    </div>
  )
}