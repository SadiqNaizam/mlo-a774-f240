import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import AppHeaderMinimal from '@/components/layout/AppHeaderMinimal';
import AppFooterMinimal from '@/components/layout/AppFooterMinimal';
import AuthFormCard from '@/components/AuthFormCard';
import PasswordStrengthIndicator from '@/components/PasswordStrengthIndicator';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from "@/components/ui/use-toast"; // For success/error messages

// Define the Zod schema for registration form validation
const registrationFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character." }),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"], // Error will be shown on confirmPassword field
});

type RegistrationFormValues = z.infer<typeof registrationFormSchema>;

const RegistrationPage: React.FC = () => {
  console.log('RegistrationPage loaded');
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationFormSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const passwordValue = form.watch('password');
  const [isLoading, setIsLoading] = React.useState(false);

  const onSubmit = async (data: RegistrationFormValues) => {
    setIsLoading(true);
    console.log('Registration form submitted:', data);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);

    // Simulate success
    toast({
      title: "Registration Successful!",
      description: "Your account has been created. Please log in.",
      variant: "default", // Or 'success' if you have that variant
    });
    navigate('/'); // Navigate to LoginPage as per App.tsx
  };

  const formFields = (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input type="email" placeholder="your.email@example.com" {...field} disabled={isLoading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} disabled={isLoading} />
              </FormControl>
              <PasswordStrengthIndicator password={passwordValue} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} disabled={isLoading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );

  const actionButtons = (
    <Button type="submit" className="w-full" onClick={form.handleSubmit(onSubmit)} disabled={isLoading}>
      {isLoading ? 'Creating Account...' : 'Sign Up'}
    </Button>
  );

  const navigationLinks = (
    <>
      Already have an account?{' '}
      <Link to="/" className="font-medium text-primary hover:underline"> {/* Path from App.tsx for LoginPage */}
        Log In
      </Link>
    </>
  );

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-900 dark:to-gray-800">
      <AppHeaderMinimal />
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <AuthFormCard
          title="Create Your Account"
          description="Join us by filling out the form below."
          formFields={formFields}
          actionButtons={actionButtons}
          navigationLinks={navigationLinks}
          isLoading={isLoading}
          cardClassName="w-full max-w-lg" // Slightly wider for registration
        />
      </main>
      <AppFooterMinimal />
    </div>
  );
};

export default RegistrationPage;