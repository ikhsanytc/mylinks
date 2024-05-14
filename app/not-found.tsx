import Navbar from "@/components/ui/Navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "MyLinks | Not Found Page",
};

function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-4">
      <Navbar />
      <Card className="w-full md:w-1/2">
        <CardHeader>
          <CardTitle className="text-center">Not Found 404</CardTitle>
        </CardHeader>
        <Separator orientation="horizontal" className="mb-5" />
        <CardContent className="text-center">
          <p className="mb-3">Halaman Yang Kamu Cari Tidak Di Temukan!</p>
          <CardDescription>
            Coba perhatikan urlnya, sudah benar atau belum.
          </CardDescription>
        </CardContent>
        <Separator orientation="horizontal" className="mb-5" />
        <CardFooter>
          <Button variant="default" asChild>
            <Link href="/">Kembali</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default NotFound;
