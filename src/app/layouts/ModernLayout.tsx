import React from 'react';
import { Navigation } from '@/app/components';
import { APP_ROUTES } from '@/app/routes';


export const ModernLayout = () => {
  const defaultValue = Object.keys(APP_ROUTES)[0];
  return (
    <div className="p-3">
      <Navigation defaultValue={defaultValue}>
        <Navigation.List>
          {Object.keys(APP_ROUTES).map((item, index) => (
            <Navigation.Item key={index} value={item}>
              {APP_ROUTES[item]}
            </Navigation.Item>
          ))}
        </Navigation.List>
        <div className="mt-3">
          {Object.keys(APP_ROUTES).map((item, index) => (
            <Navigation.Content key={index} value={item}>
              <div>Content for {APP_ROUTES[item]}</div>
            </Navigation.Content>
          ))}
        </div>
      </Navigation>
    </div>
  )
}