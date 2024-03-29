import React from 'react';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import vscDarkPlus from '@/app/styles/code-styles';

import { Button, Sheet, SheetContent } from '@/app/components';
import { code, headTag } from '@/app/components/templates/code-template';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const FaviconExporterSheet = ({ open, onOpenChange }: Props) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom">
        <div className="flex">Insert the following code in the <span className="text-primary-code px-2">{headTag}</span> section of your pages:</div>
        <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
          {code}
        </SyntaxHighlighter>
        <div className="flex justify-between mt-3">
          <Button variant="outline">Copy to clipboard</Button>
          <Button>Download favicons package</Button>
        </div>
      </SheetContent>
    </Sheet>
  )
};
