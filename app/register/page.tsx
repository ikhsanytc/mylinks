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
import { RegisterInput } from "@/types/all-types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

function Page() {
  const [registerProcess, setRegisterProcess] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterInput>();
  const { toast } = useToast();
  const router = useRouter();
  useEffect(() => {
    supabase.auth.getUser().then((user) => {
      if (user.data.user) {
        toast({
          title: "Kamu sudah login!",
          description: "Ngapain masuk ke halaman register?",
        });
        router.push("/");
      }
    });
  }, []);
  const submit: SubmitHandler<RegisterInput> = async (input) => {
    if (input.password === input.repeatPassword) {
      toast({
        title: "Tunggu Sebentar...",
      });
      setRegisterProcess(true);
      const { error } = await supabase.auth.signUp({
        email: input.email,
        password: input.password,
        options: {
          emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
        },
      });
      if (error) {
        toast({
          title: error.message,
          variant: "destructive",
        });
        setRegisterProcess(false);
        return;
      }
      if (!error) {
        toast({
          title: "Berhasil register!",
          description: "Cek email kamu untuk verifikasi akun. 😁",
        });
      }
      router.push("/");
    } else {
      setError("repeatPassword", {
        type: "manual",
        message: "Ulangi Passwordnya!",
      });
      return;
    }
  };
  return (
    <div className="justify-center items-center flex min-h-screen px-4">
      <Navbar />
      <Card
        className={`w-full md:w-1/2 ${
          registerProcess && "pointer-events-none"
        }`}
      >
        <form onSubmit={handleSubmit(submit)}>
          <CardHeader>
            <CardTitle className="text-center">Register</CardTitle>
          </CardHeader>
          <Separator className="mb-5" orientation="horizontal" />
          <CardContent className="flex flex-col justify-center items-center gap-5">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="email" className={errors.email && "text-red-600"}>
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
                className={errors.password && "text-red-600"}
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
                  pattern: {
                    value: /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
                    message:
                      "Password harus mengandung huruf, angka, dan simbol!",
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
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label
                htmlFor="repeatPassword"
                className={errors.repeatPassword && "text-red-600"}
              >
                Konfirmasi Password<span className="text-red-700">*</span>
              </Label>
              <Input
                type="password"
                id="repeatPassword"
                placeholder="Ulangi Password..."
                {...register("repeatPassword", {
                  required: {
                    value: true,
                    message: "Konfirmasi Password tidak boleh kosong!",
                  },
                })}
              />
              {errors.repeatPassword && (
                <p className="text-xs text-red-600">
                  {errors.repeatPassword?.message}
                </p>
              )}
            </div>
          </CardContent>
          <Separator className="mb-5" orientation="horizontal" />
          <CardFooter className="flex justify-between">
            <Button
              variant="default"
              type="submit"
              disabled={registerProcess ? true : false}
            >
              Register
            </Button>
            <Button variant="outline" asChild>
              <Link href="/login">Login</Link>
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default Page;
