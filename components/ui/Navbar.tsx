"use client";
import Link from "next/link";
import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { Menu, Moon, Sun } from "lucide-react";
import { LinksNavbar } from "@/types/all-types";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet";
import { Separator } from "./separator";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

function Navbar() {
  const { setTheme } = useTheme();
  const router = useRouter();
  const [login, setLogin] = useState<boolean>();
  useEffect(() => {
    supabase.auth.getUser().then((user) => {
      if (user.data.user) {
        setLogin(true);
      } else {
        setLogin(false);
      }
    });
  }, []);
  const links: LinksNavbar[] = [
    {
      display: "Home",
      link: "/",
    },
  ];
  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };
  return (
    <>
      <nav className="fixed w-full top-0 bg-opacity-75 backdrop-filter backdrop-blur-xl bg-white z-40 shadow dark:bg-gray-950 dark:text-white">
        <div className="flex justify-between px-4 h-14 items-center">
          <h1 className="text-2xl font-bold">MyLinks</h1>
          {/* Menu Phone */}
          <Sheet>
            <SheetTrigger asChild>
              <Menu className="block lg:hidden cursor-pointer" />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>MyLinks</SheetTitle>
              </SheetHeader>
              <Separator orientation="horizontal" className="mt-5 mb-5" />
              <div className="flex flex-col gap-4">
                {links.map((link, idx) => (
                  <Button
                    asChild
                    variant="outline"
                    key={idx}
                    className="w-full"
                  >
                    <Link href={link.link}>{link.display}</Link>
                  </Button>
                ))}
                {login && (
                  <>
                    <Button variant="outline" asChild className="w-full">
                      <Link href="/dashboard">Dashboard</Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={logout}
                    >
                      Logout
                    </Button>
                  </>
                )}
                {!login && (
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/login">Login</Link>
                  </Button>
                )}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full">
                      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                      <span className="sr-only">Toggle theme</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-56 mt-4 mr-3 dark:bg-gray-950 dark:text-white"
                  >
                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                      Dark
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("light")}>
                      Light
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("system")}>
                      System
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </SheetContent>
          </Sheet>
          {/* End Menu Phone */}
          {/* Menu Tablet, Laptop, Desktop */}
          <div className="hidden lg:flex gap-10 items-center">
            {links.map((link, idx) => (
              <Link
                key={idx}
                href={link.link}
                className="hover:border-b-2 hover:border-gray-400"
              >
                {link.display}
              </Link>
            ))}
            {login && (
              <>
                <Link
                  className="cursor-pointer hover:border-b-2 hover:border-gray-400"
                  href="/dashboard"
                >
                  Dashboard
                </Link>
                <a
                  className="cursor-pointer hover:border-b-2 hover:border-gray-400"
                  onClick={logout}
                >
                  Logout
                </a>
              </>
            )}
            {!login && (
              <Link
                href="/login"
                className="hover:border-b-2 hover:border-gray-400"
              >
                Login
              </Link>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 mt-4 mr-3 dark:bg-gray-950 dark:text-white"
              >
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {/* End Menu Tablet, Laptop, Desktop */}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
