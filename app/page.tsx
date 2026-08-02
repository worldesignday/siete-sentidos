import { getContent } from "@/lib/content";
import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { Methodology } from "@/components/sections/methodology";
import { DaySchedule } from "@/components/sections/day-schedule";
import { Weeks } from "@/components/sections/weeks";
import { Testimonials } from "@/components/sections/testimonials";
import { Founder } from "@/components/sections/founder";
import { Pricing } from "@/components/sections/pricing";
import { Faq } from "@/components/sections/faq";
import { ReservationForm } from "@/components/sections/reservation-form";
import { Footer } from "@/components/sections/footer";
import { MobileCta } from "@/components/sections/mobile-cta";

export const dynamic = "force-dynamic";

export default async function Home() {
  const content = await getContent();

  return (
    <>
      <Header site={content.site} />
      <Hero hero={content.hero} />
      <Methodology pain={content.pain} methodology={content.methodology} />
      <DaySchedule daySchedule={content.daySchedule} />
      <Weeks weeks={content.weeks} />
      <Testimonials testimonials={content.testimonials} />
      <Founder founder={content.founder} />
      <Pricing pricing={content.pricing} whatsappNumber={content.site.whatsappNumber} />
      <Faq faq={content.faq} />
      <ReservationForm reservation={content.reservation} whatsappNumber={content.site.whatsappNumber} />
      <Footer footer={content.footer} />
      <MobileCta whatsappNumber={content.site.whatsappNumber} />
    </>
  );
}
