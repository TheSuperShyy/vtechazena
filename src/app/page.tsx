import Header from "@/components/site/Header";
import Hero from "@/components/site/Hero";
import Intro from "@/components/site/Intro";
import Story from "@/components/site/Story";
import Work from "@/components/site/Work";
import Showcase from "@/components/site/Showcase";
import Process from "@/components/site/Process";
import Interlude from "@/components/site/Interlude";
import Gallery from "@/components/site/Gallery";
import Testimonials from "@/components/site/Testimonials";
import Sketches from "@/components/site/Sketches";
import Faq from "@/components/site/Faq";
import Contact from "@/components/site/Contact";
import WhisperReveal from "@/components/site/WhisperReveal";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Intro />
      <Story />
      <Work />
      {/* Wrapper bounds the Showcase's position:sticky range: it pins only while
          this group is on screen, so it unpins when Services ends — without it the
          photo would stay pinned over the whole page (FAQ, contact). */}
      <div className="stack-group">
        <Showcase />
        <Process />
      </div>
      <Interlude />
      <Gallery />
      <Testimonials />
      <Sketches />
      <Faq />
      <Contact />
      <WhisperReveal />
    </>
  );
}
