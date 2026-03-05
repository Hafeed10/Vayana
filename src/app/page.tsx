
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        {/* Navigation Bar */}
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-[#e7f4eb] dark:border-[#1a3020] px-6 md:px-20 lg:px-40 py-4 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md sticky top-0 z-50">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-background-dark">
              <span className="material-symbols-outlined text-2xl font-bold">
                auto_stories
              </span>
            </div>
            <h2 className="text-xl font-bold leading-tight tracking-tight dark:text-white">
              Vayana
            </h2>
          </div>
          <div className="hidden md:flex flex-1 justify-end gap-10 items-center">
            <nav className="flex items-center gap-8">
              <a
                className="text-sm font-medium hover:text-primary transition-colors"
                href="#"
              >
                Features
              </a>
              <a
                className="text-sm font-medium hover:text-primary transition-colors"
                href="#"
              >
                Pricing
              </a>
              <a
                className="text-sm font-medium hover:text-primary transition-colors"
                href="#"
              >
                About
              </a>
            </nav>
            <div className="flex gap-3">
              <Link
                href="/login"
                className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-10 px-5 bg-transparent border border-[#cee8d7] dark:border-[#2d4d38] text-sm font-bold hover:bg-[#e7f4eb] dark:hover:bg-[#1a3020] transition-all"
              >
                Log In
              </Link>
              <Link
                href="/register"
                className="flex min-w-[110px] cursor-pointer items-center justify-center rounded-lg h-10 px-5 bg-primary text-background-dark text-sm font-bold hover:shadow-lg hover:shadow-primary/20 transition-all"
              >
                Get Started
              </Link>
            </div>
          </div>
          {/* Mobile Menu Icon (Visual Only) */}
          <div className="md:hidden flex items-center">
            <span className="material-symbols-outlined">menu</span>
          </div>
        </header>

        <main className="flex flex-col flex-1">
          {/* Hero Section */}
          <section className="px-6 md:px-20 lg:px-40 py-16 md:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="flex flex-col gap-8 max-w-[600px]">
                <div className="flex flex-col gap-4">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wider uppercase">
                    <span className="material-symbols-outlined text-sm">
                      auto_awesome
                    </span>{" "}
                    Now with smart scanning
                  </span>
                  <h1 className="text-[#0d1c12] dark:text-white text-5xl md:text-6xl font-black leading-[1.1] tracking-tight">
                    Your Home Library,{" "}
                    <span className="text-primary">Digitally Mastered.</span>
                  </h1>
                  <p className="text-lg text-[#496651] dark:text-[#a3bba9] leading-relaxed">
                    Organize your collection, track your reading journey, and
                    never lose a lent book again with Vayana’s elegant library
                    management system.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/register"
                    className="flex h-14 items-center justify-center rounded-xl px-8 bg-primary text-background-dark text-base font-bold hover:scale-[1.02] transition-transform shadow-lg shadow-primary/20"
                  >
                    Get Started for Free
                  </Link>
                  <button className="flex h-14 items-center justify-center rounded-xl px-8 bg-[#e7f4eb] dark:bg-[#1a3020] text-[#0d1c12] dark:text-white text-base font-bold hover:bg-[#d5eddc] dark:hover:bg-[#25422d] transition-colors">
                    Watch Video
                  </button>
                </div>
                <div className="flex items-center gap-4 pt-4">
                  <div className="flex -space-x-3">
                    <div
                      className="size-10 rounded-full border-2 border-background-light dark:border-background-dark bg-slate-200 bg-cover bg-center"
                      style={{
                        backgroundImage:
                          "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCH5R6D4A6mp-bOoq4Eaww1rB1FQ5bd8L1Oj7sO6_REZWtqNVS0NnHGRISiOAHMGq8xXhBqrsfhnN-Yjb_BfWmcmHxao8esURasDRBiF5mB_OQ2gRU-evuvKUYp9YblMufZzJLeeD2E2z7ooTTKTP1j3jb0_2QXpt4fBDRKbsITsOiTg8OnCWsPf5Op9BuSWksOWw0VqQEzyrnhNuQcszkMd4_dy7w18KCOo1QXW0N8qIq2sjH5fPqZ4D_BWVI3vd-CpHK7nRiULdcB')",
                      }}
                    ></div>
                    <div
                      className="size-10 rounded-full border-2 border-background-light dark:border-background-dark bg-slate-300 bg-cover bg-center"
                      style={{
                        backgroundImage:
                          "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDZOiqNZKvx1AwZWxH2zkghyrCVwtgw6aMrms3yUGzB5hxUyV_Zn1BhW5XH3Zv5G4dUBzvAAgem6514GMnDw0Etzqel_Dh9Bd6CAMnSOLXkioVXcsdfsqDnaBWgIokm0cX4ajsaFb3C_9ee4grl0pBXh5fcxBrM2OXBzp9SbFyB0rVKvIZiTlDLEBMfPF65GNCYysdIKf6PcQ7wqQVAwgUQlsZGOYqzR5ntmjG4sj_vmepGir8c9miuCdKOiHF0dkqZBPZb2lk1709-')",
                      }}
                    ></div>
                    <div
                      className="size-10 rounded-full border-2 border-background-light dark:border-background-dark bg-slate-400 bg-cover bg-center"
                      style={{
                        backgroundImage:
                          "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBXOiCHcHSviNWE79Wd19XeIjSz06fpOJRNN5fMajSvc0Rvg1X26GXAzCtR2MS8b9lFWUmV9_OJX8nxw3KKQin2LWFSebYA61Ia8hx4oLKeegmhFm0BAbCDWIErBPs9Dgq6F2SzUzvJ7pvYnOqdXHNxRpiA0Wf0qeT6YjXl-oidAXRO7lHnmCL4kyDPFcK9NfaoZZKIXf2lu6ZIIE5Nuf60_dhtegCGUVs8AoFiaGDF6OxWQiI1YYBb_dE0ZDNqc3HI1mMfuQQ0rFrk')",
                      }}
                    ></div>
                  </div>
                  <p className="text-sm font-medium text-[#496651] dark:text-[#a3bba9]">
                    Join 10k+ book collectors worldwide
                  </p>
                </div>
              </div>
              {/* Hero Image / App Mockup */}
              <div className="relative group">
                <div className="absolute inset-0 bg-primary blur-[120px] opacity-10 dark:opacity-5 -z-10"></div>
                <div className="rounded-2xl border border-[#cee8d7] dark:border-[#2d4d38] bg-white dark:bg-[#1a2b1f] p-4 shadow-2xl overflow-hidden">
                  <div className="bg-[#f0f5f1] dark:bg-[#111f15] rounded-lg p-6 min-h-[400px]">
                    {/* Book Grid Simulation */}
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        "https://lh3.googleusercontent.com/aida-public/AB6AXuC-1LhaBwqwhgV5o4M-cyVSpV-w45oNLot8ZGYGPI5R7X3lcJ_vE-WqgHdH0iPJydsTwo9vE0X-Zvio6-MvyMhgPZbpmArENslCNQd64z3I87V9RcEsulqDHrRTGSnUMjPIXSvEEFDIYKEXxYVylIuUu7FcGqWp9IaZQSN_6HqcEVAW4lNYwfK5sUV-AOyI_qdXgEdJH9_oQT-Ay9QJgFSl6Uv6uoWogfzwz6sYaGnwSU4SerEPNblxAdBK1ehNmkkNnes_A5-jZ9zo",
                        "https://lh3.googleusercontent.com/aida-public/AB6AXuC31G6k0eBPmbaCaZ1sKfRPBMgdWY29D-Pn7quKsrlI_q9FSNJT6eqikUpHc3XEQowvDpcvGVxE-ozmEnRZHm8RgrLxGSBO5xi0QZcqkHNmZ-LLVS07or1UTetG-jbR6WIdBpkH8RrOAKdxL538R-ArgH4MTiTVpdWSe8damZZnq9xzA3K_BqCkSWrV4Y3K4NsMWVyK-F9x_OXFIjbbVdOQ2I4nxbXsdmSAF6PJZSw7aTVMV8XJ96RNDNahCrhdptOBEYd7F_12MUN1",
                        "https://lh3.googleusercontent.com/aida-public/AB6AXuA-Yb60AXTQkBjk8qriyLmBOi_1J2ktZDOQSq8K7fdJSQzSjH3U11A0B39I99SJBZ59bSNvgN4xEv-XrqcX1vjz5V45i2ZQd888AqZrtL7Ye1QhGlJCjqIeQ21VvPeOzpVoipR7jsQ98oR5JPDQlc3d1K20CKPpDpoOqjdX8shtD9b3Cd2lUtJ6ysIE3Whg86bZYVv0WBZlxUzgerWeHd3eW8_B_wC4r9VjVBiuzPjDQ1ioouUBWuTki4iVnZmuq_foytHwFtG0HAkV",
                        "https://lh3.googleusercontent.com/aida-public/AB6AXuCk20csvybD3ZDu3BYeozYoQLkNwrHA9-2V2vIN7N9g02zq8b_iXHpXeKs8xaH_FrL6mCWV-z2PL_UNO2mdgl8wPvgTvGZuH2B7ynuJ7K-0SikrlGMOFZ8LiZSoFUw2r8jNEdvcLktGXMCravH_4y2GPyBHWreuicU5JkbO6VhmmlUJipohEMPXKtX5UeAtnrda03jpP4sByuYpROlTj2eS5HKxXZuK7-HsTLDoPa8z7KvCehogzH7apgvHFy1EQiJPP-2TnHS8hat_",
                        "https://lh3.googleusercontent.com/aida-public/AB6AXuBXXraf56LOzbi16cgFguDH82tn-NtVpsNWoOlLUkM_b8ewg4bAHBk3q6ifwdAb0gNGBAhHQCKhFBcnfUUxjdfqhsZNeoQs2pVRvb9nMk_OeQcIupJsdTaDLPCauRfe6YmKIBiLbTm3XT_iEG3NYSW_pvBhAm1VF8Ox-nWpurleEvoV5Dviq9PGTqyqTzH7PMl6DZgkdWYRw5ybX91NIXuj4DZB8WZkc6--30SwDyR1OLGQjALMg1gxNnb5ma0pscVkJjkC1AheNayF",
                        "https://lh3.googleusercontent.com/aida-public/AB6AXuDGv6SnNx7HR_s1FOOxCXSdJj9zNaYwWZkrbWibxqWKEKdpiSkv2f3yt-uzA-wyE696Kkt3vl-L9VHAG99nb11Yd3lflbqqLDiljwDsYmiO-aUf8blC0rT8_eVop96oU-sUpRWO9ef7WwKNjlf-D37VUle0MigBpw2qq-oyMr46E_JyxFgrzRjbILk_JKHFuG0Eoie0fAHL6ZUBWPaxrAjThR9iFtVyNyC5ivAhTT7Go4DVtG3d8JaMkhuS9PbG0aMF9gzYW7_MsHjd",
                      ].map((url, i) => (
                        <div
                          key={i}
                          className="aspect-[2/3] rounded-md bg-[#e0eadd] dark:bg-[#1d3023] flex items-center justify-center border border-black/5 bg-cover bg-center"
                          style={{ backgroundImage: `url('${url}')` }}
                        ></div>
                      ))}
                    </div>
                    {/* Sidebar overlay mock */}
                    <div className="mt-8 pt-6 border-t border-black/5 dark:border-white/5">
                      <div className="h-4 w-1/3 bg-primary/20 rounded-full mb-3"></div>
                      <div className="h-3 w-1/2 bg-[#dfe8df] dark:bg-[#2d4d38] rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="px-6 md:px-20 lg:px-40 py-20 bg-[#f1f6f2] dark:bg-[#0e1b12]">
            <div className="flex flex-col gap-16">
              <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                <div className="flex flex-col gap-4 max-w-[600px]">
                  <h2 className="text-[#0d1c12] dark:text-white text-3xl md:text-4xl font-bold leading-tight">
                    Designed for the Modern Collector
                  </h2>
                  <p className="text-[#496651] dark:text-[#a3bba9] text-base">
                    Experience the perfect blend of traditional library charm and
                    digital efficiency with features that prioritize your reading
                    habit.
                  </p>
                </div>
                <a
                  className="text-primary font-bold flex items-center gap-2 hover:gap-3 transition-all"
                  href="#"
                >
                  View all features{" "}
                  <span className="material-symbols-outlined">arrow_forward</span>
                </a>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Feature 1 */}
                <div className="flex flex-col gap-6 rounded-2xl border border-[#cee8d7] dark:border-[#2d4d38] bg-background-light dark:bg-background-dark p-8 hover:shadow-xl hover:shadow-primary/5 transition-shadow group">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#e7f4eb] dark:bg-[#1a3020] text-primary group-hover:bg-primary group-hover:text-background-dark transition-colors">
                    <span className="material-symbols-outlined text-3xl">
                      auto_awesome_motion
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-[#0d1c12] dark:text-white text-xl font-bold leading-tight">
                      Digital Paper Aesthetic
                    </h3>
                    <p className="text-[#496651] dark:text-[#a3bba9] text-sm leading-relaxed">
                      A UI designed for book lovers, focusing on clarity, calm,
                      and a tactile feel. Reduced blue light themes for night
                      reading.
                    </p>
                  </div>
                </div>
                {/* Feature 2 */}
                <div className="flex flex-col gap-6 rounded-2xl border border-[#cee8d7] dark:border-[#2d4d38] bg-background-light dark:bg-background-dark p-8 hover:shadow-xl hover:shadow-primary/5 transition-shadow group">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#e7f4eb] dark:bg-[#1a3020] text-primary group-hover:bg-primary group-hover:text-background-dark transition-colors">
                    <span className="material-symbols-outlined text-3xl">
                      handshake
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-[#0d1c12] dark:text-white text-xl font-bold leading-tight">
                      Seamless Lending
                    </h3>
                    <p className="text-[#496651] dark:text-[#a3bba9] text-sm leading-relaxed">
                      Know exactly where your books are with our integrated lending
                      tracker, automatic reminders, and borrower history.
                    </p>
                  </div>
                </div>
                {/* Feature 3 */}
                <div className="flex flex-col gap-6 rounded-2xl border border-[#cee8d7] dark:border-[#2d4d38] bg-background-light dark:bg-background-dark p-8 hover:shadow-xl hover:shadow-primary/5 transition-shadow group">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#e7f4eb] dark:bg-[#1a3020] text-primary group-hover:bg-primary group-hover:text-background-dark transition-colors">
                    <span className="material-symbols-outlined text-3xl">
                      query_stats
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-[#0d1c12] dark:text-white text-xl font-bold leading-tight">
                      Reading Insights
                    </h3>
                    <p className="text-[#496651] dark:text-[#a3bba9] text-sm leading-relaxed">
                      Track your progress through every chapter with beautiful
                      visual indicators, yearly stats, and reading habits
                      analysis.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Final CTA Section */}
          <section className="px-6 md:px-20 lg:px-40 py-24">
            <div className="relative overflow-hidden rounded-3xl bg-background-dark dark:bg-black p-12 md:p-20 text-center">
              {/* Abstract Background Decorations */}
              <div className="absolute -top-24 -left-24 size-64 bg-primary/20 rounded-full blur-[100px]"></div>
              <div className="absolute -bottom-24 -right-24 size-64 bg-primary/20 rounded-full blur-[100px]"></div>
              <div className="relative z-10 flex flex-col items-center gap-8 max-w-[800px] mx-auto">
                <h2 className="text-white text-4xl md:text-5xl font-black leading-tight tracking-tight">
                  Ready to organize your shelves?
                </h2>
                <p className="text-[#a3bba9] text-lg max-w-[600px]">
                  Join thousands of book lovers managing their collections with
                  Vayana. Start building your digital catalog today.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                  <Link
                    href="/register"
                    className="flex h-14 min-w-[200px] items-center justify-center rounded-xl px-10 bg-primary text-background-dark text-lg font-bold hover:scale-105 transition-transform"
                  >
                    Get Started for Free
                  </Link>
                  <button className="flex h-14 min-w-[200px] items-center justify-center rounded-xl px-10 bg-white/10 text-white text-lg font-bold hover:bg-white/20 transition-colors border border-white/20 backdrop-blur-sm">
                    Contact Sales
                  </button>
                </div>
                <p className="text-white/40 text-xs font-medium uppercase tracking-widest mt-4">
                  No credit card required • Unlimited books for 30 days
                </p>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="px-6 md:px-20 lg:px-40 py-12 border-t border-[#e7f4eb] dark:border-[#1a3020]">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-10">
            <div className="col-span-2 flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-background-dark">
                  <span className="material-symbols-outlined text-lg font-bold">
                    auto_stories
                  </span>
                </div>
                <h2 className="text-lg font-bold dark:text-white">Vayana</h2>
              </div>
              <p className="text-[#496651] dark:text-[#a3bba9] text-sm max-w-[240px]">
                Curating the world's most beautiful digital home library
                experience for book lovers.
              </p>
              <div className="flex gap-4">
                <a
                  className="text-[#496651] dark:text-[#a3bba9] hover:text-primary"
                  href="#"
                >
                  <span className="material-symbols-outlined">public</span>
                </a>
                <a
                  className="text-[#496651] dark:text-[#a3bba9] hover:text-primary"
                  href="#"
                >
                  <span className="material-symbols-outlined">share</span>
                </a>
                <a
                  className="text-[#496651] dark:text-[#a3bba9] hover:text-primary"
                  href="#"
                >
                  <span className="material-symbols-outlined">mail</span>
                </a>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="font-bold text-sm dark:text-white">Product</h4>
              <a
                className="text-sm text-[#496651] dark:text-[#a3bba9] hover:text-primary"
                href="#"
              >
                Features
              </a>
              <a
                className="text-sm text-[#496651] dark:text-[#a3bba9] hover:text-primary"
                href="#"
              >
                Mobile App
              </a>
              <a
                className="text-sm text-[#496651] dark:text-[#a3bba9] hover:text-primary"
                href="#"
              >
                Extension
              </a>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="font-bold text-sm dark:text-white">Company</h4>
              <a
                className="text-sm text-[#496651] dark:text-[#a3bba9] hover:text-primary"
                href="#"
              >
                About Us
              </a>
              <a
                className="text-sm text-[#496651] dark:text-[#a3bba9] hover:text-primary"
                href="#"
              >
                Careers
              </a>
              <a
                className="text-sm text-[#496651] dark:text-[#a3bba9] hover:text-primary"
                href="#"
              >
                Blog
              </a>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="font-bold text-sm dark:text-white">Legal</h4>
              <a
                className="text-sm text-[#496651] dark:text-[#a3bba9] hover:text-primary"
                href="#"
              >
                Privacy
              </a>
              <a
                className="text-sm text-[#496651] dark:text-[#a3bba9] hover:text-primary"
                href="#"
              >
                Terms
              </a>
              <a
                className="text-sm text-[#496651] dark:text-[#a3bba9] hover:text-primary"
                href="#"
              >
                Cookie Policy
              </a>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="font-bold text-sm dark:text-white">Support</h4>
              <a
                className="text-sm text-[#496651] dark:text-[#a3bba9] hover:text-primary"
                href="#"
              >
                Help Center
              </a>
              <a
                className="text-sm text-[#496651] dark:text-[#a3bba9] hover:text-primary"
                href="#"
              >
                Community
              </a>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-[#e7f4eb] dark:border-[#1a3020] flex flex-col md:flex-row justify-between gap-4">
            <p className="text-xs text-[#496651] dark:text-[#a3bba9]">
              © 2024 Vayana Library. All rights reserved.
            </p>
            <div className="flex gap-6">
              <button className="flex items-center gap-2 text-xs font-bold text-[#496651] dark:text-[#a3bba9] hover:text-primary">
                <span className="material-symbols-outlined text-sm">
                  language
                </span>{" "}
                English (US)
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
