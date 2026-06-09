import Header from "@/components/site/Header";
import Hero from "@/components/site/Hero";
import Intro from "@/components/site/Intro";
import Work from "@/components/site/Work";
import Process from "@/components/site/Process";
import Faq from "@/components/site/Faq";
import Contact from "@/components/site/Contact";
import WhisperReveal from "@/components/site/WhisperReveal";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Intro />
      <div className="stack-reveal">
        <Work />
        <Process />
      </div>
      <Faq />
      <Contact />
      <WhisperReveal />
    </>
  );
}
