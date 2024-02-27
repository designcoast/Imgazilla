figma.showUI(__html__, { width: 615, height: 655 });

figma.ui.onmessage = (msg) => {
  if (msg.type === 'my-custom-message') {
    const message = {
      type: "my-custom-message",
      payload: {
        value: "Hello from Figma!",
      },
    };
    figma.ui.postMessage(message);
  }

  // if (msg.type === 'create-rectangles') {
  //   const nodes = [];
  //
  //   for (let i = 0; i < msg.count; i++) {
  //     const rect = figma.createRectangle();
  //     rect.x = i * 150;
  //     rect.fills = [{ type: 'SOLID', color: { r: 1, g: 0.5, b: 0 } }];
  //     figma.currentPage.appendChild(rect);
  //     nodes.push(rect);
  //   }
  //
  //   figma.currentPage.selection = nodes;
  //   figma.viewport.scrollAndZoomIntoView(nodes);
  //
  //   // This is how figma responds back to the ui
  //   figma.ui.postMessage({
  //     type: 'create-rectangles',
  //     message: `Created ${msg.count} Rectangles`,
  //   });
  // }

  // figma.closePlugin();
};
