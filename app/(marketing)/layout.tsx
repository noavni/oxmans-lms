import { SessionProvider } from "next-auth/react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <Nav />
      <main>{children}</main>
      <Footer />
    </SessionProvider>
  );
}
