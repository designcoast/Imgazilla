import React from 'react';
import { cn } from '@/app/lib/utils';
import { FORMAT_TO_MIME_TYPE, PDF_FORMAT } from '@/app/constants';
import { base64ToBlobUrl } from '@/app/lib/base64ToBlobUrl';
import { FormatBadge } from '@/app/components';
import { MoveRight } from 'lucide-react';

type Props = {
  item: ImageOptimizationResult;
  className?: string;
}

export const ImageOptimizationResultItem = ({ item, className }: Props) => {
  const { name, sourceImageSize, format, optimizedImageSize } = item;

  const fileFormat = format.toUpperCase();

  return (
    <div className={cn("flex flex-col border bg-primary-mainDark border-primary-primaryDark w-full", className)}>
      <div className="flex items-center justify-between gap-5 py-2.5 space-x-4 px-3 w-full">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gray-200 flex items-center justify-center overflow-hidden preview rounded-md">
            {fileFormat === PDF_FORMAT ? (
              <iframe src={base64ToBlobUrl(item.pdfBuffer, PDF_FORMAT)} width="100%" height="100%" className="rounded-md min-w-full min-h-full object-cover"/>
            ) : (
              <img
                src={`data:${FORMAT_TO_MIME_TYPE[fileFormat]};base64,${item.base64Image}`}
                alt={name}
                className="rounded-md min-w-full min-h-full object-cover"
              />
            )}
          </div>
          <div className='flex w-64'>
            <p className="truncate">{name}</p>
          </div>
        </div>
        <div className="flex gap-1 items-center">
          <div className='flex text-sm text-primary-gray'>
            <p>{sourceImageSize.toFixed(2)}</p>
            <p>KB</p>
          </div>
          <MoveRight className="stroke-primary-lightGreen" size={16}/>
          <div className='flex font-bold text-sm text-primary-strongGreen'>
            <p>{optimizedImageSize.toFixed(2)}</p>
            <p>KB</p>
          </div>
        </div>
        <div className='flex text-xs'>
          <FormatBadge format={fileFormat}>
            {fileFormat}
          </FormatBadge>
        </div>
      </div>
    </div>
  )
}