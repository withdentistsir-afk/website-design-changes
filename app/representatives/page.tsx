"use client"

import { useState, useCallback } from "react"
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps"
import { motion, AnimatePresence } from "framer-motion"
import { X, Phone, Smartphone, MapPin, Building2, ChevronRight, Users } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { provinceRepresentatives, type ProvinceRepresentatives } from "@/lib/data"

const GEO_URL = "/iran-provinces.geojson"

function getProvince(isoCode: string): ProvinceRepresentatives | undefined {
  // GeoJSON uses full ISO like "IR-07"; data also uses "IR-07"
  return provinceRepresentatives.find((p) => p.isoCode === isoCode)
}

function getIsoFromFeature(geo: { properties: Record<string, unknown> }): string {
  const tags = geo.properties.tags as Record<string, string> | undefined
  return (tags?.["ISO3166-2"] ?? geo.properties["ISO3166-2"] ?? "") as string
}

export default function RepresentativesPage() {
  const [selected, setSelected] = useState<ProvinceRepresentatives | null>(null)
  const [hoveredIso, setHoveredIso] = useState<string | null>(null)

  const handleProvinceClick = useCallback((geo: { properties: Record<string, unknown> }) => {
    const iso = getIsoFromFeature(geo)
    const province = getProvince(iso)
    if (province) setSelected(province)
  }, [])

  const totalReps = provinceRepresentatives.reduce(
    (acc, p) => acc + p.representatives.length,
    0
  )
  const coveredProvinces = provinceRepresentatives.filter(
    (p) => p.representatives.length > 0
  ).length

  return (
    <main className="min-h-screen bg-background font-sans" dir="rtl">
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-10 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-10 h-px bg-gold" />
            <span className="text-gold text-xs tracking-[0.4em] font-medium uppercase">Network</span>
            <span className="w-10 h-px bg-gold" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-foreground mb-4 text-balance">
            شبکه نمایندگان کلایبرگ
          </h1>
          <p className="text-foreground/60 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            برای یافتن نمایندگی مجاز در استان خود، روی استان موردنظر در نقشه کلیک کنید.
          </p>

          {/* Stats row */}
          <div className="flex items-center justify-center gap-8 mt-8">
            <div className="text-center">
              <p className="text-2xl font-black text-gold">{totalReps}+</p>
              <p className="text-xs text-foreground/50 mt-1">نمایندگی فعال</p>
            </div>
            <div className="w-px h-10 bg-border" />
            <div className="text-center">
              <p className="text-2xl font-black text-gold">{coveredProvinces}</p>
              <p className="text-xs text-foreground/50 mt-1">استان پوشش‌داده‌شده</p>
            </div>
            <div className="w-px h-10 bg-border" />
            <div className="text-center">
              <p className="text-2xl font-black text-gold">۳۱</p>
              <p className="text-xs text-foreground/50 mt-1">استان کشور</p>
            </div>
          </div>
        </div>
      </section>

      {/* Map + Panel */}
      <section className="px-4 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="relative flex flex-col lg:flex-row gap-6 items-start">

            {/* Map card */}
            <div className="flex-1 bg-card border border-border rounded-2xl overflow-hidden shadow-xl">
              <div className="p-3 border-b border-border flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-gold" />
                <span className="text-xs text-foreground/50">برای انتخاب استان کلیک کنید</span>
              </div>
              <div className="relative bg-background/30">
                <ComposableMap
                  projection="geoMercator"
                  projectionConfig={{ center: [53.5, 32.5], scale: 1600 }}
                  width={800}
                  height={580}
                  style={{ width: "100%", height: "auto" }}
                >
                  <ZoomableGroup>
                    <Geographies geography={GEO_URL}>
                      {({ geographies }) =>
                        geographies.map((geo) => {
                          const iso = getIsoFromFeature(geo)
                          const province = getProvince(iso)
                          const hasReps = (province?.representatives.length ?? 0) > 0
                          const isSelected = selected?.isoCode === iso
                          const isHovered = hoveredIso === iso

                          return (
                            <Geography
                              key={geo.rsmKey}
                              geography={geo}
                              onClick={() => handleProvinceClick(geo)}
                              onMouseEnter={() => setHoveredIso(iso)}
                              onMouseLeave={() => setHoveredIso(null)}
                              style={{
                                default: {
                                  fill: isSelected
                                    ? "#56b5be"
                                    : hasReps
                                    ? "rgba(86,181,190,0.25)"
                                    : "rgba(255,255,255,0.06)",
                                  stroke: isSelected
                                    ? "#56b5be"
                                    : "rgba(86,181,190,0.35)",
                                  strokeWidth: isSelected ? 1.5 : 0.8,
                                  outline: "none",
                                  cursor: hasReps ? "pointer" : "default",
                                  transition: "fill 0.2s, stroke 0.2s",
                                },
                                hover: {
                                  fill: hasReps ? "#56b5be" : "rgba(255,255,255,0.10)",
                                  stroke: "#56b5be",
                                  strokeWidth: 1.2,
                                  outline: "none",
                                  cursor: hasReps ? "pointer" : "default",
                                },
                                pressed: {
                                  fill: "#3a9aa3",
                                  outline: "none",
                                },
                              }}
                            />
                          )
                        })
                      }
                    </Geographies>
                  </ZoomableGroup>
                </ComposableMap>

                {/* Legend */}
                <div className="absolute bottom-3 left-3 flex flex-col gap-1.5 text-xs">
                  <div className="flex items-center gap-2 bg-card/90 backdrop-blur px-2.5 py-1.5 rounded-lg border border-border">
                    <span className="w-3 h-3 rounded-sm bg-[rgba(86,181,190,0.25)] border border-[#56b5be]/50 shrink-0" />
                    <span className="text-foreground/60">دارای نمایندگی</span>
                  </div>
                  <div className="flex items-center gap-2 bg-card/90 backdrop-blur px-2.5 py-1.5 rounded-lg border border-border">
                    <span className="w-3 h-3 rounded-sm bg-[#56b5be] shrink-0" />
                    <span className="text-foreground/60">استان انتخاب‌شده</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Info panel */}
            <div className="w-full lg:w-80 xl:w-96 shrink-0">
              <AnimatePresence mode="wait">
                {selected ? (
                  <motion.div
                    key={selected.isoCode}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="bg-card border border-border rounded-2xl overflow-hidden shadow-xl"
                  >
                    {/* Panel header */}
                    <div className="flex items-center justify-between p-4 border-b border-border bg-background/30">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-gold" />
                        <h2 className="text-sm font-bold text-foreground">{selected.provinceName}</h2>
                      </div>
                      <button
                        onClick={() => setSelected(null)}
                        aria-label="بستن"
                        className="p-1.5 rounded-full hover:bg-surface transition-colors text-foreground/50 hover:text-foreground"
                      >
                        <X size={15} />
                      </button>
                    </div>

                    {/* Reps list */}
                    <div className="p-4 flex flex-col gap-4 max-h-[500px] overflow-y-auto">
                      {selected.representatives.length === 0 ? (
                        <div className="py-10 text-center">
                          <Users size={36} className="mx-auto text-foreground/20 mb-3" />
                          <p className="text-sm text-foreground/50">
                            در حال حاضر نمایندگی در این استان ثبت نشده است.
                          </p>
                          <p className="text-xs text-foreground/30 mt-1">
                            برای اطلاعات بیشتر با دفتر مرکزی تماس بگیرید.
                          </p>
                        </div>
                      ) : (
                        selected.representatives.map((rep, i) => (
                          <motion.div
                            key={rep.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.07 }}
                            className="bg-background/50 border border-border rounded-xl p-4 flex flex-col gap-3"
                          >
                            <div className="flex items-start gap-2">
                              <Building2 size={15} className="text-gold mt-0.5 shrink-0" />
                              <div>
                                <p className="text-sm font-bold text-foreground leading-snug">{rep.name}</p>
                                <p className="text-xs text-gold mt-0.5">{rep.company}</p>
                              </div>
                            </div>

                            <div className="flex items-start gap-2">
                              <MapPin size={13} className="text-foreground/40 mt-0.5 shrink-0" />
                              <p className="text-xs text-foreground/60 leading-relaxed">{rep.address}</p>
                            </div>

                            <div className="flex flex-col gap-1.5">
                              <a
                                href={`tel:${rep.phone}`}
                                className="flex items-center gap-2 text-xs text-foreground/70 hover:text-gold transition-colors"
                              >
                                <Phone size={12} className="shrink-0" />
                                <span dir="ltr">{rep.phone}</span>
                              </a>
                              {rep.mobile && (
                                <a
                                  href={`tel:${rep.mobile}`}
                                  className="flex items-center gap-2 text-xs text-foreground/70 hover:text-gold transition-colors"
                                >
                                  <Smartphone size={12} className="shrink-0" />
                                  <span dir="ltr">{rep.mobile}</span>
                                </a>
                              )}
                            </div>
                          </motion.div>
                        ))
                      )}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-card border border-border rounded-2xl p-8 text-center shadow-xl"
                  >
                    <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                      <MapPin size={28} className="text-gold" />
                    </div>
                    <h3 className="text-base font-bold text-foreground mb-2">استان خود را انتخاب کنید</h3>
                    <p className="text-sm text-foreground/50 leading-relaxed">
                      روی هر استان در نقشه کلیک کنید تا لیست نمایندگان مجاز کلایبرگ در آن منطقه نمایش داده شود.
                    </p>

                    {/* Quick province list */}
                    <div className="mt-6 flex flex-col gap-1 text-right">
                      <p className="text-xs text-foreground/40 mb-2 text-center">استان‌های با نمایندگی فعال</p>
                      {provinceRepresentatives
                        .filter((p) => p.representatives.length > 0)
                        .slice(0, 6)
                        .map((p) => (
                          <button
                            key={p.isoCode}
                            onClick={() => setSelected(p)}
                            className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-surface transition-colors group"
                          >
                            <span className="text-xs text-foreground/70 group-hover:text-foreground">{p.provinceName}</span>
                            <div className="flex items-center gap-1">
                              <span className="text-xs text-gold">{p.representatives.length} نماینده</span>
                              <ChevronRight size={12} className="text-foreground/30 group-hover:text-gold transition-colors" />
                            </div>
                          </button>
                        ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
