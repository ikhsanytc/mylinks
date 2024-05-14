"use client";
import Navbar from "@/components/ui/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import generateToken from "@/lib/generateToken";
import newUrlSingkat from "@/lib/newUrlSingkat";
import { supabase } from "@/lib/supabase";
import { TautanT } from "@/types/all-types";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";

function Page() {
  const [input, setInput] = useState<string>();
  const inputRef = useRef<HTMLInputElement>(null);
  const [user, setUser] = useState<User>();
  const [tautans, setTautans] = useState<TautanT[]>([]);
  const { toast } = useToast();
  const router = useRouter();
  useEffect(() => {
    supabase.auth.getUser().then(async (user) => {
      if (!user.data.user) {
        toast({
          title: "Tidak bisa memasuki halaman.",
          description:
            "Kamu belum login, pergi ke halaman login untuk masuk ke halaman dashboard.",
        });
        router.push("/");
      } else {
        setUser(user.data.user);
        const { data } = await supabase
          .from("tautan")
          .select()
          .eq("email_user", user.data.user.email);
        if (data) setTautans(data);
      }
    });
  }, []);
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if ((input && input.includes("http://")) || input?.includes("https://")) {
      const url_singkat = `/${generateToken(5)}`;
      // alert("http://localhost:3000/" + generateToken(5));
      if (user) {
        const createUrl = await newUrlSingkat(url_singkat, input, user);
        if (createUrl?.error) {
          toast({
            title: createUrl.errorMessage,
            variant: "destructive",
          });
          return;
        }
        if (inputRef.current) {
          inputRef.current.value = "";
        }
        const newState: TautanT[] = [
          {
            click: 0,
            created_at: new Date(),
            email_user: user.email,
            url_base: input,
            url_singkat,
          },
        ];
        setTautans((prev) => [...prev, ...newState]);
        toast({
          title: "Berhasil membuat tautan singkat!",
          action: (
            <ToastAction
              onClick={() =>
                navigator.clipboard.writeText(
                  process.env.NEXT_PUBLIC_BASE_URL + url_singkat
                )
              }
              altText="Copy url singkat"
            >
              Copy
            </ToastAction>
          ),
        });
      }
    } else {
      alert("Masukan Url Yang Benar!");
    }
  };
  function copyUrl(url: string): void {
    navigator.clipboard.writeText(url);
    toast({
      title: "Berhasil copy url!",
    });
  }
  return (
    <>
      <Navbar />
      <section className="mt-28 px-4">
        <form
          onSubmit={submit}
          className="flex w-full max-w-sm items-center space-x-2 mx-auto"
        >
          <Input
            type="text"
            placeholder="Masukan Url Disini..."
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setInput(e.target.value)
            }
            ref={inputRef}
          />
          <Button type="submit">Singkat</Button>
        </form>
        <div className="mt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tautans?.map((tautan, idx) => (
              <Card className="w-full" key={idx}>
                <CardContent className="pb-5 pt-5">
                  <h1 className="font-bold mb-3">Tautan {++idx}</h1>
                  <Link
                    href={`${process.env.NEXT_PUBLIC_BASE_URL}${tautan.url_singkat}`}
                    className="font-semibold hover:underline"
                    target="_blank"
                  >
                    {process.env.NEXT_PUBLIC_BASE_URL + tautan.url_singkat}
                  </Link>
                  <div className="mb-3"></div>
                  <Button
                    variant="default"
                    onClick={() =>
                      copyUrl(
                        process.env.NEXT_PUBLIC_BASE_URL + tautan.url_singkat
                      )
                    }
                  >
                    Copy url
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <div className="pb-20"></div>
    </>
  );
}

export default Page;
