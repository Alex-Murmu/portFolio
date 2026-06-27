import { ThemeProvider } from "@/components/theme/theme-provider"
import { Inter } from "next/font/google";
import "./globals.css";
import { ViewTransitions } from "next-view-transitions";
import { cn } from "@/lib/utils";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { Quote } from "@/components/common/Quote";
import BackToTop from "@/components/common/BackToTop";
import { TooltipProvider } from "@/components/ui/tooltip";
import ReactLenis from "lenis/react";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en" className={cn("font-sans", inter.variable)} suppressHydrationWarning>
        <body className="min-h-full flex flex-col font-hanken-grotesk antialiased">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ReactLenis root>
              <TooltipProvider>
                <Navbar />
                {children}
                <Quote />
                <Footer />
                <BackToTop />
              </TooltipProvider>
            </ReactLenis>
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
