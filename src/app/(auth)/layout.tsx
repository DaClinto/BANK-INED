import { ReactNode } from 'react';

export default function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Horizon Banking
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Secure banking for your digital life
          </p>
        </div>
        {children}
      </div>
    </div>
  );
}
