"use client";
import Navbar from "@/components/ui/Navbar";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import {
  ThumbsUp,
  Link as LinkIcon,
  ShieldCheck,
  Zap,
  Clock4,
  DatabaseZap,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

function Page() {
  const [user, setUser] = useState<User>();
  useEffect(() => {
    supabase.auth.getUser().then((data) => {
      const user = data.data.user;
      if (user) {
        setUser(user);
      }
    });
  }, []);
  return (
    <>
      <Navbar />
      <section className="mt-40 px-4 lg:px-48 flex justify-center flex-col items-center">
        <h1 className="text-3xl md:text-4xl font-semibold text-center underline underline-offset-4">
          MyLinks.
        </h1>
        <p className="text-center mt-5 text-2xl dark:text-gray-400">
          Mempersingkat url dengan website ini!
        </p>
        <div className="mt-5"></div>
        <Button size="lg" asChild>
          <Link href={user ? "/dashboard" : "/login"}>Mulai</Link>
        </Button>
        <div className="mt-5"></div>
        <p className="text-center font-medium text-xl">
          MyLinks adalah tool sederhana yang dibuat untuk mempersingkat sebuah
          url atau tautan agar dibaca mudah dan di ingat juga mudah. MyLinks
          gratis di gunakan oleh pengguna dengan mempersingkat url atau tautan{" "}
          <Link
            href="https://www.youtube.com/"
            className="font-bold hover:underline"
            target="_blank"
          >
            Youtube
          </Link>
          ,{" "}
          <Link
            href="https://www.instagram.com/"
            className="font-bold hover:underline"
            target="_blank"
          >
            Instagram
          </Link>
          ,{" "}
          <Link
            href="https://www.facebook.com/"
            className="font-bold hover:underline"
            target="_blank"
          >
            Facebook
          </Link>
          ,{" "}
          <Link
            href="https://twitter.com"
            className="font-bold hover:underline"
            target="_blank"
          >
            Twitter/X
          </Link>
          ,{" "}
          <Link
            href="https://www.tiktok.com"
            className="font-bold hover:underline"
            target="_blank"
          >
            Tiktok
          </Link>
          , Blog dan Situs. Klik mulai di atas untuk menggunakan tool ini!
        </p>
        <div className="mt-20 grid grid-cols-2 md:grid-cols-3 gap-5 justify-center">
          <div className="bg-black dark:bg-gray-500 w-full p-3 dark:bg-opacity-50 text-white rounded-3xl flex flex-col gap-4 items-center justify-center border border-gray-200">
            <ThumbsUp size={34} />
            <p className="text-xl font-semibold text-center">Mudah</p>
            <p className="text-center">
              Singkat, Jelas, Dan Mudah Di Mengerti Oleh Banyak User.
            </p>
            <div className="mb-3"></div>
          </div>
          <div className="bg-black dark:bg-gray-500 w-full p-3 dark:bg-opacity-50 text-white rounded-3xl flex flex-col gap-4 items-center justify-center border border-gray-200">
            <LinkIcon size={34} />
            <p className="text-xl font-semibold text-center">
              Tautan Menjadi Singkat
            </p>
            <p className="text-center">
              Dengan menggunakan tool ini url atau tautan anda menjadi singkat.
            </p>
            <div className="mb-3"></div>
          </div>
          <div className="bg-black dark:bg-gray-500 w-full p-3 dark:bg-opacity-50 text-white rounded-3xl flex flex-col gap-4 items-center justify-center border border-gray-200">
            <ShieldCheck size={34} />
            <p className="text-xl font-semibold text-center">Aman</p>
            <p className="text-center">
              Tool ini menggunakan protokol dan enkripsi yang aman untuk anda
              gunakan.
            </p>
            <div className="mb-3"></div>
          </div>
          <div className="bg-black dark:bg-gray-500 w-full p-3 dark:bg-opacity-50 text-white rounded-3xl flex flex-col gap-4 items-center justify-center border border-gray-200">
            <Zap size={34} />
            <p className="text-xl font-semibold text-center">Cepat</p>
            <p className="text-center">
              Setelah menggunakan ini url atau tautan akan mudah di ingat.
            </p>
            <div className="mb-3"></div>
          </div>
          <div className="bg-black dark:bg-gray-500 w-full p-3 dark:bg-opacity-50 text-white rounded-3xl flex flex-col gap-4 items-center justify-center border border-gray-200">
            <Clock4 size={34} />
            <p className="text-xl font-semibold text-center">Always On</p>
            <p className="text-center">
              Tool atau web ini akan on/aktif selalu mungkin.
            </p>
            <div className="mb-3"></div>
          </div>
          <div className="bg-black dark:bg-gray-500 w-full p-3 dark:bg-opacity-50 text-white rounded-3xl flex flex-col gap-4 items-center justify-center border border-gray-200">
            <DatabaseZap size={34} />
            <p className="text-xl font-semibold text-center">Database Cepat</p>
            <p className="text-center">
              Tool atau web ini menggunakan teknologi database fast (cepat)
            </p>
            <div className="mb-3"></div>
          </div>
        </div>
      </section>
      <div className="mb-20"></div>
    </>
  );
}

export default Page;
