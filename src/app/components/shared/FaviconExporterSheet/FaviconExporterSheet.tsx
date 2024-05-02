import React, { useCallback, useRef, useState } from 'react';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import vscDarkPlus from '@/app/styles/code-styles';

import { AnimatedTooltip, Button, Sheet, SheetContent } from '@/app/components';
import { htmlSnippet, headTag } from '@/app/components/templates/code-template';
import { useClipboardCommand } from '@/app/hooks/useClipboardCommand';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDownload: () => void;
};

export const FaviconExporterSheet = ({ open, onOpenChange, onDownload }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const {copyText, textareaRef} = useClipboardCommand();

  const elementToCopyRef = useRef<HTMLDivElement>(null);

  const handleOnCloseTooltip = useCallback(() => {
    setTimeout(() => {
      setIsOpen(false);
    }, 1000);
  }, []);

  const handleOnCopy = useCallback(async () => {
    copyText(htmlSnippet.trim());
    setIsOpen(true);
    handleOnCloseTooltip();
  }, []);


  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom">
        <div className="flex">Insert the following code in the <span
          className="text-primary-code px-2">{headTag}</span> section of your pages:
        </div>
        <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
          {htmlSnippet}
        </SyntaxHighlighter>
        <div ref={elementToCopyRef} className="hidden">{htmlSnippet}</div>
        <div className="flex justify-between mt-3">
          <AnimatedTooltip isOpen={isOpen}>
            <Button variant="outline" onClick={handleOnCopy}>Copy to clipboard</Button>
          </AnimatedTooltip>
          <Button onClick={onDownload}>Download favicons package (zip)</Button>
        </div>
        <textarea
          ref={textareaRef}
          style={{position: 'absolute', left: '-9999px', height: '1px', top: '0', opacity: '0'}}
          readOnly
        />
      </SheetContent>
    </Sheet>
  )
};
