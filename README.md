# Figma Plugin Boilerplate

## Quickstart

- Run `yarn` to install dependencies.
- Run `yarn dev` to start dev server.
- Open `Figma` -> `Plugins` -> `Development` -> `Import plugin from manifest...` and choose `manifest.json` file from this repo.

1. To change the UI of your plugin (the Reactjs code), start editing [App.tsx](src/app/App.tsx).  
2. To interact with the Figma API edit [controller.ts](./src/plugin/controller.ts).  
3. Read more on the [Figma API Overview](https://www.figma.com/plugin-docs/api/api-overview/).

## Technologies

This repo is using:

- Reactjs
- Rsbuild
- Tailwind
- TypeScript
- Prettier
