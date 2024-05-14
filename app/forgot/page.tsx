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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { FormEvent, useRef } from "react";

function Page() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let value: string;
    if (inputRef.current) {
      value = inputRef.current.value;
      const { error } = await supabase.auth.resetPasswordForEmail(value, {
        redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/resetpassword`,
      });
      if (error) {
        toast({
          title: error.message,
          variant: "destructive",
        });
        return;
      }
      toast({
        title: "Cek email anda!",
      });
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <Navbar />
      <Card className="w-full md:w-1/2">
        <form onSubmit={submit}>
          <CardHeader>
            <CardTitle className="text-center">Forgot Password</CardTitle>
          </CardHeader>
          <Separator className="mb-5" orientation="horizontal" />
          <CardContent className="flex justify-center items-center">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="email">
                Email<span className="text-red-700">*</span>
              </Label>
              <Input
                type="email"
                id="email"
                placeholder="Email"
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
            <Button variant="outline" asChild type="button">
              <Link href="/login">Back</Link>
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default Page;
