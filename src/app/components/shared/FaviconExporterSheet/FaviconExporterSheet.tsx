import React from 'react';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import vscDarkPlus from '@/app/styles/code-styles';

import { Sheet, SheetContent } from '@/app/components';

type Props = {
  open: boolean;
};

const code = `
    <link rel="icon" href="/favicon.ico">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
    <meta name="theme-color" content="#ffffff">
 `;


export const FaviconExporterSheet = ({ open }: Props) => {
  return (
    <Sheet open={open}>
      <SheetContent side="bottom">
        <div className="flex">Insert the following code in the <head /> section of your pages:</div>
        <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
          {code}
        </SyntaxHighlighter>
      </SheetContent>
    </Sheet>
  )
};
