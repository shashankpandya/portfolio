import React, { useEffect, useRef, useState } from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from "react-icons/fa";

const Contacts = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    }, 1500);
  };

  const contactInfo = [
    { icon: <FaEnvelope />, label: "Email", value: "pandyashashank1@gmail.com", href: "mailto:pandyashashank1@gmail.com" },
    { icon: <FaGithub />, label: "GitHub", value: "shashankpandya", href: "https://github.com/shashankpandya" },
    { icon: <FaLinkedin />, label: "LinkedIn", value: "shashank-pandya", href: "https://www.linkedin.com/in/shashank-pandya-213366287/" },
    { icon: <FaMapMarkerAlt />, label: "Location", value: "IIT Kharagpur, India", href: null }
  ];

  return (
    <section 
      ref={sectionRef}
      name="contact" 
      className="relative py-32 w-full bg-gradient-to-b from-gray-950 via-black to-gray-900"
    >
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[180px]" />
      </div>

      <div className="relative z-10 max-w-screen-xl mx-auto px-6">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-cyan-400 font-mono text-sm tracking-widest mb-4">&lt;Contact /&gt;</p>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Let's <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Connect</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? I'd love to hear from you.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full mt-6" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className={`space-y-8 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.href}
                  target={info.href?.startsWith('http') ? '_blank' : undefined}
                  rel={info.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-6 p-6 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-cyan-500/50 transition-all duration-300 group"
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white text-xl group-hover:scale-110 transition-transform">
                    {info.icon}
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">{info.label}</p>
                    <p className="text-white font-semibold group-hover:text-cyan-400 transition-colors">
                      {info.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div className="pt-8">
              <p className="text-gray-500 text-sm mb-4">Or find me on</p>
              <div className="flex gap-4">
                <a href="https://github.com/shashankpandya" target="_blank" rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-all">
                  <FaGithub className="text-xl" />
                </a>
                <a href="https://www.linkedin.com/in/shashank-pandya-213366287/" target="_blank" rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-all">
                  <FaLinkedin className="text-xl" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="relative p-8 rounded-2xl bg-gray-900/50 border border-gray-800">
              {/* Terminal-style header */}
              <div className="absolute top-0 left-0 right-0 h-10 bg-gray-800 rounded-t-2xl flex items-center px-4 gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                <span className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-4 text-gray-500 text-sm font-mono">contact.sh</span>
              </div>

              <form onSubmit={handleSubmit} className="pt-8 space-y-6">
                <div className="relative">
                  <label className="text-cyan-400 font-mono text-sm">$ name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    required
                    className="w-full mt-2 p-4 bg-gray-950 border border-gray-700 rounded-xl text-white placeholder:text-gray-600 focus:border-cyan-500 focus:outline-none transition-colors font-mono"
                  />
                </div>

                <div className="relative">
                  <label className="text-cyan-400 font-mono text-sm">$ email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                    required
                    className="w-full mt-2 p-4 bg-gray-950 border border-gray-700 rounded-xl text-white placeholder:text-gray-600 focus:border-cyan-500 focus:outline-none transition-colors font-mono"
                  />
                </div>

                <div className="relative">
                  <label className="text-cyan-400 font-mono text-sm">$ message</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your project..."
                    rows={5}
                    required
                    className="w-full mt-2 p-4 bg-gray-950 border border-gray-700 rounded-xl text-white placeholder:text-gray-600 focus:border-cyan-500 focus:outline-none transition-colors font-mono resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || submitted}
                  className={`w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-3 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-900 ${
                    submitted 
                      ? 'bg-green-600 text-white' 
                      : 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-500 hover:to-blue-500 hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] hover:scale-105'
                  } disabled:opacity-70 focus:opacity-90`}
                >
                  {submitted ? (
                    <>
                      <span>Message Sent!</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </>
                  ) : isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Send Message</span>
                      <FaPaperPlane className="text-sm" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={`mt-24 text-center transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-gray-500 text-sm">
            © 2024 Shashank Pandya. Crafted with ❤️ from IIT Kharagpur.
          </p>
          <div className="mt-4 flex justify-center gap-4">
            <span className="text-gray-600">React</span>
            <span className="text-gray-700">•</span>
            <span className="text-gray-600">Tailwind CSS</span>
            <span className="text-gray-700">•</span>
            <span className="text-gray-600">Vercel</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacts;
