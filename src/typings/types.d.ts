declare module '*.svg' {
  const content: any;
  export default content;
}

declare module 'react-syntax-highlighter';

declare type MessageType = {
  type: string;
  payload: any;
};

declare interface ImageInfo {
  uuid: string;
  width: number;
  height: number;
  extension: string;
  name: string; // We might simulate this or use the node name
  uintArray: Uint8Array;
}