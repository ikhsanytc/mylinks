"use client";
import Navbar from "@/components/ui/Navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormEvent, useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

function Page() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const router = useRouter();
  const [accessToken, setAccessToken] = useState<string>();
  const [refreshToken, setRefreshToken] = useState<string>();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      setAccessToken(hashParams.get("access_token") || "");
      setRefreshToken(hashParams.get("refresh_token") || "");
    }
  }, []);
  useEffect(() => {
    const getSessionWithTokens = async () => {
      if (accessToken && refreshToken) {
        const { error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });
        if (error) {
          toast({
            title: error.message,
            variant: "destructive",
          });
          router.push("/forgot");
        }
      }
    };
    if (accessToken && refreshToken) {
      getSessionWithTokens();
    }
  }, [accessToken, refreshToken]);
  console.log(accessToken);
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let value: string;
    if (inputRef.current) {
      value = inputRef.current.value;
      const { error } = await supabase.auth.updateUser({ password: value });
      if (error) {
        toast({
          title: error.message,
          variant: "destructive",
        });
        return;
      }
      toast({
        title: "Berhasil ubah password!",
        description: "Sekarang login ke akun anda, menggunakan password baru!",
      });
      router.push("/login");
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Navbar />
      <Card className="w-full md:w-1/2">
        <form onSubmit={submit}>
          <CardHeader>
            <CardTitle className="text-center">Lupa Password</CardTitle>
          </CardHeader>
          <Separator className="mb-5" orientation="horizontal" />
          <CardContent className="flex justify-center items-center">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="email">
                Password Baru<span className="text-red-700">*</span>
              </Label>
              <Input
                type="password"
                id="password"
                placeholder="Password Baru..."
                ref={inputRef}
                required
              />
            </div>
          </CardContent>
          <Separator className="mb-5" orientation="horizontal" />
          <CardFooter className="flex justify-between">
            <Button variant="default" type="submit">
              Submit
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default Page;
