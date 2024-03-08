import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Input,
  Switch
} from '@/app/components';

interface FormData {
  websiteName: string;
  themeColor: string;
  iOS: boolean;
  android: boolean;
  windows: boolean;
}

export const FaviconSettingsForm = () => {
  const form = useForm<FormData>({
    defaultValues: {
      iOS: true,
      android: false,
      windows: false,
    }
  });

  const onSubmit: SubmitHandler<FormData> = data => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-row gap-3 mt-4">
          <FormField
            control={form.control}
            name="websiteName"
            render={({ field }) => (
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
            render={({ field }) => (
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
              name="iOS"
              render={({ field }) => (
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
              name="android"
              render={({ field }) => (
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
              name="windows"
              render={({ field }) => (
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
      </form>
    </Form>

  )
}