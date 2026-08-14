import React from "react"
import { Activity, Gauge, Gift, House, ListChecks, Monitor, Shirt, ShoppingBag, Sparkles, Star, Ticket, Users, WalletCards, Waypoints } from "lucide-react"
import { siFacebook, siWhatsapp } from "simple-icons"

const brandIcons = {
  facebook: siFacebook,
  whatsapp: siWhatsapp,
}

const conceptIcons = {
  platform: House,
  pac: Waypoints,
  progress: Gauge,
  missions: ListChecks,
  rewards: Gift,
  store: ShoppingBag,
  community: Users,
  activity: Activity,
  bankroll: WalletCards,
  "free-spins": Sparkles,
  merch: Shirt,
  hardware: Monitor,
  tickets: Ticket,
  experiences: Star,
}

export function PresentationIcon({ name, className = "", size = 24, strokeWidth = 1.65 }) {
  const brand = brandIcons[name]

  if (brand) {
    return (
      <svg
        className={`presentation-icon presentation-icon--brand ${className}`.trim()}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        focusable="false"
      >
        <path d={brand.path} />
      </svg>
    )
  }

  const ConceptIcon = conceptIcons[name]
  if (!ConceptIcon) return null

  return (
    <ConceptIcon
      className={`presentation-icon presentation-icon--concept ${className}`.trim()}
      size={size}
      strokeWidth={strokeWidth}
      aria-hidden="true"
      focusable="false"
    />
  )
}
