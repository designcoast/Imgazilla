import escapeHtml from 'escape-html';

type ManifestIcon = {
  src: string,
  sizes: string,
  type: string
};

export const getHtmlSnippet = ({
 color,
 isAndroid = false,
 isIOS = false,
 websiteName,
}: {
 color?: string,
 isAndroid?: boolean,
 isIOS?: boolean
 websiteName?: string,
}) => `
    <link rel="icon" href="/favicon.ico">
    ${isIOS && '<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">'}
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
    ${isAndroid && '<link rel="manifest" href="/site.webmanifest">'}
    ${isAndroid && websiteName && `<meta name="application-name" content="${escapeHtml(websiteName)}">`}
    <meta name="theme-color" content="${color || '#FFFFFF'}">
 `;

export const getManifestObject = ({
  name,
  themeColor,
  icons
}: {
  name: string,
  themeColor: string
  icons: ManifestIcon[]
}) => ({
 'short_name': 'App',
 'name': name,
 'icons': icons.map((icon: ManifestIcon) => ({
   src: icon.src,
   sizes: icon.sizes,
   type: icon.type || 'image/png'

 })),
 'start_url': 'index.html',
 'display': 'standalone',
 'theme_color': themeColor,
 'background_color': '#FFFFFF'
});

export const headTag = `<head />`;


// [
//   {
//     "src": "favicon.ico",
//     "sizes": "64x64 32x32 24x24 16x16",
//     "type": "image/x-icon"
//   }
// ]