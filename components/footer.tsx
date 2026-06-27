import Link from "next/link"
import { Phone, Mail, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-0">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <span className="text-xl font-black tracking-widest text-foreground block">CLAYBERG</span>
              <span className="text-xs tracking-[0.4em] text-gold font-medium">کلایبرگ</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              پیشرو در نوآوری و کیفیت لوازم خانگی. بهانه‌ای برای آشپزی.
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com/clayberg.ir"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-gold hover:border-gold transition-colors"
                aria-label="اینستاگرام کلایبرگ"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-5 tracking-wide">محصولات</h3>
            <ul className="space-y-3">
              {[
                { href: "/products?cat=hood", label: "هود آشپزخانه" },
                { href: "/products?cat=hob", label: "اجاق گاز" },
                { href: "/products?cat=sink", label: "سینک آشپزخانه" },
                { href: "/products?cat=oven", label: "فر توکار" },
                { href: "/products?cat=microwave", label: "ماکروویو" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-5 tracking-wide">شرکت</h3>
            <ul className="space-y-3">
              {[
                { href: "/about", label: "درباره ما" },
                { href: "/gallery", label: "گالری" },
                { href: "/contact", label: "تماس با ما" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-5 tracking-wide">ارتباط با ما</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={15} className="text-gold mt-0.5 shrink-0" />
                <span className="text-sm text-muted-foreground leading-relaxed">
                  ایران، تهران
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={15} className="text-gold shrink-0" />
                <a href="tel:02100000000" className="text-sm text-muted-foreground hover:text-foreground transition-colors" dir="ltr">
                  ۰۲۱-XXXXXXXX
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={15} className="text-gold shrink-0" />
                <a href="mailto:info@clayberg.ir" className="text-sm text-muted-foreground hover:text-foreground transition-colors" dir="ltr">
                  info@clayberg.ir
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="gold-line mb-8" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © ۱۴۰۳ کلایبرگ. تمامی حقوق محفوظ است.
          </p>
          <p className="text-xs text-muted-foreground">
            WWW.CLAYBERG.IR
          </p>
        </div>
      </div>
    </footer>
  )
}
