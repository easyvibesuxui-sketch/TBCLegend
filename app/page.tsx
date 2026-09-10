import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import TiltProvider from "@/components/TiltProvider";
import HouseProvider from "@/components/HouseProvider";
import ProgressTicks from "@/components/ui/ProgressTicks";
import TiltFrame from "@/components/ui/TiltFrame";
import Hero from "@/components/sections/Hero";
import Legend from "@/components/sections/Legend";
import Houses from "@/components/sections/Houses";
import Choose from "@/components/sections/Choose";
import CTA from "@/components/sections/CTA";

export default function Page() {
  return (
    <SmoothScroll>
      {/*
        Chrome stays outside the tilt on purpose: a transformed ancestor
        becomes the containing block for position:fixed, which would unpin the
        nav and the progress ticks from the viewport.
      */}
      <HouseProvider>
        <TiltProvider>
          <Nav />
          <ProgressTicks />
          <main className="relative">
            {/* Hero tilts from inside its own sticky stage — see Hero.tsx */}
            <Hero />
            {/*
              Beat 01. The story is explicit that this comes before the reader
              learns anything — "the choice happens in the first second" — so
              that it is instinct rather than calculation, which is exactly
              what the quiz at the end goes on to test. Everything below is
              addressed to someone who has already chosen.
            */}
            <TiltFrame>
              <Choose />
            </TiltFrame>
            {/*
              Legend tilts from inside: its takeover uses a sticky stage, and a
              transform out here would become that stage's containing block and
              stop it sticking. Same reason Hero is not wrapped either.
            */}
            <Legend />
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
      </HouseProvider>
    </SmoothScroll>
  );
}
