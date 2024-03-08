import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Input,
  Switch
} from '@/app/components';

export interface FormData {
  websiteName: string;
  themeColor: string;
  platforms: {
    iOS: boolean;
    android: boolean;
    windows: boolean;
  }
}

type Props = {
  onSubmit: (data: FormData) => void
}

export const FaviconSettingsForm = ({
   onSubmit
}: Props) => {
  const form = useForm<FormData>({
    defaultValues: {
      websiteName: '',
      themeColor: '',
      platforms: {
        iOS: true,
        android: false,
        windows: false,
      }
    }
  });

  return (
    <Form {...form}>
      <form className="mb-0" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="mx-8 mb-4">
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
                  <Input placeholder="#FFFFF" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="mt-4">
          <label className="font-light">Platforms</label>
          <div>
            <FormField
              control={form.control}
              name="platforms.iOS"
              render={({field}) => (
                <FormItem className="flex flex-row items-center space-y-0 mt-3">
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="text-base ml-2 font-normal">
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
                  <FormLabel className="text-base ml-2 font-normal">
                    Android
                  </FormLabel>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="platforms.windows"
              render={({field}) => (
                <FormItem className="flex flex-row items-center space-y-0 mt-3">
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="text-base ml-2 font-normal">
                    Windows
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