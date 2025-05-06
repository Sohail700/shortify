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

  // Simple feature detection for older browsers
  const isOldBrowser = () => {
    try {
      // Test for modern features
      if (!CSS.supports('display', 'grid')) return true;
      if (!CSS.supports('position', 'sticky')) return true;
      return false;
    } catch (e) {
      return true; // If CSS.supports isn't available
    }
  };

  const oldBrowser = isOldBrowser();

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      {/* Simple, compatible navigation */}
      {/* <header className={`w-full ${oldBrowser ? 'bg-gray-800' : 'bg-gray-800/80 backdrop-blur-sm'} py-4 px-4 sm:px-6 fixed top-0 z-50 border-b ${oldBrowser ? 'border-gray-700' : 'border-gray-700/50'}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <span className={`text-xl font-bold ${oldBrowser ? 'text-purple-400' : 'bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500'}`}>
              Shortify
            </span>
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li><a href="#features" className="hover:text-purple-300 transition-colors">Features</a></li>
              <li><a href="#faq" className="hover:text-purple-300 transition-colors">FAQ</a></li>
              <Button 
                variant="outline" 
                className={`ml-4 ${oldBrowser ? 'bg-purple-600 border-purple-600' : 'bg-purple-600/10 border-purple-400/20 hover:bg-purple-600/20'}`}
                onClick={() => navigate('/auth')}
              >
                Sign In
              </Button>
            </ul>
          </nav>
        </div>
      </header> */}

      {/* Hero Section - Designed for compatibility */}
      <section className={`pt-32 pb-16 px-4 sm:px-6 lg:px-8 ${oldBrowser ? 'bg-gray-900' : 'bg-gradient-to-b from-purple-900/30 to-gray-900'}`}>
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className={oldBrowser ? 'text-purple-400' : 'bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500'}>
              Shortify
            </span>{" "}
            <span className="block sm:inline">Your Links, Simplified</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-10">
            Fast, reliable URL shortening that works everywhere - on any device, any browser.
          </p>

          {/* URL Shortener Form - Robust and accessible */}
          <div className="max-w-3xl mx-auto mb-16">
            <form 
              onSubmit={handleShorten} 
              className="flex flex-col sm:flex-row gap-3 w-full"
            >
              <Input
                type="url"
                placeholder="Paste your long URL here..."
                value={longUrl}
                onChange={(e) => setLongUrl(e.target.value)}
                className={`flex-1 h-14 text-base sm:text-lg px-5 rounded-lg ${oldBrowser ? 'border-gray-600 bg-gray-800' : 'border-purple-500/50 bg-gray-800/50 focus:ring-2 focus:ring-purple-500 focus:border-transparent'}`}
                required
              />
              <Button
                type="submit"
                className={`h-14 px-6 sm:px-8 text-base sm:text-lg ${oldBrowser ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'}`}
                size="lg"
              >
                Shorten URL
              </Button>
            </form>
            <p className="text-sm text-gray-400 mt-2">
              Works on Chrome, Firefox, Safari, Edge, and legacy browsers
            </p>
          </div>

          {/* Hero Image - Optimized for all devices */}
          <div className={`rounded-lg overflow-hidden max-w-6xl mx-auto ${oldBrowser ? 'border-gray-700' : 'border-purple-500/20'} border shadow-md`}>
            <picture>
              <source srcSet="/banner1.webp" type="image/webp" />
              <img
                src="/banner1.jpg"
                alt="URL Shortener Illustration"
                className="w-full h-auto"
                loading="lazy"
                width="1200"
                height="630"
              />
            </picture>
          </div>
        </div>
      </section>

      {/* Features Section - Solid design that works everywhere */}
      <section id="features" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Shortify?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "⚡",
                title: "Universal Compatibility",
                desc: "Works flawlessly on all devices and browsers, even older ones",
              },
              {
                icon: "📊",
                title: "Simple Analytics",
                desc: "Essential tracking that loads fast on any connection",
              },
              {
                icon: "🔒",
                title: "Reliable Security",
                desc: "Basic HTTPS protection that even older devices can handle",
              },
            ].map((feature, index) => (
              <div 
                key={index}
                className={`p-6 rounded-lg ${oldBrowser ? 'bg-gray-800 border-gray-700' : 'bg-gray-800/50 border-purple-500/20 backdrop-blur-sm'} border transition-all hover:border-purple-500/50`}
              >
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section - Accessible and simple */}
      <section id="faq" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          <Accordion
            type="multiple"
            collapsible
            className={`w-full rounded-lg overflow-hidden ${oldBrowser ? 'bg-gray-800 border-gray-700' : 'bg-gray-800/50 border-purple-500/20 backdrop-blur-sm'} border`}
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
                className={`${oldBrowser ? 'border-gray-700' : 'border-gray-700/50'} border-b`}
              >
                <AccordionTrigger className={`py-4 px-6 text-left font-medium ${oldBrowser ? 'hover:text-purple-400' : 'hover:text-purple-300'} transition-colors`}>
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

      {/* CTA Section - Clear and compelling */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to shorten your first URL?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust Shortify for reliable, cross-browser compatible URL shortening.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => document.querySelector("form")?.scrollIntoView({ behavior: "smooth" })}
              className={`h-14 px-8 text-lg ${oldBrowser ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'}`}
              size="lg"
            >
              Get Started Now
            </Button>
            <Button
              variant="outline"
              className={`h-14 px-8 text-lg ${oldBrowser ? 'bg-indigo-600 hover:bg-purple-700' : 'bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'}`}
              size="lg"
              onClick={() => navigate('/auth')}
            >
              Create Account
            </Button>
          </div>
        </div>
      </section>

     

      {/* Legacy browser warning (hidden by default) */}
      <div className="fixed bottom-0 left-0 right-0 bg-yellow-600 text-white p-2 text-center hidden" id="legacy-warning">
        You're using an older browser. Some visual effects may be limited, but all functionality works!
      </div>

      {/* Progressive enhancement script */}
      <script dangerouslySetInnerHTML={{
        __html: `
          if (${oldBrowser}) {
            document.getElementById('legacy-warning').style.display = 'block';
            // Add any necessary polyfills or fallbacks here
          }
        `
      }} />
    </div>
  );
};

export default LandingPage;