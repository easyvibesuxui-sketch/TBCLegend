import Medallion from "@/components/ui/Medallion";

export default function Footer() {
  return (
    <footer className="grain-paper grain-flood relative bg-ink px-6 py-14 text-paper sm:px-10 sm:py-20">
      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-12 sm:grid-cols-2">
        <div className="flex items-center gap-3">
          <Medallion className="h-14 w-14 shrink-0" />
          <span className="font-display text-xl leading-[0.95] sm:text-2xl">
            საგანძურის
            <br />
            მარათონი
          </span>
        </div>

        <div className="flex flex-col gap-3 sm:items-end sm:text-right">
          <span className="label text-paper/90">TBC</span>
          <a
            href="#quiz"
            className="font-body text-sm text-paper/60 underline-offset-4 transition-colors hover:text-paper hover:underline"
          >
            გაიარე ფინანსური ქვიზი
          </a>
          <p className="mt-6 font-body text-[11px] text-paper/35">
            © {new Date().getFullYear()} · ლეგენდა გრძელდება
          </p>
        </div>
      </div>
    </footer>
  );
}
