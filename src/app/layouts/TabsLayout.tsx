import React, { useCallback } from 'react';
import { Outlet } from 'react-router-dom';

import { Account, Navigation } from '@/app/components';
import { useMixpanel } from '@/app/hooks/useMixpanleAnalytics';
import { TAB_ROUTES } from '@/app/constants';

export const TabsLayout = () => {
  const ROUTE_KEYS = Object.keys(TAB_ROUTES);
  const trackClick = useMixpanel();

  const handleOnClick = useCallback((item: string) => {
    trackClick('click', {
      name: item,
    });
  }, []);

  return (
    <div className='flex p-3 h-full w-full'>
      <Navigation defaultValue={ROUTE_KEYS[0]}>
        <div className='flex justify-center gap-1.5'>
          <Navigation.List>
            {Object.keys(TAB_ROUTES).map((item, index) => {
              const { name, path } = TAB_ROUTES[item];
              return (
                <Navigation.Item
                  key={index}
                  asLink
                  to={path}
                  value={item}
                  onClick={() => handleOnClick(item)}
                >
                  {name}
                </Navigation.Item>
              );
            })}
          </Navigation.List>
          <Account />
        </div>
        <div className='flex mt-2 h-full w-full'>
          <Navigation.Content>
            <Outlet />
          </Navigation.Content>
        </div>
      </Navigation>
    </div>
  );
};
