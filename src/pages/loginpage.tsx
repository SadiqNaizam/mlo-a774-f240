import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Custom Components
import AppHeaderMinimal from '@/components/layout/AppHeaderMinimal';
import AppFooterMinimal from '@/components/layout/AppFooterMinimal';
import AuthFormCard from '@/components/AuthFormCard';

// Shadcn/ui Components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from "@/components/ui/use-toast"; // For potential feedback

// Define the validation schema using Zod
const loginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(1, { message: "Password is required." }), // Basic presence check for login
  rememberMe: z.boolean().optional().default(false),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

const LoginPage: React.FC = () => {
  console.log('LoginPage loaded');
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    console.log('Login form submitted:', data);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);

    // Example: on successful login
    if (data.email === "user@example.com" && data.password === "password") {
      toast({
        title: "Login Successful",
        description: "Redirecting you to the dashboard...",
      });
      // Assuming a dashboard route exists, e.g., /dashboard
      // navigate('/dashboard'); // Or whatever the post-login destination is.
      // For now, we'll just show a success message as no dashboard page is defined in this context.
      console.log("Login successful, would navigate to dashboard.");
    } else {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "Invalid email or password. Please try again.",
      });
      form.setError("email", { type: "manual", message: " " }); // Clear specific field error or set a general one
      form.setError("password", { type: "manual", message: "Invalid credentials" });
    }
  };

  const formFields = (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                  autoComplete="email"
                  {...field}
                  disabled={isLoading}
                />
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
              <FormLabel htmlFor="password">Password</FormLabel>
              <FormControl>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rememberMe"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  id="rememberMe"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={isLoading}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel htmlFor="rememberMe" className="font-normal text-sm">
                  Remember me
                </FormLabel>
              </div>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );

  const actionButtons = (
    <Button type="submit" className="w-full" disabled={isLoading} onClick={form.handleSubmit(onSubmit)}>
      {isLoading ? 'Signing In...' : 'Sign In'}
    </Button>
  );

  const navigationLinks = (
    <div className="text-sm text-center">
      <Link
        to="/forgot-password" // Path from App.tsx
        className="font-medium text-primary hover:underline"
      >
        Forgot your password?
      </Link>
      <p className="mt-2">
        Don&apos;t have an account?{' '}
        <Link
          to="/registration" // Path from App.tsx
          className="font-medium text-primary hover:underline"
        >
          Sign up
        </Link>
      </p>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-muted/10">
      <AppHeaderMinimal />
      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <AuthFormCard
          title="Sign in to your account"
          description="Enter your credentials to access your account."
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

export default LoginPage;