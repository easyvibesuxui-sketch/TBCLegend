import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import TiltProvider from "@/components/TiltProvider";
import HouseProvider from "@/components/HouseProvider";
import LedgerProvider from "@/components/LedgerProvider";
import ProgressTicks from "@/components/ui/ProgressTicks";
import TiltFrame from "@/components/ui/TiltFrame";
import Hero from "@/components/sections/Hero";
import Legend from "@/components/sections/Legend";
import Marathon from "@/components/sections/Marathon";
import Houses from "@/components/sections/Houses";
import Price from "@/components/sections/Price";
import Return from "@/components/sections/Return";
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
        <LedgerProvider>
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
              {/* The road: four trials the reader steers. See STORY-V2.md. */}
              <Marathon />
              {/* Beat 16: the four houses at their best. */}
              <TiltFrame>
                <Houses />
              </TiltFrame>
              {/* Beat 17: the same four, and what each one costs. */}
              <TiltFrame>
                <Price />
              </TiltFrame>
              {/* Beat 19: the altar again, and the size of the road walked. */}
              <TiltFrame>
                <Return />
              </TiltFrame>
              {/*
                Beats 18 and 20 share one plate. The story lists them apart,
                with the return between, but the standings and the closing
                question are the same red flood — splitting them to honour the
                numbering would cost the close its weight, so 19 sits in front
                of the pair instead of inside it.
              */}
              <TiltFrame>
                <CTA />
              </TiltFrame>
            </main>
            <TiltFrame>
              <Footer />
            </TiltFrame>
          </TiltProvider>
        </LedgerProvider>
      </HouseProvider>
    </SmoothScroll>
  );
}
