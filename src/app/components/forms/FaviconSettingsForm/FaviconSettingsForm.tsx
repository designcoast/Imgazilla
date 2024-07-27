import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import {
  ColorPicker, ExportButton,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Input,
  Switch
} from '@/app/components';
import { getFaviconImageData, getFaviconSettings } from '@/app/redux/features';

export interface FormDataType {
  websiteName: string;
  themeColor: string;
  bgColor: string;
  platforms: {
    default: boolean;
    ios: boolean;
    android: boolean;
  }
}

type Props = {
  onSubmit: (data: FormDataType) => void
}

const themeColorHistory = ['#F25350', '#2ED47A'];
const bgColorHistory = ['#F25350'];

export const FaviconSettingsForm = ({
   onSubmit
}: Props) => {
  const formSettings = useSelector(getFaviconSettings);
  const isSelectedImage = useSelector(getFaviconImageData);

  const form = useForm<FormDataType>({
    defaultValues: formSettings
  });

  const handleThemeColorChange = useCallback((value) => {
    form.setValue('themeColor', value);
  }, [form]);

  const handleBgColorChange = useCallback((value) => {
    form.setValue('bgColor', value);
  }, [form]);

  return (
    <Form {...form}>
      <form className="mb-0 flex flex-col justify-between items-center h-full" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col">
        <div className="flex flex-col gap-3 mt-4 w-full">
          <FormField
            control={form.control}
            name="websiteName"
            render={({field}) => (
              <FormItem className="flex w-full">
                <FormControl>
                  <Input placeholder="Website Name" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <label className="flex font-normal text-sm my-3">Colors</label>
          <FormField
            control={form.control}
            name="themeColor"
            render={({field}) => (
              <FormItem className="flex flex-row items-center gap-4 relative">
                <FormControl>
                  <ColorPicker onChange={handleThemeColorChange} color={field.value} history={themeColorHistory}/>
                </FormControl>
                <FormLabel className="font-light text-sm !mt-0">Theme color</FormLabel>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bgColor"
            render={({field}) => (
              <FormItem className="flex flex-row items-center gap-4 relative">
                <FormControl>
                  <ColorPicker onChange={handleBgColorChange} color={field.value} history={bgColorHistory}/>
                </FormControl>
                <FormLabel className="font-light text-sm !mt-0">Background color</FormLabel>
              </FormItem>
            )}
          />
        </div>
        <div className="mt-5">
          <label className="flex font-normal text-sm my-3">Platforms</label>
          <div className="flex flex-row gap-5">
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
                    iOS
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
        <ExportButton isShowShadow={false} isDisabled={!isSelectedImage} className="max-w-[200px]">Export</ExportButton>
      </form>
    </Form>
  )
}