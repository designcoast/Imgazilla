import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import {
  ColorPicker,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Input,
  Switch
} from '@/app/components';
import { getFaviconSettings } from '@/app/redux/features';

export interface FormDataType {
  websiteName: string;
  themeColor: string;
  platforms: {
    default: boolean;
    ios: boolean;
    android: boolean;
  }
}

type Props = {
  onSubmit: (data: FormDataType) => void
}

export const FaviconSettingsForm = ({
   onSubmit
}: Props) => {
  const formSettings = useSelector(getFaviconSettings);

  const form = useForm<FormDataType>({
    defaultValues: formSettings
  });

  return (
    <Form {...form}>
      <form className="mb-0" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="mx-8 mb-6">
        <div className="flex flex-row gap-3 mt-4">
          <FormField
            control={form.control}
            name="websiteName"
            render={({field}) => (
              <FormItem className="flex-1">
                <FormLabel className="mb-3 font-light">Website Name</FormLabel>
                <FormControl>
                  <Input placeholder="imgazilla.com" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="themeColor"
            render={({field}) => (
              <FormItem className="flex-1">
                <FormLabel className="mb-3 font-light">Theme color</FormLabel>
                <FormControl>
                  <ColorPicker onChange={field.onChange} color={field.value} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="mt-5">
          <label className="font-light">Platforms</label>
          <div>
            <FormField
              control={form.control}
              name="platforms.default"
              render={({field}) => (
                <FormItem className="flex flex-row items-center space-y-0 mt-3">
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled
                    />
                  </FormControl>
                  <FormLabel className="text-sm ml-2 font-normal">
                    Default
                  </FormLabel>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="platforms.ios"
              render={({field}) => (
                <FormItem className="flex flex-row items-center space-y-0 mt-3">
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="text-sm ml-2 font-normal">
                    iOS (icons)
                  </FormLabel>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="platforms.android"
              render={({field}) => (
                <FormItem className="flex flex-row items-center space-y-0 mt-3">
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="text-sm ml-2 font-normal">
                    Android
                  </FormLabel>
                </FormItem>
              )}
            />
          </div>
        </div>
        </div>
        <button className="flex justify-center w-full bg-exportButtonBGColor text-center p-[9.6px]">Export</button>
      </form>
    </Form>
  )
}