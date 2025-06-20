import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils"; // For conditional class names

interface AuthFormCardProps {
  title: string;
  description?: string; // Optional description below title
  formFields: React.ReactNode;
  actionButtons: React.ReactNode;
  navigationLinks?: React.ReactNode;
  cardClassName?: string;
  headerClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  contentClassName?: string;
  footerClassName?: string;
  isLoading?: boolean; // To potentially show a loading state on the card or disable elements
}

const AuthFormCard: React.FC<AuthFormCardProps> = ({
  title,
  description,
  formFields,
  actionButtons,
  navigationLinks,
  cardClassName,
  headerClassName,
  titleClassName,
  descriptionClassName,
  contentClassName,
  footerClassName,
  isLoading,
}) => {
  console.log(`AuthFormCard loaded with title: '${title}'`);

  return (
    <Card className={cn("w-full max-w-md mx-auto shadow-lg", cardClassName)}>
      <CardHeader className={cn("text-center", headerClassName)}>
        <CardTitle className={cn("text-2xl font-bold tracking-tight", titleClassName)}>
          {title}
        </CardTitle>
        {description && (
          <p className={cn("text-sm text-muted-foreground pt-1", descriptionClassName)}>
            {description}
          </p>
        )}
      </CardHeader>
      <CardContent className={cn("space-y-4", contentClassName)}>
        {formFields}
      </CardContent>
      <CardFooter className={cn("flex flex-col items-stretch gap-4 pt-6", footerClassName)}>
        <div className="w-full space-y-2">
          {actionButtons}
        </div>
        {navigationLinks && (
          <div className="text-center text-sm text-muted-foreground">
            {navigationLinks}
          </div>
        )}
      </CardFooter>
      {isLoading && (
        <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center rounded-lg">
          {/* Optional: Add a spinner component here if available, e.g., from lucide-react */}
          <p className="text-lg font-semibold text-primary">Loading...</p>
        </div>
      )}
    </Card>
  );
};

export default AuthFormCard;