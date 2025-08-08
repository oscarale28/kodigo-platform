import LandingAchievements from "@/components/landing/achievements"
import LandingBootcamps from "@/components/landing/bootcamps"
import Footer from "@/components/landing/footer"
import LandingHero from "@/components/landing/hero"

export default function HomePage() {
  return (
    <div className="flex flex-col gap-30">
      <LandingHero />
      <LandingAchievements />
      <LandingBootcamps />
      <Footer />
    </div>
  )
}
