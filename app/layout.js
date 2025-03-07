'use client'
import { Nunito } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import { Toaster } from "@/components/ui/sonner";
import { usePathname } from "next/navigation";
import { UpdateCartContext } from "./_context/UpdateCartContext";
import { useState } from "react";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "700"]
});


export default function RootLayout({ children }) {
  const params = usePathname();
  const showHeader = params == '/sign-in' || params == '/create-account' ? false : true;
  const [updateCart, setUpdateCart] = useState(false);

  return (
    <html lang="en">
      <body
        className={`${nunito.className} antialiased`}
      >
        <UpdateCartContext.Provider value={{updateCart, setUpdateCart}}>
          {showHeader && <Header /> }
          {children}
          <Toaster />
        </UpdateCartContext.Provider>
      </body>
    </html>
  );
}
