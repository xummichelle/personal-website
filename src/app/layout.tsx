import type { Metadata } from "next";
import { DM_Sans, Fraunces, Schoolbell } from "next/font/google";
import { Suspense } from "react";
import { NavBar } from "@/components/NavBar";
import { SvgDefs } from "@/components/SvgDefs";
import { PetProvider } from "@/pet/PetProvider";
import "./globals.css";

// Soft serif headings (Plume), clean sans body, handwritten captions (Woset).
const fraunces = Fraunces({ variable: "--font-fraunces", subsets: ["latin"], axes: ["SOFT", "opsz"] });
const dmSans = DM_Sans({ variable: "--font-dm-sans", subsets: ["latin"] });
const hand = Schoolbell({ variable: "--font-hand", weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "Michelle Xu", template: "%s · Michelle Xu" },
  description: "Michelle Xu: programmer, game developer and artist. Portfolio of tech and creative projects.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${fraunces.variable} ${dmSans.variable} ${hand.variable} antialiased`}>
      <body className="flex min-h-screen flex-col">
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
