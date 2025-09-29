"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, ReactNode, useState } from "react";

type PrivateRouteProps = {
  children: ReactNode;
  allowedRoles: string[];
};

const PrivateRoute = ({ children, allowedRoles }: PrivateRouteProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined" || !pathname) return;

    const token = localStorage.getItem("tezcai_token");
    const role = localStorage.getItem("tezcai_role");
    const plan = localStorage.getItem("tezcai_sub");

    // 1. Not logged in or role mismatch → redirect to login
    if (!token || !role || !allowedRoles.includes(role)) {
      router.replace("/login");
      return;
    }

    // 2. Role-based route enforcement
    if (role === "user" && !pathname.startsWith("/user")) {
      router.replace("/user/signals");
      return;
    }
    if (role === "affiliate" && !pathname.startsWith("/affiliate")) {
      router.replace("/affiliate/dashboard");
      return;
    }
    if (role === "admin" && !pathname.startsWith("/admin")) {
      router.replace("/admin/dashboard");
      return;
    }

    // 3. Subscription-based restrictions (for user role)
    if (role === "user" && plan?.toLowerCase() === "signal") {
      const allowedPaths = ["/user/signals","/user/benchmark", "/user/profile","/user/change-password"];
      // allow billing sub-routes
      if (!allowedPaths.includes(pathname) && !pathname.startsWith("/user/billing")) {
        router.replace("/user/signals");
        return;
      }
    }

    setLoading(false); // ✅ passed all checks
  }, [allowedRoles, pathname, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-white bg-gray-900">
        Loading...
      </div>
    );
  }

  return <>{children}</>;
};

export default PrivateRoute;
