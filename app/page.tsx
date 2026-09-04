import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import TiltProvider from "@/components/TiltProvider";
import ProgressTicks from "@/components/ui/ProgressTicks";
import TiltFrame from "@/components/ui/TiltFrame";
import Hero from "@/components/sections/Hero";
import Legend from "@/components/sections/Legend";
import Houses from "@/components/sections/Houses";
import CTA from "@/components/sections/CTA";

export default function Page() {
  return (
    <SmoothScroll>
      {/*
        Chrome stays outside the tilt on purpose: a transformed ancestor
        becomes the containing block for position:fixed, which would unpin the
        nav and the progress ticks from the viewport.
      */}
      <TiltProvider>
        <Nav />
        <ProgressTicks />
        <main className="relative">
          {/* Hero tilts from inside its own sticky stage — see Hero.tsx */}
          <Hero />
          <TiltFrame>
            <Legend />
          </TiltFrame>
          <TiltFrame>
            <Houses />
          </TiltFrame>
          <TiltFrame>
            <CTA />
          </TiltFrame>
        </main>
        <TiltFrame>
          <Footer />
        </TiltFrame>
      </TiltProvider>
    </SmoothScroll>
  );
}
