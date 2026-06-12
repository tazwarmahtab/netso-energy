"use client";

export default function Footer() {
  return (
    <footer className="w-full py-24 mt-24 border-t border-white/10 bg-black">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-12">

        <div>
          {/* Logo */}
          <div className="relative w-32 h-16 mb-4">
            <img
              src="/assets/logo.png"
              alt="Netso Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <p className="text-white/60 text-sm leading-relaxed">
            The first cinematic rooftop solar lounge solution designed for Bangladesh.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-white/70">
            <li className="hover:text-white cursor-pointer transition">About Us</li>
            <li className="hover:text-white cursor-pointer transition">Pricing</li>
            <li className="hover:text-white cursor-pointer transition">Installations</li>
            <li className="hover:text-white cursor-pointer transition">Partner With Us</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Support</h4>
          <ul className="space-y-2 text-white/70">
            <li className="hover:text-white cursor-pointer transition">FAQ</li>
            <li className="hover:text-white cursor-pointer transition">WhatsApp Support</li>
            <li className="hover:text-white cursor-pointer transition">Roof Assessment</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Contact</h4>
          <p className="text-white/70 text-sm">
            Dhaka, Bangladesh<br />
            support@netso.co<br />
            +880-1X-XXXXXXX
          </p>
        </div>

      </div>

      <div className="text-center text-white/40 text-sm mt-16">
        © {new Date().getFullYear()} Netso. All rights reserved.
      </div>
    </footer>
  );
}
