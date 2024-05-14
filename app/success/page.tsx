"use client";
import Navbar from "@/components/ui/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function Page() {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => router.push("/"), 1200);
  }, []);
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Navbar />
      <Card className="w-full md:w-1/2">
        <CardHeader>
          <CardTitle className="text-center">Sukses</CardTitle>
        </CardHeader>
        <Separator orientation="horizontal" className="mb-5" />
        <CardContent className="text-center">
          <p>Tunggu sebentar kamu akan di alihkan...</p>
        </CardContent>
      </Card>
    </div>
  );
}

export default Page;
