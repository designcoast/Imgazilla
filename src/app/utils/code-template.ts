import escapeHtml from 'escape-html';

type ManifestIcon = {
  src: string,
  sizes: string,
  type: string
};

const appleHtmlSnippet = `
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="/apple-touch-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="/apple-touch-icon-72x72.png">    
    <link rel="apple-touch-icon" sizes="76x76" href="/apple-touch-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="/apple-touch-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="/apple-touch-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="167x167" href="/apple-touch-icon-167x167.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-180x180.png">
    <link rel="apple-touch-icon" sizes="1024x1024" href="/apple-touch-icon-1024x1024.png">`;

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
}) => {
  const snippet = [];

  snippet.push(
    `
    <link rel="icon" href="/favicon.ico">`
  )

  if (isIOS) {
    snippet.push(appleHtmlSnippet);
  }

  snippet.push(
    `
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">`
  );

  if (isAndroid && !websiteName) {
    snippet.push(
      `
      <link rel="manifest" href="/site.webmanifest">`
    )
  }

  if (isAndroid && websiteName) {
    snippet.push(
      `
      <meta name="application-name" content="${escapeHtml(websiteName)}">`
    )
  }

  snippet.push(
    `
    <meta name="theme-color" content="${color || '#FFFFFF'}">`
  )

  return snippet
};


// `
//
//     ${isIOS ? appleHtmlSnippent : ''}
//     <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
//     <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
//     <link rel="icon" type="image/svg+xml" href="/favicon.svg">
//     ${isAndroid && '<link rel="manifest" href="/site.webmanifest">'}
//     ${isAndroid && websiteName && `<meta name="application-name" content="${escapeHtml(websiteName)}">`}
//     <meta name="theme-color" content="${color || '#FFFFFF'}">
//  `


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