declare module '*.svg' {
  const content: any;
  export default content;
}

declare module 'react-syntax-highlighter';

declare type MessageType = {
  type: string;
  payload: any;
};