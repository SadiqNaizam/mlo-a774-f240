import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

const AppHeaderMinimal: React.FC = () => {
  console.log('AppHeaderMinimal loaded');

  return (
    <header className="py-4 px-4 sm:px-6 lg:px-8 border-b bg-background">
      <div className="container mx-auto flex items-center justify-center sm:justify-start">
        <Link to="/" className="flex items-center gap-2 text-xl font-semibold text-primary hover:text-primary/90 transition-colors">
          <ShieldCheck className="h-7 w-7" />
          <span>AuthSecure App</span>
        </Link>
      </div>
    </header>
  );
};

export default AppHeaderMinimal;