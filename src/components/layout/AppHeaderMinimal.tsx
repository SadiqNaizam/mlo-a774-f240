import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import ThemeToggleButton from '@/components/ThemeToggleButton'; // Added

const AppHeaderMinimal: React.FC = () => {
  console.log('AppHeaderMinimal loaded');

  return (
    <header className=\"py-4 px-4 sm:px-6 lg:px-8 border-b bg-background\">
      <div className=\"container mx-auto flex items-center justify-between\"> {/* Changed to justify-between */}
        <Link to=\"/\" className=\"flex items-center gap-2 text-xl font-semibold text-primary hover:text-primary/90 transition-colors\">
          <ShieldCheck className=\"h-7 w-7\" />
          <span>AuthSecure App</span>
        </Link>
        <ThemeToggleButton /> {/* Added ThemeToggleButton */}
      </div>
    </header>
  );
};

export default AppHeaderMinimal;