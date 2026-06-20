import { Suspense } from 'react';
import LoginPageClient from './login-page-client';

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="bg-muted/30 min-h-screen" />}>
      <LoginPageClient />
    </Suspense>
  );
}
