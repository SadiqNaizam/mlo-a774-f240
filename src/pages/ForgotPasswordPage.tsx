import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';

import AppHeaderMinimal from '@/components/layout/AppHeaderMinimal';
import AppFooterMinimal from '@/components/layout/AppFooterMinimal';
import AuthFormCard from '@/components/AuthFormCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label'; // Though FormLabel from form.tsx is often used with FormField
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    console.log('Forgot password form submitted:', data);
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    toast.success(`Password reset instructions sent to ${data.email}. Please check your inbox.`);
    // Optionally, redirect or clear form
    // navigate('/'); // Or to a confirmation page
    form.reset();
  };

  React.useEffect(() => {
    console.log('ForgotPasswordPage loaded');
  }, []);

  const formFields = (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="email">Email Address</FormLabel>
              <FormControl>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  {...field}
                  disabled={isLoading}
                  className="text-base" // Added for better readability
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );

  const actionButtons = (
    <Button
      type="submit"
      className="w-full"
      disabled={isLoading || !form.formState.isValid || form.formState.isSubmitting}
      onClick={form.handleSubmit(onSubmit)} // Ensure button click triggers form submission
    >
      {isLoading ? 'Sending...' : 'Send Reset Link'}
    </Button>
  );

  const navigationLinks = (
    <p className="text-center text-sm">
      Remembered your password?{' '}
      <Link to="/" className="font-medium text-primary hover:underline">
        Sign In
      </Link>
    </p>
  );

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-stone-100 dark:from-slate-900 dark:to-stone-800">
      <AppHeaderMinimal />
      <main className="flex-grow flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <AuthFormCard
          title="Forgot Your Password?"
          description="No problem! Enter your email address below and we'll send you instructions to reset your password."
          formFields={formFields}
          actionButtons={actionButtons}
          navigationLinks={navigationLinks}
          isLoading={isLoading}
          cardClassName="w-full max-w-md"
        />
      </main>
      <AppFooterMinimal />
    </div>
  );
};

export default ForgotPasswordPage;