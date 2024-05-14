"use client";

import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import { TautanT } from "@/types/all-types";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function Page({ params }: { params: { url_singkat: string } }) {
  const { toast } = useToast();
  const router = useRouter();
  const request = async () => {
    const res: PostgrestSingleResponse<TautanT> = await supabase
      .from("tautan")
      .select()
      .eq("url_singkat", `/${params.url_singkat}`)
      .single();
    return res.data;
  };
  useEffect(() => {
    request().then((data) => {
      setTimeout(() => {
        if (data) {
          router.push(data.url_base);
        } else {
          toast({
            title: "Url tidak di temukan!",
            description:
              "Url yang anda masukan tidak terdaftar di aplikasi MyLinks.",
          });
        }
      }, 300);
    });
  }, []);
  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-4">
      <div className="loader mb-3"></div>
      <h1 className="text-2xl font-bold">Loading...</h1>
    </div>
  );
}

export default Page;
