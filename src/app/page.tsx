import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import FeaturedWork from '@/components/FeaturedWork';
import Process from '@/components/Process';
import QuoteForm from '@/components/QuoteForm';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <Hero />
        <Services />
        <FeaturedWork />
        <Process />
        <QuoteForm />
      </div>
      <Footer />
    </main>
  );
}
