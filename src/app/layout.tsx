import type { Metadata } from "next";
import { Nunito, Schoolbell } from "next/font/google";
import { Suspense } from "react";
import { NavBar } from "@/components/NavBar";
import { SvgDefs } from "@/components/SvgDefs";
import { PetProvider } from "@/pet/PetProvider";
import "./globals.css";

// Nunito for everything, plus a handwritten font for captions (Woset).
const nunito = Nunito({ variable: "--font-nunito", subsets: ["latin"] });
const hand = Schoolbell({ variable: "--font-hand", weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "Michelle Xu", template: "%s · Michelle Xu" },
  description: "Michelle Xu: programmer, game developer and artist. Portfolio of tech and creative projects.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${nunito.variable} ${hand.variable} antialiased`}>
      <body className="relative flex min-h-screen flex-col">
        <SvgDefs />
        <PetProvider>
          {children}
          <Suspense>
            <NavBar />
          </Suspense>
        </PetProvider>
      </body>
    </html>
  );
}
