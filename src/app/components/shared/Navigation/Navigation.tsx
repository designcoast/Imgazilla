import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  FC,
  useCallback, useEffect
} from 'react';

import { Button } from '@/app/components';
import { cn } from '@/app/lib/utils';
import { useHoverSlippery } from '@/app/hooks/useHoverSlippery';

interface NavigationContextProps {
  activeItem: string;
  setActiveItem: (value: string) => void;

  slipperyRef: any;
  addElementRef: (el: HTMLButtonElement, key: string) => void;
  onMouseEnter: (el: any, value: string) => void;
  onMouseLeave: (el: any) => void;
}

const NavigationContext = createContext<NavigationContextProps | undefined>(undefined);

interface NavigationProps {
  children: ReactNode;
  defaultValue?: string;
}

interface NavigationComponent extends FC<NavigationProps> {
  List: FC<{ children: ReactNode }>;
  Item: FC<NavigationItemProps>;
  Content: FC<NavigationContentProps>;
}

export const Navigation: NavigationComponent = ({ children, defaultValue }) => {
  const [activeItem, setActiveItem] = useState(defaultValue ?? '');

  const { slipperyRef, setActiveElement, handleMouseEnter, handleMouseLeave, addElementRef, elementsRef } = useHoverSlippery({ speed: 400 });

  useEffect(() => {
    setActiveElement(elementsRef.current[activeItem]);
  }, [setActiveElement, activeItem]);

  return (
    <NavigationContext.Provider value={{
      activeItem,
      setActiveItem,
      slipperyRef,
      addElementRef,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave
    }}>
      <div className="flex flex-col h-full w-full">{children}</div>
    </NavigationContext.Provider>
  );
};

const NavigationList: FC<{ children: ReactNode }> = ({ children }) => {
  const context = useContext(NavigationContext);

  if (!context) {
    throw new Error('NavigationItem must be used within a Navigation');
  }

  const { slipperyRef } = context;

  return (
    <div className="flex relative z-1 bg-primary-secondDark rounded-lg border px-0.5 py-0.5 gap-1.5 border-primary-primaryDark">
      {children}
      <li ref={slipperyRef} className="slippery absolute top-[2px] bg-primary-mainDark rounded-md transition-all list-none h-[37px] border border-primary-primaryDark" />
    </div>
  );
};

interface NavigationItemProps {
  value: string;
  children: ReactNode;
}

const NavigationItem: FC<NavigationItemProps> = ({value, children}) => {
  const context = useContext(NavigationContext);

  if (!context) {
    throw new Error('NavigationItem must be used within a Navigation');
  }

  const { activeItem, setActiveItem, addElementRef, onMouseEnter, onMouseLeave } = context;

  const handleActiveItem = useCallback(() => {
    setActiveItem(value);
  }, [value]);

  const handleAddElementRef = useCallback((el: HTMLButtonElement) => {
    addElementRef(el, value)
  }, [value]);

  const handleOnMouseEnter = useCallback((el: any) => {
    onMouseEnter(el, value)
  }, [value]);

  const isActive = activeItem === value;

  return (
    <Button
      ref={handleAddElementRef}
      variant="ghost"
      className={cn('relative z-10 !p-2', isActive ? 'text-primary-lightGray hover:text-primary-lightGray' : 'hover:text-primary-lightGray font-normal')}
      onClick={handleActiveItem}
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </Button>
  );
};

interface NavigationContentProps {
  value: string;
  children: ReactNode;
}

const NavigationContent: FC<NavigationContentProps> = ({ value, children }) => {
  const context = useContext(NavigationContext);

  if (!context) {
    throw new Error('NavigationContent must be used within a Navigation');
  }

  const { activeItem } = context;

  return activeItem === value ? <>{children}</> : null;
};

Navigation.List = NavigationList;
Navigation.Item = NavigationItem;
Navigation.Content = NavigationContent;
