import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getDisplayName } from "@/data/site";
import { socials } from "@/data/socials";

const footerLinks = [
  { href: "/#experience", label: "Experience" },
  { href: "/#projects", label: "Projects" },
  { href: "/#writing", label: "Writing" },
  { href: "/#resume", label: "Resume" },
] as const;

export async function Footer() {
  const locale = (await getLocale()) as "en" | "es";
  const visibleSocials = socials.filter(
    (social) => social.visible && social.href,
  );

  return (
    <footer className="-mt-10 bg-transparent pt-10">
      <div className="overflow-hidden rounded-b-[1.4rem] bg-slate-900/95 text-white shadow-2xl shadow-slate-950/20 ring-1 ring-white/10">
        <div className="site-container grid min-h-[24rem] gap-10 py-10 sm:py-12 lg:grid-cols-[1fr_auto] lg:py-14">
          <nav className="flex flex-col gap-8" aria-label="Footer">
            {footerLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="w-fit text-4xl font-semibold tracking-tight text-white transition-colors hover:text-[#9eb8ae] sm:text-5xl"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex gap-4 lg:justify-end">
            {visibleSocials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.label === "Email" ? undefined : "_blank"}
                rel={social.label === "Email" ? undefined : "noreferrer"}
                aria-label={social.label}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-200 transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/10 hover:text-white"
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        <div className="site-container flex flex-col gap-4 border-t border-white/10 py-6 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {getDisplayName(locale)}
          </p>
        </div>
      </div>
    </footer>
  );
}
