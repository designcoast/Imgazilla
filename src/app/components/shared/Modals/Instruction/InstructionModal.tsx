import React from 'react';

import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/app/components';

const IMAGE_CREDITS_COST = process.env.IMAGE_CREDITS_COST;
const FAVICON_ARCHIVE_CREDITS_COST = process.env.FAVICON_ARCHIVE_CREDITS_COST;

//TODO: Extract all text from the component into json file
export const InstructionModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='ghost'>Instructions</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="w-[80%]">
          <DialogTitle className="text-left text-lg">Welcome to the Favicon Exporter and Image Optimiser Plugin!</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 pt-4">
          <p className="font-semibold">Exporting Favicons:</p>
          <ul className="flex flex-col gap-3">
            <li className="text-sm">1. Select the image you want to use for your favicon.</li>
            <li className="text-sm">2. Click on the "Export" button.</li>
            <li className="text-sm">3. Each export of a favicon archive will cost you {FAVICON_ARCHIVE_CREDITS_COST} credits.</li>
          </ul>
        </div>
        <div className="grid gap-4 pt-4">
          <p className="font-semibold">Image Optimization:</p>
          <ul className="flex flex-col gap-3">
            <li className="text-sm">1. Click on the "Image optimization" tab.</li>
            <li className="text-sm">2. Each archive will cost you {IMAGE_CREDITS_COST} credits <span className="inline-block font-bold ml-0.5">(Without limiting the number of images in each archive)</span>.</li>
          </ul>
        </div>
        <div className="grid gap-4 pt-4">
          <p className="font-semibold">Credit Management:</p>
          <ul className="flex flex-col gap-3">
            <li className="text-sm flex">1. Check your current credit balance in the top-right corner.</li>
            <li className="text-sm flex">2. Monitor your usage and balance to ensure smooth usage of the plugin.</li>
            <li className="text-sm flex">3. Credits stack.</li>
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  )
}