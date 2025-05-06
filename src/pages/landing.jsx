import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const LandingPage = () => {
  const [longUrl, setLongUrl] = useState("");
  const navigate = useNavigate();

  const handleShorten = (e) => {
    e.preventDefault();
    if (longUrl) navigate(`/auth?createNew=${longUrl}`);
  };

  // Check for CSS feature support
  const supportsGradientText = typeof CSS !== 'undefined' && CSS.supports('background-clip', 'text');
  const supportsBackdrop = typeof CSS !== 'undefined' && CSS.supports('backdrop-filter', 'blur(10px)');

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-purple-900/50 to-gray-900">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            {supportsGradientText ? (
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-purple-500">
                Shortify
              </span>
            ) : (
              <span className="text-purple-400">Shortify</span>
            )}{" "}
            - The Ultimate URL Shortener
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-10">
            Shorten, share, and track your links with our powerful yet simple URL shortener.
          </p>

          {/* URL Shortener Form */}
          <div className="max-w-3xl mx-auto mb-16">
            <form onSubmit={handleShorten} className="flex flex-col sm:flex-row gap-3">
              <Input
                type="url"
                placeholder="Paste your long URL here..."
                value={longUrl}
                onChange={(e) => setLongUrl(e.target.value)}
                className="flex-1 h-14 text-base sm:text-lg px-5 rounded-lg border border-purple-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
              <Button
                type="submit"
                className="h-14 px-6 sm:px-8 text-base sm:text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                size="lg"
              >
                Shorten URL
              </Button>
            </form>
          </div>

          {/* Hero Image */}
          <div className="rounded-xl overflow-hidden border border-purple-500/20 max-w-6xl mx-auto shadow-lg">
            <img
              src="/banner1.jpg"
              alt="URL Shortener Illustration"
              className="w-full h-auto"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Shortify?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "⚡",
                title: "Lightning Fast",
                desc: "Instant URL shortening with 99.9% uptime",
              },
              {
                icon: "📊",
                title: "Powerful Analytics",
                desc: "Track clicks, locations, and devices",
              },
              {
                icon: "🔒",
                title: "Secure Links",
                desc: "HTTPS encryption for all your shortened URLs",
              },
            ].map((feature, index) => (
              <div 
                key={index}
                className={`p-6 rounded-lg ${supportsBackdrop ? 'bg-gray-800/50 backdrop-blur-sm' : 'bg-gray-800'} border border-purple-500/20 transition-all hover:border-purple-500/50`}
              >
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          <Accordion
            type="multiple"
            collapsible
            className={`w-full rounded-lg overflow-hidden ${supportsBackdrop ? 'bg-gray-800/50 backdrop-blur-sm' : 'bg-gray-800'}`}
          >
            {[
              {
                question: "How does the URL shortener work?",
                answer: "When you enter a long URL, our system generates a unique, shorter version that redirects to your original link when clicked."
              },
              {
                question: "Do I need an account to use the app?",
                answer: "Yes. Creating a free account allows you to manage all your URLs in one place and view detailed analytics."
              },
              {
                question: "What analytics are available?",
                answer: "We provide click counts, geographic locations, referral sources, device types, and browser information."
              },
              {
                question: "Is there a limit to how many URLs I can shorten?",
                answer: "Free accounts can shorten up to 100 URLs per month. Premium plans offer unlimited shortening."
              },
            ].map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-b border-gray-700"
              >
                <AccordionTrigger className="py-4 px-6 text-left font-medium hover:text-purple-400 transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-4 px-6 text-gray-300">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-purple-900/30">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to shorten your first URL?</h2>
          <Button
            onClick={() => document.querySelector("form")?.scrollIntoView({ behavior: "smooth" })}
            className="h-14 px-8 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            size="lg"
          >
            Get Started Now
          </Button>
        </div>
      </section>

      {/* Fallback styles for older browsers */}
      <style>{`
        @media not all and (min-resolution:.001dpcm) {
          /* Safari and older browsers fallbacks */
          .bg-gradient-to-r {
            background: #8B5CF6 !important;
          }
          .bg-gray-800\\/50 {
            background: #1F2937 !important;
          }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;