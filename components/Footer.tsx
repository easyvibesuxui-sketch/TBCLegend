export default function Footer() {
  return (
    <footer className="relative border-t border-gold-300/10 bg-abyss-950 px-6 py-12 lg:px-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-6 sm:flex-row">
        <p className="font-display text-sm tracking-wide text-gold-100/70">
          საგანძურის მარათონი
        </p>
        <p className="font-body text-[10px] uppercase tracking-[0.22em] text-gold-100/30">
          © {new Date().getFullYear()} · ლეგენდა გრძელდება
        </p>
      </div>
    </footer>
  );
}
