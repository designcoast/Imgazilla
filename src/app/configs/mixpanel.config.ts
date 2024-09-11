import mixpanel from 'mixpanel-figma';

export const initMixpanel = () => {
  mixpanel.init(process.env.MIXPANEL_TOKEN, {
    debug: process.env.NODE_ENV !== 'production',
    track_pageview: true,
    disable_persistence: true,
    disable_cookie: true,
  });
};
