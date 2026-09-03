import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import ProgressTicks from "@/components/ui/ProgressTicks";
import Hero from "@/components/sections/Hero";
import Legend from "@/components/sections/Legend";
import Houses from "@/components/sections/Houses";
import CTA from "@/components/sections/CTA";

export default function Page() {
  return (
    <SmoothScroll>
      <Nav />
      <ProgressTicks />
      <main className="relative">
        <Hero />
        <Legend />
        <Houses />
        <CTA />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
