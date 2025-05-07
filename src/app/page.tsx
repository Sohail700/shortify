import Footer from '@/components/Footer';
import Header from '@/components/Header';
import ShortenerForm from '@/components/ShortenerForm';

export default function Home() {
  return (
<main className="flex-1">
  <Header/>
  <section className="flex items-center justify-center py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
    <div className="w-full px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Shorten Your Links Instantly
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Quickly turn long links into short ones. Simple, fast, and easy to use.
        </p>
        <div className="flex justify-center">
          <ShortenerForm />
        </div>
      </div>
    </div>
  </section>
  <Footer/>
</main>

  );
}
