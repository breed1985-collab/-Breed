import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import CredibilityStrip from "@/components/CredibilityStrip";
import About from "@/components/About";
import WorkWithMe from "@/components/WorkWithMe";
import GoalGetters from "@/components/GoalGetters";
import CoachingPhilosophy from "@/components/CoachingPhilosophy";
import ProgramFinder from "@/components/ProgramFinder";
import Speaking from "@/components/Speaking";
import GirlSeries from "@/components/GirlSeries";
import Testimonials from "@/components/Testimonials";
import Booking from "@/components/Booking";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <CredibilityStrip />
        <About />
        <WorkWithMe />
        <GoalGetters />
        <CoachingPhilosophy />
        <ProgramFinder />
        <Speaking />
        <GirlSeries />
        <Testimonials />
        <Booking />
      </main>
      <Footer />
    </>
  );
}
