"use client";

import { useAtomValue } from "jotai";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { authAtom } from "@/lib/atoms";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const auth = useAtomValue(authAtom);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!auth.isAuthenticated && pathname !== "/login") {
      router.push("/login");
    }
  }, [auth.isAuthenticated, router, pathname]);

  if (!auth.isAuthenticated && pathname !== "/login") {
    return null; // Or a loading spinner
  }

  return <>{children}</>;
}
