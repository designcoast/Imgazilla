import { useCallback, useRef, useState } from 'react';

interface UseClipboardCommandReturn {
  copyText: (text: string) => void;
  isCopied: boolean;
  error: string | null;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
}

export const useClipboardCommand = (): UseClipboardCommandReturn => {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const copyText = useCallback((text: string) => {
    const textarea = textareaRef.current;
    if (!textarea) {
      setError('Textarea ref is not initialized');
      return;
    }

    textarea.value = text;
    textarea.select();
    textarea.setSelectionRange(0, 99999); // For mobile devices

    try {
      const successful = document.execCommand('copy');
      if (successful) {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000); // Reset isCopied state after 2 seconds
        setError(null);
      } else {
        throw new Error('Copy command was unsuccessful');
      }
    } catch (err) {
      setError('Failed to copy text');
      console.error('Error copying text: ', err);
    }
  }, []);

  return { copyText, isCopied, error, textareaRef };
};
