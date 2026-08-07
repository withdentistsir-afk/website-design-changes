import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">

          {/* Brand + logo */}
          <div className="lg:col-span-1">
            <div className="mb-5">
              <Image
                src="/images/clayberg-logo.png"
                alt="کلایبرگ"
                width={160}
                height={80}
                className="h-12 w-auto"
              />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
              Clayberg — تولید کننده لوازم آشپزخانه مدرن با کیفیت بالا و طراحی منحصر به فرد.
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com/clayberg_kitchen"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-gold hover:border-gold transition-colors"
                aria-label="اینستاگرام کلایبرگ"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a
                href="https://t.me/clayberg"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-gold hover:border-gold transition-colors"
                aria-label="تلگرام کلایبرگ"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-2.015 9.495c-.15.665-.543.827-1.1.513l-3.05-2.246-1.47 1.415c-.163.163-.3.3-.614.3l.22-3.106 5.665-5.116c.247-.22-.054-.341-.382-.121L6.868 14.44 3.86 13.51c-.66-.206-.673-.66.138-.977l10.896-4.201c.55-.2 1.03.134.668.916z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-gold hover:border-gold transition-colors"
                aria-label="لینکدین کلایبرگ"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-bold text-foreground mb-5">خدمات</h3>
            <ul className="space-y-3">
              {[
                { href: "/about", label: "نصب و راه‌اندازی" },
                { href: "/about", label: "خدمات پس از فروش" },
                { href: "/about", label: "گارانتی" },
                { href: "/about", label: "سوالات متداول" },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-bold text-foreground mb-5">لینک‌ها</h3>
            <ul className="space-y-3">
              {[
                { href: "/", label: "صفحه اصلی" },
                { href: "/products", label: "محصولات" },
                { href: "/about", label: "خدمات" },
                { href: "/about", label: "درباره ما" },
                { href: "/contact", label: "تماس با ما" },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold text-foreground mb-5">تماس با ما</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Phone size={14} className="text-gold shrink-0" />
                <a href="tel:02112345678" className="text-sm text-muted-foreground hover:text-foreground transition-colors" dir="ltr">
                  ۰۲۱-۱۲۳۴۵۶۷۸
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={14} className="text-gold shrink-0" />
                <a href="tel:02112345679" className="text-sm text-muted-foreground hover:text-foreground transition-colors" dir="ltr">
                  ۰۲۱-۱۲۳۴۵۶۷۹
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={14} className="text-gold shrink-0" />
                <a href="mailto:info@clayberg.com" className="text-sm text-muted-foreground hover:text-foreground transition-colors" dir="ltr">
                  info@clayberg.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={14} className="text-gold shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground leading-relaxed">
                  تهران، خیابان شریعتی، پلاک ۱۳۳
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider + bottom */}
        <div className="gold-line mb-7" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © ۱۴۰۳ کلایبرگ. تمامی حقوق محفوظ است.
          </p>
          <div className="flex gap-5">
            <Link href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              سیاست حریم خصوصی
            </Link>
            <Link href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              شرایط استفاده
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
