"use client";

import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { VerifyPendingContent } from '@/components/auth/VerifyPendingContent'

export default function VerifyPendingPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[100vh] w-full items-center justify-center bg-[#a7e667]">
          <Loader2 className="h-10 w-10 animate-spin text-forest-deep" />
        </div>
      }
    >
      <VerifyPendingContent />
    </Suspense>
  );
}