"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuth } from "../context/AuthContext";

const FOOTER_LINKS = [
  {
    heading: "Get to Know Us",
    links: ["About Amazon", "Careers", "Press Releases", "Amazon Science"],
  },
  {
    heading: "Connect with Us",
    links: ["Facebook", "Twitter", "Instagram"],
  },
  {
    heading: "Make Money with Us",
    links: [
      "Sell on Amazon",
      "Sell under Amazon Accelerator",
      "Protect and Build Your Brand",
      "Amazon Global Selling",
      "Supply to Amazon",
      "Become an Affiliate",
      "Fulfilment by Amazon",
      "Advertise Your Products",
      "Amazon Pay on Merchants",
    ],
  },
  {
    heading: "Let Us Help You",
    links: [
      "Your Account",
      "Returns Centre",
      "Recalls and Product Safety Alerts",
      "100% Purchase Protection",
      "Amazon App Download",
      "Help",
    ],
  },
];

const BOTTOM_LINKS = [
  { name: "AbeBooks", sub: "Books, art\n& collectibles" },
  { name: "Amazon Web Services", sub: "Scalable Cloud\nComputing Services" },
  { name: "Audible", sub: "Download\nAudio Books" },
  { name: "IMDb", sub: "Movies, TV\n& Celebrities" },
  { name: "Shopbop", sub: "Designer\nFashion Brands" },
  { name: "Amazon Business", sub: "Everything For\nYour Business" },
  { name: "Amazon Prime Music", sub: "100 million songs, ad-free\nOver 15 million podcast\nepisodes" },
];

export default function Footer() {
  const { user } = useAuth();

  return (
    <footer>
      {/* Sign in banner – only for guests */}
      {!user && (
      <div className="bg-white border-t border-b border-gray-200 py-8">
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-3">
          <p className="text-[20px] font-bold text-gray-900">See personalized recommendations</p>
          <Link href="/auth/login" className="bg-[#ffd814] hover:bg-[#f7ca00] text-gray-900 text-[15px] font-normal px-20 py-2.5 rounded-full border border-[#FCD200] cursor-pointer transition-colors no-underline">
            Sign in
          </Link>
          <p className="text-[13px] text-gray-700">
            New customer?{" "}
            <Link href="/auth/register" className="text-amazon-blue hover:text-amazon-orange hover:underline no-underline">
              Start here.
            </Link>
          </p>
        </div>
      </div>
      )}

      {/* Back to top */}
      <div className="h-4 bg-gray-100" />
      <div
        className="bg-[#37475a] text-white text-sm font-normal text-center py-4 cursor-pointer hover:bg-[#485769] transition-colors"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        Back to top
      </div>

      {/* Main footer links */}
      <div className="bg-[#232f3e] text-white py-10 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8">
          {FOOTER_LINKS.map((col) => (
            <div key={col.heading}>
              <h4 className="text-[15px] font-bold mb-3">{col.heading}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="/"
                      className="text-[13px] text-[#ddd] hover:text-white no-underline leading-snug block"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="bg-[#232f3e] border-t border-[#3a4553]" />

      {/* Logo + language/country */}
      <div className="bg-[#232f3e] py-6 flex flex-col items-center gap-4">
        <img src="/navbar/logo.svg" alt="Amazon" width={90} height={30} />
        <div className="flex gap-3">
          <button className="flex items-center gap-1.5 border border-[#aaa] text-white text-[13px] px-3 py-1.5 rounded cursor-pointer bg-transparent hover:bg-[#3a4553] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20M12 2a15.3 15.3 0 0 1 0 20M12 2a15.3 15.3 0 0 0 0 20" />
            </svg>
            English
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          <button className="flex items-center gap-1.5 border border-[#aaa] text-white text-[13px] px-3 py-1.5 rounded cursor-pointer bg-transparent hover:bg-[#3a4553] transition-colors">
            <img src="/navbar/flag.png" alt="IN" width={18} height={13} />
            US
          </button>
        </div>
      </div>

      {/* Bottom sub-brands */}
      <div className="bg-[#131a22] py-8 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6">
          {BOTTOM_LINKS.map((item) => (
            <Link key={item.name} href="/" className="no-underline group">
              <p className="text-white text-[13px] font-bold group-hover:underline leading-tight">{item.name}</p>
              <p className="text-[#999] text-[12px] leading-snug whitespace-pre-line">{item.sub}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Copyright bar */}
      <div className="bg-[#131a22] border-t border-[#3a4553] py-4 text-center">
        <p className="text-[#999] text-[12px]">
          © 1996–2026, Amazon.com, Inc. or its affiliates
        </p>
      </div>
    </footer>
  );
}
