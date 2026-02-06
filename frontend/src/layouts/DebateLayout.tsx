import { ReactNode } from 'react';
import { Sidebar } from '@/components/Sidebar';

interface DebateLayoutProps {
  children: ReactNode;
}

export function DebateLayout({ children }: DebateLayoutProps) {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
