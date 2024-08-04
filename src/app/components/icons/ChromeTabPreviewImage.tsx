import React from 'react';

type Props = {
  imageData: string;
  isLight: boolean;
  backgroundColor: string;
};

export const ChromeTabPreviewImage = ({ imageData, backgroundColor, isLight }: Props) => {
  return (
    <svg width="620" height="80" viewBox="0 0 620 80" fill="none">
      <rect width="620" height="42" fill={isLight ? "#DEE1E6" : "#202124"}/>
      <path fillRule="evenodd" clipRule="evenodd"
            d="M78 42C79.3846 41.0588 82.6154 40.5882 84 34C84 34 84 42 84 42H78Z" fill={isLight ? "#FFF" : "#35363A"}/>
      <path d="M84 16C84 11.5817 87.5817 8 92 8H195C199.418 8 203 11.5817 203 16V42H84V16Z"
            fill={isLight ? "#FFF" : "#35363A"}/>
      {/*<rect x="92" y="17" width="16" height="16" fill="url(#pattern)"/>*/}
      <path
        d="M118.203 20.4688V29H117.072V20.4688H118.203ZM121.374 23.9199V29H120.284V22.6602H121.315L121.374 23.9199ZM121.151 25.5898L120.647 25.5723C120.651 25.1387 120.708 24.7383 120.817 24.3711C120.927 24 121.089 23.6777 121.304 23.4043C121.518 23.1309 121.786 22.9199 122.106 22.7715C122.427 22.6191 122.798 22.543 123.22 22.543C123.516 22.543 123.79 22.5859 124.04 22.6719C124.29 22.7539 124.507 22.8848 124.69 23.0645C124.874 23.2441 125.016 23.4746 125.118 23.7559C125.22 24.0371 125.27 24.377 125.27 24.7754V29H124.186V24.8281C124.186 24.4961 124.13 24.2305 124.016 24.0312C123.907 23.832 123.751 23.6875 123.548 23.5977C123.345 23.5039 123.106 23.457 122.833 23.457C122.513 23.457 122.245 23.5137 122.03 23.627C121.815 23.7402 121.643 23.8965 121.514 24.0957C121.386 24.2949 121.292 24.5234 121.233 24.7812C121.179 25.0352 121.151 25.3047 121.151 25.5898ZM125.259 24.9922L124.532 25.2148C124.536 24.8672 124.593 24.5332 124.702 24.2129C124.815 23.8926 124.977 23.6074 125.188 23.3574C125.403 23.1074 125.667 22.9102 125.979 22.7656C126.292 22.6172 126.649 22.543 127.052 22.543C127.391 22.543 127.692 22.5879 127.954 22.6777C128.22 22.7676 128.442 22.9062 128.622 23.0938C128.805 23.2773 128.944 23.5137 129.038 23.8027C129.132 24.0918 129.179 24.4355 129.179 24.834V29H128.089V24.8223C128.089 24.4668 128.032 24.1914 127.919 23.9961C127.809 23.7969 127.653 23.6582 127.45 23.5801C127.251 23.498 127.013 23.457 126.735 23.457C126.497 23.457 126.286 23.498 126.102 23.5801C125.919 23.6621 125.764 23.7754 125.639 23.9199C125.514 24.0605 125.419 24.2227 125.352 24.4062C125.29 24.5898 125.259 24.7852 125.259 24.9922ZM135.127 22.6602H136.111V28.8652C136.111 29.4238 135.998 29.9004 135.771 30.2949C135.545 30.6895 135.228 30.9883 134.822 31.1914C134.42 31.3984 133.955 31.502 133.427 31.502C133.209 31.502 132.951 31.4668 132.654 31.3965C132.361 31.3301 132.072 31.2148 131.787 31.0508C131.505 30.8906 131.269 30.6738 131.078 30.4004L131.646 29.7559C131.912 30.0762 132.189 30.2988 132.478 30.4238C132.771 30.5488 133.06 30.6113 133.345 30.6113C133.689 30.6113 133.986 30.5469 134.236 30.418C134.486 30.2891 134.679 30.0977 134.816 29.8438C134.957 29.5938 135.027 29.2852 135.027 28.918V24.0547L135.127 22.6602ZM130.761 25.9004V25.7773C130.761 25.293 130.818 24.8535 130.931 24.459C131.048 24.0605 131.214 23.7188 131.429 23.4336C131.648 23.1484 131.912 22.9297 132.22 22.7773C132.529 22.6211 132.877 22.543 133.263 22.543C133.662 22.543 134.009 22.6133 134.306 22.7539C134.607 22.8906 134.861 23.0918 135.068 23.3574C135.279 23.6191 135.445 23.9355 135.566 24.3066C135.687 24.6777 135.771 25.0977 135.818 25.5664V26.1055C135.775 26.5703 135.691 26.9883 135.566 27.3594C135.445 27.7305 135.279 28.0469 135.068 28.3086C134.861 28.5703 134.607 28.7715 134.306 28.9121C134.005 29.0488 133.654 29.1172 133.252 29.1172C132.873 29.1172 132.529 29.0371 132.22 28.877C131.916 28.7168 131.654 28.4922 131.435 28.2031C131.216 27.9141 131.048 27.5742 130.931 27.1836C130.818 26.7891 130.761 26.3613 130.761 25.9004ZM131.845 25.7773V25.9004C131.845 26.2168 131.877 26.5137 131.939 26.791C132.005 27.0684 132.105 27.3125 132.238 27.5234C132.375 27.7344 132.548 27.9004 132.759 28.0215C132.97 28.1387 133.222 28.1973 133.515 28.1973C133.875 28.1973 134.171 28.1211 134.406 27.9688C134.64 27.8164 134.826 27.6152 134.962 27.3652C135.103 27.1152 135.212 26.8438 135.291 26.5508V25.1387C135.248 24.9238 135.181 24.7168 135.091 24.5176C135.005 24.3145 134.892 24.1348 134.752 23.9785C134.615 23.8184 134.445 23.6914 134.242 23.5977C134.039 23.5039 133.8 23.457 133.527 23.457C133.23 23.457 132.974 23.5195 132.759 23.6445C132.548 23.7656 132.375 23.9336 132.238 24.1484C132.105 24.3594 132.005 24.6055 131.939 24.8867C131.877 25.1641 131.845 25.4609 131.845 25.7773ZM141.696 27.916V24.6523C141.696 24.4023 141.645 24.1855 141.543 24.002C141.446 23.8145 141.297 23.6699 141.098 23.5684C140.899 23.4668 140.653 23.416 140.36 23.416C140.086 23.416 139.846 23.4629 139.639 23.5566C139.436 23.6504 139.276 23.7734 139.159 23.9258C139.045 24.0781 138.989 24.2422 138.989 24.418H137.905C137.905 24.1914 137.963 23.9668 138.08 23.7441C138.198 23.5215 138.366 23.3203 138.584 23.1406C138.807 22.957 139.073 22.8125 139.381 22.707C139.694 22.5977 140.041 22.543 140.424 22.543C140.885 22.543 141.291 22.6211 141.643 22.7773C141.998 22.9336 142.276 23.1699 142.475 23.4863C142.678 23.7988 142.78 24.1914 142.78 24.6641V27.6172C142.78 27.8281 142.797 28.0527 142.832 28.291C142.871 28.5293 142.928 28.7344 143.002 28.9062V29H141.871C141.817 28.875 141.774 28.709 141.743 28.502C141.711 28.291 141.696 28.0957 141.696 27.916ZM141.883 25.1562L141.895 25.918H140.799C140.491 25.918 140.215 25.9434 139.973 25.9941C139.731 26.041 139.528 26.1133 139.364 26.2109C139.2 26.3086 139.075 26.4316 138.989 26.5801C138.903 26.7246 138.86 26.8945 138.86 27.0898C138.86 27.2891 138.905 27.4707 138.995 27.6348C139.084 27.7988 139.219 27.9297 139.399 28.0273C139.582 28.1211 139.807 28.168 140.073 28.168C140.405 28.168 140.698 28.0977 140.952 27.957C141.205 27.8164 141.407 27.6445 141.555 27.4414C141.707 27.2383 141.789 27.041 141.801 26.8496L142.264 27.3711C142.237 27.5352 142.163 27.7168 142.041 27.916C141.92 28.1152 141.758 28.3066 141.555 28.4902C141.356 28.6699 141.118 28.8203 140.84 28.9414C140.567 29.0586 140.258 29.1172 139.914 29.1172C139.485 29.1172 139.108 29.0332 138.784 28.8652C138.463 28.6973 138.213 28.4727 138.034 28.1914C137.858 27.9062 137.77 27.5879 137.77 27.2363C137.77 26.8965 137.836 26.5977 137.969 26.3398C138.102 26.0781 138.293 25.8613 138.543 25.6895C138.793 25.5137 139.094 25.3809 139.446 25.291C139.797 25.2012 140.19 25.1562 140.623 25.1562H141.883ZM149.407 28.1094V29H144.796V28.1094H149.407ZM149.237 23.4277L145.042 29H144.38V28.2031L148.546 22.6602H149.237V23.4277ZM148.757 22.6602V23.5566H144.427V22.6602H148.757ZM152.016 22.6602V29H150.926V22.6602H152.016ZM150.844 20.9785C150.844 20.8027 150.896 20.6543 151.002 20.5332C151.111 20.4121 151.271 20.3516 151.482 20.3516C151.689 20.3516 151.848 20.4121 151.957 20.5332C152.07 20.6543 152.127 20.8027 152.127 20.9785C152.127 21.1465 152.07 21.291 151.957 21.4121C151.848 21.5293 151.689 21.5879 151.482 21.5879C151.271 21.5879 151.111 21.5293 151.002 21.4121C150.896 21.291 150.844 21.1465 150.844 20.9785ZM155.134 20V29H154.044V20H155.134ZM158.252 20V29H157.162V20H158.252ZM163.93 27.916V24.6523C163.93 24.4023 163.879 24.1855 163.778 24.002C163.68 23.8145 163.532 23.6699 163.332 23.5684C163.133 23.4668 162.887 23.416 162.594 23.416C162.321 23.416 162.08 23.4629 161.873 23.5566C161.67 23.6504 161.51 23.7734 161.393 23.9258C161.28 24.0781 161.223 24.2422 161.223 24.418H160.139C160.139 24.1914 160.198 23.9668 160.315 23.7441C160.432 23.5215 160.6 23.3203 160.819 23.1406C161.041 22.957 161.307 22.8125 161.616 22.707C161.928 22.5977 162.276 22.543 162.659 22.543C163.12 22.543 163.526 22.6211 163.877 22.7773C164.233 22.9336 164.51 23.1699 164.709 23.4863C164.912 23.7988 165.014 24.1914 165.014 24.6641V27.6172C165.014 27.8281 165.032 28.0527 165.067 28.291C165.106 28.5293 165.162 28.7344 165.237 28.9062V29H164.106C164.051 28.875 164.008 28.709 163.977 28.502C163.946 28.291 163.93 28.0957 163.93 27.916ZM164.118 25.1562L164.129 25.918H163.034C162.725 25.918 162.45 25.9434 162.207 25.9941C161.965 26.041 161.762 26.1133 161.598 26.2109C161.434 26.3086 161.309 26.4316 161.223 26.5801C161.137 26.7246 161.094 26.8945 161.094 27.0898C161.094 27.2891 161.139 27.4707 161.229 27.6348C161.319 27.7988 161.454 27.9297 161.633 28.0273C161.817 28.1211 162.041 28.168 162.307 28.168C162.639 28.168 162.932 28.0977 163.186 27.957C163.44 27.8164 163.641 27.6445 163.789 27.4414C163.942 27.2383 164.024 27.041 164.036 26.8496L164.498 27.3711C164.471 27.5352 164.397 27.7168 164.276 27.916C164.155 28.1152 163.993 28.3066 163.789 28.4902C163.59 28.6699 163.352 28.8203 163.075 28.9414C162.801 29.0586 162.493 29.1172 162.149 29.1172C161.719 29.1172 161.342 29.0332 161.018 28.8652C160.698 28.6973 160.448 28.4727 160.268 28.1914C160.092 27.9062 160.004 27.5879 160.004 27.2363C160.004 26.8965 160.071 26.5977 160.204 26.3398C160.336 26.0781 160.528 25.8613 160.778 25.6895C161.028 25.5137 161.329 25.3809 161.68 25.291C162.032 25.2012 162.424 25.1562 162.858 25.1562H164.118ZM172.352 24.9277V25.8184H169.492V24.9277H172.352Z"
        fill={isLight ? "#494C4F" : "#FFF"}/>
      <path fillRule="evenodd" clipRule="evenodd"
            d="M193.584 21.4221C193.362 21.2002 193.003 21.2002 192.782 21.4221L190 24.198L187.218 21.4164C186.997 21.1945 186.638 21.1945 186.416 21.4164C186.195 21.6382 186.195 21.9966 186.416 22.2184L189.198 25L186.416 27.7816C186.195 28.0034 186.195 28.3618 186.416 28.6206C186.638 28.8055 186.997 28.8055 187.218 28.6206L190 25.802L192.782 28.6206C193.003 28.8055 193.362 28.8055 193.584 28.6206C193.805 28.3618 193.805 28.0034 193.584 27.7816L190.802 25L193.584 22.2184C193.8 22.0023 193.8 21.6382 193.584 21.4221Z"
            fill={isLight ? "#3C4043" : "#FFF"}/>
      <path fillRule="evenodd" clipRule="evenodd"
            d="M209 42C207.615 41.0588 204.385 40.5882 203 34C203 34 203 42 203 42H209Z"
            fill={isLight ? "#FFF" : "#35363A"}/>
      <path fillRule="evenodd" clipRule="evenodd"
            d="M232.714 25.9523H227.953V30.7142C227.953 31.238 227.524 31.6666 227 31.6666C226.476 31.6666 226.048 31.238 226.048 30.7142V25.9523H221.286C220.762 25.9523 220.333 25.5237 220.333 24.9999C220.333 24.4761 220.762 24.0475 221.286 24.0475H226.048V19.2856C226.048 18.7618 226.476 18.3333 227 18.3333C227.524 18.3333 227.953 18.7618 227.953 19.2856V24.0475H232.714C233.238 24.0475 233.667 24.4761 233.667 24.9999C233.667 25.5237 233.238 25.9523 232.714 25.9523Z"
            fill={isLight ? "#3C4043" : "#FFF"}/>
      <circle cx="19" cy="21" r="5.75" fill="#FF6058" stroke="#E14942" strokeWidth="0.5"/>
      <circle cx="39" cy="21" r="5.75" fill="#FFC130" stroke="#E1A325" strokeWidth="0.5"/>
      <circle cx="59" cy="21" r="5.75" fill="#27CA40" stroke="#3EAF3F" strokeWidth="0.5"/>
      <mask id="path-11-inside-1_3026_1523" fill="white">
        <path d="M0 42H620V80H0V42Z"/>
      </mask>
      <path d="M0 42H620V80H0V42Z" fill={isLight ? "#FFF" : "#35363A"}/>
      <path d="M620 79H0V81H620V79Z" fill={isLight ? "#DADCE0" : "#4D4D4D"} mask="url(#path-11-inside-1_3026_1523)"/>
      <path fillRule="evenodd" clipRule="evenodd"
            d="M561.167 58C561.992 58 562.667 57.325 562.667 56.5C562.667 55.675 561.992 55 561.167 55C560.342 55 559.667 55.675 559.667 56.5C559.667 57.325 560.342 58 561.167 58ZM561.167 59.5C560.342 59.5 559.667 60.175 559.667 61C559.667 61.825 560.342 62.5 561.167 62.5C561.992 62.5 562.667 61.825 562.667 61C562.667 60.175 561.992 59.5 561.167 59.5ZM561.167 64C560.342 64 559.667 64.675 559.667 65.5C559.667 66.325 560.342 67 561.167 67C561.992 67 562.667 66.325 562.667 65.5C562.667 64.675 561.992 64 561.167 64Z"
            fill={isLight ? "#5F6368" : "#FFF"} fillOpacity={isLight ? "1" : "0.2"}/>
      <rect x="134" y="47" width="406" height="28" rx="14" fill={isLight ? "#F1F3F4" : "#202124"}/>
      <path fillRule="evenodd" clipRule="evenodd"
            d="M153 59H152.5V58C152.5 56.62 151.38 55.5 150 55.5C148.62 55.5 147.5 56.62 147.5 58V59H147C146.45 59 146 59.45 146 60V65C146 65.55 146.45 66 147 66H153C153.55 66 154 65.55 154 65V60C154 59.45 153.55 59 153 59ZM148.5 59V58C148.5 57.17 149.17 56.5 150 56.5C150.83 56.5 151.5 57.17 151.5 58V59H148.5Z"
            fill={isLight ? "#5F6368" : "#FFF"} fillOpacity={isLight ? "1" : "0.8"}/>
      <path
        d="M168.338 58.6035V66H167.066V58.6035H168.338ZM166.971 56.6416C166.971 56.4365 167.032 56.2633 167.155 56.1221C167.283 55.9808 167.47 55.9102 167.716 55.9102C167.957 55.9102 168.142 55.9808 168.27 56.1221C168.402 56.2633 168.468 56.4365 168.468 56.6416C168.468 56.8376 168.402 57.0062 168.27 57.1475C168.142 57.2842 167.957 57.3525 167.716 57.3525C167.47 57.3525 167.283 57.2842 167.155 57.1475C167.032 57.0062 166.971 56.8376 166.971 56.6416ZM171.876 60.0732V66H170.604V58.6035H171.808L171.876 60.0732ZM171.616 62.0215L171.028 62.001C171.033 61.4951 171.099 61.028 171.227 60.5996C171.354 60.1667 171.543 59.7907 171.794 59.4717C172.045 59.1527 172.357 58.9066 172.73 58.7334C173.104 58.5557 173.537 58.4668 174.029 58.4668C174.376 58.4668 174.695 58.5169 174.986 58.6172C175.278 58.7129 175.531 58.8656 175.745 59.0752C175.959 59.2848 176.126 59.5537 176.244 59.8818C176.363 60.21 176.422 60.6064 176.422 61.0713V66H175.157V61.1328C175.157 60.7454 175.091 60.4355 174.959 60.2031C174.831 59.9707 174.649 59.8021 174.412 59.6973C174.175 59.5879 173.897 59.5332 173.578 59.5332C173.204 59.5332 172.892 59.5993 172.642 59.7314C172.391 59.8636 172.19 60.0459 172.04 60.2783C171.89 60.5107 171.78 60.7773 171.712 61.0781C171.648 61.3743 171.616 61.6888 171.616 62.0215ZM176.408 61.3242L175.561 61.584C175.565 61.1784 175.631 60.7887 175.759 60.415C175.891 60.0413 176.08 59.7087 176.326 59.417C176.577 59.1253 176.884 58.8952 177.249 58.7266C177.614 58.5534 178.031 58.4668 178.5 58.4668C178.896 58.4668 179.247 58.5192 179.553 58.624C179.863 58.7288 180.122 58.8906 180.332 59.1094C180.546 59.3236 180.708 59.5993 180.817 59.9365C180.927 60.2738 180.981 60.6748 180.981 61.1396V66H179.71V61.126C179.71 60.7113 179.644 60.39 179.512 60.1621C179.384 59.9297 179.202 59.7679 178.965 59.6768C178.732 59.5811 178.454 59.5332 178.131 59.5332C177.853 59.5332 177.607 59.5811 177.393 59.6768C177.178 59.7725 176.998 59.9046 176.853 60.0732C176.707 60.2373 176.595 60.4264 176.518 60.6406C176.445 60.8548 176.408 61.0827 176.408 61.3242ZM187.938 58.6035H189.086V65.8428C189.086 66.4945 188.954 67.0505 188.689 67.5107C188.425 67.971 188.056 68.3197 187.582 68.5566C187.113 68.7982 186.57 68.9189 185.955 68.9189C185.7 68.9189 185.399 68.8779 185.053 68.7959C184.711 68.7184 184.374 68.584 184.041 68.3926C183.713 68.2057 183.437 67.9528 183.214 67.6338L183.877 66.8818C184.187 67.2555 184.51 67.5153 184.848 67.6611C185.189 67.807 185.527 67.8799 185.859 67.8799C186.26 67.8799 186.607 67.8047 186.898 67.6543C187.19 67.5039 187.416 67.2806 187.575 66.9844C187.739 66.6927 187.821 66.3327 187.821 65.9043V60.2305L187.938 58.6035ZM182.845 62.3838V62.2402C182.845 61.6751 182.911 61.1624 183.043 60.7021C183.18 60.2373 183.373 59.8385 183.624 59.5059C183.879 59.1732 184.187 58.918 184.547 58.7402C184.907 58.5579 185.312 58.4668 185.764 58.4668C186.229 58.4668 186.634 58.5488 186.98 58.7129C187.331 58.8724 187.628 59.1071 187.869 59.417C188.115 59.7223 188.309 60.0915 188.45 60.5244C188.591 60.9574 188.689 61.4473 188.744 61.9941V62.623C188.694 63.1654 188.596 63.653 188.45 64.0859C188.309 64.5189 188.115 64.888 187.869 65.1934C187.628 65.4987 187.331 65.7334 186.98 65.8975C186.63 66.057 186.219 66.1367 185.75 66.1367C185.308 66.1367 184.907 66.0433 184.547 65.8564C184.191 65.6696 183.886 65.4076 183.631 65.0703C183.376 64.7331 183.18 64.3366 183.043 63.8809C182.911 63.4206 182.845 62.9215 182.845 62.3838ZM184.109 62.2402V62.3838C184.109 62.7529 184.146 63.0993 184.219 63.4229C184.296 63.7464 184.412 64.0312 184.567 64.2773C184.727 64.5234 184.93 64.7171 185.176 64.8584C185.422 64.9951 185.716 65.0635 186.058 65.0635C186.477 65.0635 186.823 64.9746 187.097 64.7969C187.37 64.6191 187.587 64.3844 187.746 64.0928C187.91 63.8011 188.038 63.4844 188.129 63.1426V61.4951C188.079 61.2445 188.001 61.0029 187.896 60.7705C187.796 60.5335 187.664 60.3239 187.5 60.1416C187.34 59.9548 187.142 59.8066 186.905 59.6973C186.668 59.5879 186.39 59.5332 186.071 59.5332C185.725 59.5332 185.426 59.6061 185.176 59.752C184.93 59.8932 184.727 60.0892 184.567 60.3398C184.412 60.5859 184.296 60.873 184.219 61.2012C184.146 61.5247 184.109 61.8711 184.109 62.2402ZM195.618 64.7354V60.9277C195.618 60.6361 195.559 60.3831 195.44 60.1689C195.326 59.9502 195.153 59.7816 194.921 59.6631C194.688 59.5446 194.401 59.4854 194.06 59.4854C193.741 59.4854 193.46 59.54 193.219 59.6494C192.982 59.7588 192.795 59.9023 192.658 60.0801C192.526 60.2578 192.46 60.4492 192.46 60.6543H191.195C191.195 60.39 191.264 60.1279 191.4 59.8682C191.537 59.6084 191.733 59.3737 191.988 59.1641C192.248 58.9499 192.558 58.7812 192.918 58.6582C193.283 58.5306 193.688 58.4668 194.135 58.4668C194.673 58.4668 195.146 58.5579 195.557 58.7402C195.971 58.9225 196.295 59.1982 196.527 59.5674C196.764 59.932 196.883 60.39 196.883 60.9414V64.3867C196.883 64.6328 196.903 64.8949 196.944 65.1729C196.99 65.4508 197.056 65.6901 197.143 65.8906V66H195.823C195.759 65.8542 195.709 65.6605 195.673 65.4189C195.636 65.1729 195.618 64.945 195.618 64.7354ZM195.837 61.5156L195.851 62.4043H194.572C194.212 62.4043 193.891 62.4339 193.608 62.4932C193.326 62.5479 193.089 62.6322 192.897 62.7461C192.706 62.86 192.56 63.0036 192.46 63.1768C192.36 63.3454 192.31 63.5436 192.31 63.7715C192.31 64.0039 192.362 64.2158 192.467 64.4072C192.572 64.5986 192.729 64.7513 192.938 64.8652C193.153 64.9746 193.415 65.0293 193.725 65.0293C194.112 65.0293 194.454 64.9473 194.75 64.7832C195.046 64.6191 195.281 64.4186 195.454 64.1816C195.632 63.9447 195.728 63.7145 195.741 63.4912L196.281 64.0996C196.249 64.291 196.163 64.5029 196.021 64.7354C195.88 64.9678 195.691 65.1911 195.454 65.4053C195.222 65.6149 194.944 65.7904 194.62 65.9316C194.301 66.0684 193.941 66.1367 193.54 66.1367C193.039 66.1367 192.599 66.0387 192.221 65.8428C191.847 65.6468 191.555 65.3848 191.346 65.0566C191.141 64.724 191.038 64.3525 191.038 63.9424C191.038 63.5459 191.116 63.1973 191.271 62.8965C191.425 62.5911 191.649 62.3382 191.94 62.1377C192.232 61.9326 192.620 61.7777 192.993 61.6729C193.403 61.568 193.861 61.5156 194.367 61.5156H195.837ZM204.632 64.9609V66H199.252V64.9609H204.632ZM204.434 59.499L199.539 66H198.767V65.0703L203.627 58.6035H204.434V59.499ZM203.873 58.6035V59.6494H198.821V58.6035H203.873ZM207.691 58.6035V66H206.42V58.6035H207.691ZM206.324 56.6416C206.324 56.4365 206.386 56.2633 206.509 56.1221C206.636 55.9808 206.823 55.9102 207.069 55.9102C207.311 55.9102 207.495 55.9808 207.623 56.1221C207.755 56.2633 207.821 56.4365 207.821 56.6416C207.821 56.8376 207.755 57.0062 207.623 57.1475C207.495 57.2842 207.311 57.3525 207.069 57.3525C206.823 57.3525 206.636 57.2842 206.509 57.1475C206.386 57.0062 206.324 56.8376 206.324 56.6416ZM211.346 55.5V66H210.074V55.5H211.346ZM215 55.5V66H213.729V55.5H215ZM221.642 64.7354V60.9277C221.642 60.6361 221.582 60.3831 221.464 60.1689C221.35 59.9502 221.177 59.7816 220.944 59.6631C220.712 59.5446 220.425 59.4854 220.083 59.4854C219.764 59.4854 219.484 59.54 219.242 59.6494C219.005 59.7588 218.818 59.9023 218.682 60.0801C218.549 60.2578 218.483 60.4492 218.483 60.6543H217.219C217.219 60.39 217.287 60.1279 217.424 59.8682C217.561 59.6084 217.757 59.3737 218.012 59.1641C218.271 58.9499 218.581 58.7812 218.941 58.6582C219.306 58.5306 219.712 58.4668 220.158 58.4668C220.696 58.4668 221.17 58.5579 221.58 58.7402C221.995 58.9225 222.318 59.1982 222.551 59.5674C222.788 59.932 222.906 60.39 222.906 60.9414V64.3867C222.906 64.6328 222.927 64.8949 222.968 65.1729C223.013 65.4508 223.079 65.6901 223.166 65.8906V66H221.847C221.783 65.8542 221.733 65.6605 221.696 65.4189C221.66 65.1729 221.642 64.945 221.642 64.7354ZM221.86 61.5156L221.874 62.4043H220.596C220.236 62.4043 219.914 62.4339 219.632 62.4932C219.349 62.5479 219.112 62.6322 218.921 62.7461C218.729 62.86 218.584 63.0036 218.483 63.1768C218.383 63.3454 218.333 63.5436 218.333 63.7715C218.333 64.0039 218.385 64.2158 218.49 64.4072C218.595 64.5986 218.752 64.7513 218.962 64.8652C219.176 64.9746 219.438 65.0293 219.748 65.0293C220.135 65.0293 220.477 64.9473 220.773 64.7832C221.07 64.6191 221.304 64.4186 221.478 64.1816C221.655 63.9447 221.751 63.7145 221.765 63.4912L222.305 64.0996C222.273 64.291 222.186 64.5029 222.045 64.7354C221.904 64.9678 221.715 65.1911 221.478 65.4053C221.245 65.6149 220.967 65.7904 220.644 65.9316C220.325 66.0684 219.965 66.1367 219.563 66.1367C219.062 66.1367 218.622 66.0387 218.244 65.8428C217.87 65.6468 217.579 65.3848 217.369 65.0566C217.164 64.724 217.062 64.3525 217.062 63.9424C217.062 63.5459 217.139 63.1973 217.294 62.8965C217.449 62.5911 217.672 62.3382 217.964 62.1377C218.256 61.9326 218.606 61.7777 219.017 61.6729C219.427 61.568 219.885 61.5156 220.391 61.5156H221.86ZM225.166 65.3301C225.166 65.1159 225.232 64.9359 225.364 64.79C225.501 64.6396 225.697 64.5645 225.952 64.5645C226.207 64.5645 226.401 64.6396 226.533 64.79C226.67 64.9359 226.738 65.1159 226.738 65.3301C226.738 65.5397 226.67 65.7174 226.533 65.8633C226.401 66.0091 226.207 66.082 225.952 66.082C225.697 66.082 225.501 66.0091 225.364 65.8633C225.232 65.7174 225.166 65.5397 225.166 65.3301ZM233.448 64.7354V60.9277C233.448 60.6361 233.389 60.3831 233.271 60.1689C233.157 59.9502 232.983 59.7816 232.751 59.6631C232.519 59.5446 232.231 59.4854 231.89 59.4854C231.571 59.4854 231.29 59.54 231.049 59.6494C230.812 59.7588 230.625 59.9023 230.488 60.0801C230.356 60.2578 230.29 60.4492 230.29 60.6543H229.025C229.025 60.39 229.094 60.1279 229.23 59.8682C229.367 59.6084 229.563 59.3737 229.818 59.1641C230.078 58.9499 230.388 58.7812 230.748 58.6582C231.113 58.5306 231.518 58.4668 231.965 58.4668C232.503 58.4668 232.977 58.5579 233.387 58.7402C233.801 58.9225 234.125 59.1982 234.357 59.5674C234.594 59.932 234.713 60.39 234.713 60.9414V64.3867C234.713 64.6328 234.733 64.8949 234.774 65.1729C234.82 65.4508 234.886 65.6901 234.973 65.8906V66H233.653C233.59 65.8542 233.539 65.6605 233.503 65.4189C233.466 65.1729 233.448 64.945 233.448 64.7354ZM233.667 61.5156L233.681 62.4043H232.402C232.042 62.4043 231.721 62.4339 231.438 62.4932C231.156 62.5479 230.919 62.6322 230.728 62.7461C230.536 62.86 230.39 63.0036 230.29 63.1768C230.19 63.3454 230.14 63.5436 230.14 63.7715C230.14 64.0039 230.192 64.2158 230.297 64.4072C230.402 64.5986 230.559 64.7513 230.769 64.8652C230.983 64.9746 231.245 65.0293 231.555 65.0293C231.942 65.0293 232.284 64.9473 232.58 64.7832C232.876 64.6191 233.111 64.4186 233.284 64.1816C233.462 63.9447 233.558 63.7145 233.571 63.4912L234.111 64.0996C234.079 64.291 233.993 64.5029 233.852 64.7354C233.71 64.9678 233.521 65.1911 233.284 65.4053C233.052 65.6149 232.774 65.7904 232.45 65.9316C232.131 66.0684 231.771 66.1367 231.37 66.1367C230.869 66.1367 230.429 66.0387 230.051 65.8428C229.677 65.6468 229.385 65.3848 229.176 65.0566C228.971 64.724 228.868 64.3525 228.868 63.9424C228.868 63.5459 228.946 63.1973 229.101 62.8965C229.256 62.5911 229.479 62.3382 229.771 62.1377C230.062 61.9326 230.413 61.7777 230.823 61.6729C231.233 61.568 231.691 61.5156 232.197 61.5156H233.667ZM238.217 60.0254V68.8438H236.945V58.6035H238.107L238.217 60.0254ZM243.2 62.2402V62.3838C243.2 62.9215 243.136 63.4206 243.009 63.8809C242.881 64.3366 242.694 64.7331 242.448 65.0703C242.207 65.4076 241.908 65.6696 241.553 65.8564C241.197 66.0433 240.789 66.1367 240.329 66.1367C239.86 66.1367 239.445 66.0592 239.085 65.9043C238.725 65.7493 238.42 65.5238 238.169 65.2275C237.918 64.9313 237.718 64.5758 237.567 64.1611C237.422 63.7464 237.321 63.2793 237.267 62.7598V61.9941C237.321 61.4473 237.424 60.9574 237.574 60.5244C237.725 60.0915 237.923 59.7223 238.169 59.417C238.42 59.1071 238.723 58.8724 239.078 58.7129C239.434 58.5488 239.844 58.4668 240.309 58.4668C240.773 58.4668 241.186 58.5579 241.546 58.7402C241.906 58.918 242.209 59.1732 242.455 59.5059C242.701 59.8385 242.886 60.2373 243.009 60.7021C243.136 61.1624 243.2 61.6751 243.2 62.2402ZM241.929 62.3838V62.2402C241.929 61.8711 241.89 61.5247 241.812 61.2012C241.735 60.873 241.614 60.5859 241.45 60.3398C241.291 60.0892 241.086 59.8932 240.835 59.752C240.584 59.6061 240.286 59.5332 239.939 59.5332C239.62 59.5332 239.342 59.5879 239.105 59.6973C238.873 59.8066 238.675 59.9548 238.511 60.1416C238.347 60.3239 238.212 60.5335 238.107 60.7705C238.007 61.0029 237.932 61.2445 237.882 61.4951V63.2656C237.973 63.5846 238.101 63.8854 238.265 64.168C238.429 64.446 238.647 64.6715 238.921 64.8447C239.194 65.0133 239.538 65.0977 239.953 65.0977C240.295 65.0977 240.589 65.027 240.835 64.8857C241.086 64.7399 241.291 64.5417 241.45 64.291C241.614 64.0404 241.735 63.7533 241.812 63.4297C241.89 63.1016 241.929 62.7529 241.929 62.3838ZM246.328 60.0254V68.8438H245.057V58.6035H246.219L246.328 60.0254ZM251.312 62.2402V62.3838C251.312 62.9215 251.248 63.4206 251.12 63.8809C250.993 64.3366 250.806 64.7331 250.56 65.0703C250.318 65.4076 250.02 65.6696 249.664 65.8564C249.309 66.0433 248.901 66.1367 248.44 66.1367C247.971 66.1367 247.556 66.0592 247.196 65.9043C246.836 65.7493 246.531 65.5238 246.28 65.2275C246.03 64.9313 245.829 64.5758 245.679 64.1611C245.533 63.7464 245.433 63.2793 245.378 62.7598V61.9941C245.433 61.4473 245.535 60.9574 245.686 60.5244C245.836 60.0915 246.034 59.7223 246.28 59.417C246.531 59.1071 246.834 58.8724 247.189 58.7129C247.545 58.5488 247.955 58.4668 248.42 58.4668C248.885 58.4668 249.297 58.5579 249.657 58.7402C250.017 58.918 250.32 59.1732 250.566 59.5059C250.812 59.8385 250.997 60.2373 251.12 60.7021C251.248 61.1624 251.312 61.6751 251.312 62.2402ZM250.04 62.3838V62.2402C250.04 61.8711 250.001 61.5247 249.924 61.2012C249.846 60.873 249.726 60.5859 249.562 60.3398C249.402 60.0892 249.197 59.8932 248.946 59.752C248.696 59.6061 248.397 59.5332 248.051 59.5332C247.732 59.5332 247.454 59.5879 247.217 59.6973C246.984 59.8066 246.786 59.9548 246.622 60.1416C246.458 60.3239 246.324 60.5335 246.219 60.7705C246.118 61.0029 246.043 61.2445 245.993 61.4951V63.2656C246.084 63.5846 246.212 63.8854 246.376 64.168C246.54 64.446 246.759 64.6715 247.032 64.8447C247.306 65.0133 247.65 65.0977 248.064 65.0977C248.406 65.0977 248.7 65.027 248.946 64.8857C249.197 64.7399 249.402 64.5417 249.562 64.291C249.726 64.0404 249.846 63.7533 249.924 63.4297C250.001 63.1016 250.04 62.7529 250.04 62.3838Z"
        fill={isLight ? "#202124" : "#FFF"}/>
      <path fillRule="evenodd" clipRule="evenodd"
            d="M527.362 58.8401L523.969 58.5456L522.644 55.4259C522.406 54.858 521.592 54.858 521.354 55.4259L520.029 58.5526L516.643 58.8401C516.026 58.8892 515.774 59.6603 516.243 60.0669L518.816 62.2963L518.045 65.6053C517.905 66.2083 518.557 66.685 519.09 66.3625L521.999 64.6098L524.908 66.3695C525.441 66.692 526.093 66.2153 525.953 65.6124L525.182 62.2963L527.755 60.0669C528.224 59.6603 527.979 58.8892 527.362 58.8401ZM521.999 63.2988L519.363 64.8903L520.064 61.8897L517.737 59.8706L520.807 59.6042L521.999 56.7789L523.198 59.6112L526.268 59.8777L523.941 61.8967L524.642 64.8973L521.999 63.2988Z"
            fill={isLight ? "#5F6368" : "#FFF"} fillOpacity={isLight ? "1" : "0.2"}/>
      <path fillRule="evenodd" clipRule="evenodd"
            d="M25.2299 60.0768H16.6279L20.386 56.3188C20.6863 56.0185 20.6863 55.5256 20.386 55.2253C20.0857 54.9249 19.6005 54.9249 19.3002 55.2253L14.2253 60.3002C13.9249 60.6005 13.9249 61.0857 14.2253 61.386L19.3002 66.4609C19.6005 66.7613 20.0857 66.7613 20.386 66.4609C20.6863 66.1606 20.6863 65.6754 20.386 65.3751L16.6279 61.617H25.2299C25.6535 61.617 26 61.2705 26 60.8469C26 60.4234 25.6535 60.0768 25.2299 60.0768Z"
            fill={isLight ? "#5F6368" : "#FFF"}/>
      <path fillRule="evenodd" clipRule="evenodd"
            d="M45.7701 61.617H54.3721L50.614 65.3751C50.3137 65.6754 50.3137 66.1683 50.614 66.4686C50.9143 66.769 51.3995 66.769 51.6998 66.4686L56.7747 61.3937C57.0751 61.0934 57.0751 60.6082 56.7747 60.3079L51.7075 55.2253C51.4072 54.9249 50.922 54.9249 50.6217 55.2253C50.3214 55.5256 50.3214 56.0107 50.6217 56.3111L54.3721 60.0768H45.7701C45.3465 60.0768 45 60.4234 45 60.8469C45 61.2705 45.3465 61.617 45.7701 61.617Z"
            fill={isLight ? "#BABCBE" : "#FFF"} fillOpacity={isLight ? "1" : "0.6"}/>
      <path fillRule="evenodd" clipRule="evenodd"
            d="M87.9979 59.3312V55.8045C87.9979 55.5045 87.6379 55.3579 87.4312 55.5712L86.2446 56.7579C85.0379 55.5512 83.3179 54.8579 81.4379 55.0245C78.6446 55.2779 76.3446 57.5245 76.0379 60.3179C75.6379 63.9312 78.4579 66.9979 81.9979 66.9979C85.0579 66.9979 87.5846 64.7046 87.9512 61.7446C87.9979 61.3446 87.6846 60.9979 87.2846 60.9979C86.9512 60.9979 86.6712 61.2446 86.6312 61.5712C86.3446 63.8979 84.3379 65.6979 81.9312 65.6645C79.4579 65.6312 77.3712 63.5445 77.3312 61.0645C77.2912 58.4646 79.4046 56.3312 81.9979 56.3312C83.2846 56.3312 84.4512 56.8579 85.2979 57.6979L83.9046 59.0912C83.6912 59.3045 83.8379 59.6645 84.1379 59.6645H87.6646C87.8512 59.6645 87.9979 59.5179 87.9979 59.3312Z"
            fill={isLight ? "#5F6368" : "#FFF"}/>
      <path fillRule="evenodd" clipRule="evenodd"
            d="M113 55.0078C112.818 54.9827 112.626 55.0354 112.478 55.1688L107.211 59.9354C106.947 60.1741 106.926 60.5809 107.163 60.8457C107.402 61.1125 107.813 61.134 108.078 60.8937L108.474 60.5356V65.7047V66C108.474 66.5523 108.922 67 109.474 67H109.763H116.206H116.495C117.048 67 117.495 66.5523 117.495 66V65.7047V60.5076L117.922 60.8937C118.187 61.134 118.598 61.1125 118.837 60.8457C119.074 60.5809 119.053 60.1741 118.789 59.9354L113.522 55.1688C113.375 55.0354 113.183 54.9827 113 55.0078ZM109.763 59.3693V60.228V61.1857V61.228V63.7047V65V65.0423V65.7047H110.43H110.474H111.763H114.206H115.495H115.54H116.206V65.0423V65V63.7047V61.228V61.1857V60.228V59.3413L113 56.4395L109.763 59.3693Z"
            fill={isLight ? "#5F6368" : "#FFF"}/>
      <rect x="92" y="15" width="20" height="20" rx="0" fill={backgroundColor}/>
      <rect x="92" y="15" width="20" height="20" rx="0" fill="url(#imagefiller)"/>
      <defs>
        <pattern id="imagefiller" width="20" height="20">
          <rect width="20" height="20" fill={backgroundColor}/>
          <use xlinkHref="#faviconPreview" transform="scale(0.00224719)"/>
          <image id="faviconPreview" width="20" height="20" href={imageData}/>
        </pattern>
      </defs>
    </svg>
  )
}