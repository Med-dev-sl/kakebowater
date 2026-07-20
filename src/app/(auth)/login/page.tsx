"use client";

import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authAtom } from "@/lib/atoms";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, Mail, Loader2 } from "lucide-react";

export default function LoginPage() {
  const [, setAuth] = useAtom(authAtom);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Mock login delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Simple mock logic
    if (email && password) {
      setAuth({ isAuthenticated: true, user: { email, name: "Admin User" } });
      router.push("/");
    } else {
      setError("Please enter email and password");
    }
    setLoading(false);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 hover:scale-105"
        style={{ backgroundImage: "url('/bg-login.jpeg')" }}
      />
      <div className="absolute inset-0 z-0 bg-black/60 backdrop-blur-[2px]" />
      
      <div className="relative z-10 w-full max-w-md px-4">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary shadow-[0_0_20px_rgba(37,99,235,0.4)]">
            <Lock className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white transition-all hover:text-primary/90">
            WAFAMS Software
          </h1>
          <p className="mt-2 text-muted-foreground uppercase tracking-widest text-xs font-bold">
            Water Factory Management System
          </p>
        </div>

        <Card className="border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-white">Login</CardTitle>
            <CardDescription>Welcome back, please login to continue.</CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-200">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@kakebo.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-white/10 bg-white/5 pl-10 text-white placeholder:text-gray-500 focus:ring-primary/50"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" text-sm font-medium text-gray-200>
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border-white/10 bg-white/5 pl-10 text-white placeholder:text-gray-500 focus:ring-primary/50"
                  />
                </div>
              </div>
            </CardContent>
            {error && (
              <div className="px-6 pb-2">
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}
            <CardFooter>
              <Button 
                type="submit" 
                className="w-full transition-all hover:shadow-[0_0_15px_rgba(37,99,235,0.3)]" 
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
        
        <p className="mt-8 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} WAFAMS Software. All rights reserved.
        </p>
      </div>
    </div>
  );
}
