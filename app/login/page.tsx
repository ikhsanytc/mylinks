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
import {
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import { LoginInput } from "@/types/all-types";
import { List } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

function Page() {
  const router = useRouter();
  const [loginProcess, setLoginProcess] = useState(false);
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>();
  useEffect(() => {
    supabase.auth.getUser().then((user) => {
      if (user.data.user) {
        toast({
          title: "Kamu sudah login!",
          description: "Ngapain masuk ke halaman login lagi?",
        });
        router.push("/");
      }
    });
  }, []);
  const submit: SubmitHandler<LoginInput> = async ({ email, password }) => {
    setLoginProcess(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      toast({
        title: error.message,
        variant: "destructive",
      });
      setLoginProcess(false);
      return;
    }
    toast({
      title: "Berhasil Login",
      description: "Kamu baru saja berhasil login!",
    });
    router.push("/");
  };

  const loginWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      },
    });
    if (error) {
      toast({
        title: error.message,
        variant: "destructive",
      });
      return;
    }
  };
  return (
    <div className="justify-center items-center flex min-h-screen px-4">
      <Navbar />
      <Card
        className={`w-full md:w-1/2 ${loginProcess && "pointer-events-none"}`}
      >
        <form onSubmit={handleSubmit(submit)}>
          <CardHeader>
            <CardTitle className="text-center">Login</CardTitle>
          </CardHeader>
          <Separator orientation="horizontal" className="mb-5" />
          <CardContent className="flex flex-col justify-center items-center gap-5">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label
                htmlFor="email"
                className={`${errors.email && "text-red-600"}`}
              >
                Email<span className="text-red-700">*</span>
              </Label>
              <Input
                type="email"
                id="email"
                placeholder="Email..."
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email tidak boleh kosong!",
                  },
                })}
              />
              {errors.email && (
                <p className="text-xs text-red-600">{errors.email?.message}</p>
              )}
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label
                htmlFor="password"
                className={`${errors.password && "text-red-600"}`}
              >
                Password<span className="text-red-700">*</span>
              </Label>
              <Input
                type="password"
                id="password"
                placeholder="Password..."
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password tidak boleh kosong!",
                  },
                  minLength: {
                    value: 8,
                    message: "Password minimal 8 karakter!",
                  },
                })}
              />
              {errors.password && (
                <p className="text-xs text-red-600">
                  {errors.password?.message}
                </p>
              )}
            </div>
          </CardContent>
          <Separator orientation="horizontal" className="mb-5" />
          <CardFooter className="flex justify-between">
            <Button
              variant="default"
              type="submit"
              disabled={loginProcess ? true : false}
            >
              Login
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" asChild type="button">
                <Link href="/register">Register</Link>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" type="button">
                    <List />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Pilihan Login</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/forgot">Lupa Password</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={loginWithGoogle}>
                    Google
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default Page;
