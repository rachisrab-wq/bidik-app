const steps = [
  {
    title: "Tentukan SMA impian",
    copy: "Pilih target utama dan sekolah cadangan.",
  },
  {
    title: "Lengkapi data akademik",
    copy: "Data yang valid menjadi dasar analisis.",
  },
  {
    title: "Pantau perjalanan",
    copy: "Lihat posisi, gap, dan langkah terbaik berikutnya.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="cara-kerja" className="bg-[#f7f7fb] py-20">
      <div className="mx-auto max-w-[980px] px-5">
        <div className="text-center">
          <p className="text-xs font-black uppercase tracking-[.2em] text-primary">
            Cara kerja
          </p>
          <h2 className="mt-4 text-3xl font-black tracking-[-.04em] sm:text-4xl">
            Dari target menjadi perjalanan terukur
          </h2>
        </div>
        <ol className="mt-12 grid gap-5 md:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.title} className="rounded-2xl bg-white p-6 shadow-card">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-sm font-black text-white">
                {index + 1}
              </span>
              <h3 className="mt-5 font-black">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{step.copy}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
