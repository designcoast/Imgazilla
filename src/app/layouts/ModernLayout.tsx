import React from 'react';

import { Account, FaviconExporter, Navigation } from '@/app/components';
import { APP_ROUTES, FAVICON_EXPORT } from '@/app/routes';

export const ModernLayout = () => {
  const ROUTE_KEYS = Object.keys(APP_ROUTES);

  return (
    <div className="flex p-3 h-full w-full">
      <Navigation defaultValue={ROUTE_KEYS[0]}>
        <div className="flex justify-between gap-1.5">
          <Navigation.List>
            {Object.keys(APP_ROUTES).map((item, index) => (
              <Navigation.Item key={index} value={item}>
                {APP_ROUTES[item]}
              </Navigation.Item>
            ))}
          </Navigation.List>
          <Account />
        </div>
        <div className="flex mt-2 h-full w-full">
          <Navigation.Content value={FAVICON_EXPORT}>
            <FaviconExporter />
          </Navigation.Content>
        </div>
      </Navigation>
    </div>
  )
}