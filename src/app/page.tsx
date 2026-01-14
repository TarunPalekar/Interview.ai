"use client"
import React, { useState, useEffect } from 'react';
import { Video, Sparkles, Clock, FileText, MessageSquare, Menu, X, ArrowRight, Play } from 'lucide-react';
import Image from 'next/image';
import {  useRouter } from 'next/navigation';


export default function Page  () {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: <Video className="w-6 h-6" />,
      title: "AI-Powered Video Calls",
      description: "Real-time video meetings with custom AI agents that understand context and provide intelligent assistance."
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Custom AI Agents",
      description: "Create specialized agents for different purposes - from coding helpers to teaching assistants."
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Auto-Generated Transcripts",
      description: "Every meeting is automatically transcribed with searchable text and timestamps."
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "AI Chat Assistant",
      description: "Post-call AI chat that understands your meeting context and answers questions about the discussion."
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Smart Summaries",
      description: "Get instant meeting summaries with key points, action items, and important moments."
    },
    {
      icon: <Play className="w-6 h-6" />,
      title: "Video Playback",
      description: "Review your calls with synchronized video, transcript, and AI-generated insights."
    }
  ];
  
     

  const stats = [
    { value: "10k+", label: "AI Meetings" },
    { value: "99.9%", label: "Uptime" },
    { value: "50+", label: "AI Agents" },
    { value: "24/7", label: "Support" }
  ];

  const router=useRouter();
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/95 backdrop-blur-lg shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8  rounded-lg flex items-center justify-center">
                <Image src={"/logo.svg"} height={24} width={42} alt='logo'/>
              </div>
              <span className="text-2xl font-bold text-white">Interview.Ai</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-white transition">Features</a>
              <a href="#how-it-works" className="text-gray-300 hover:text-white transition">How it Works</a>
              <a href="#pricing" className="text-gray-300 hover:text-white transition">Pricing</a>
              <button className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:shadow-lg hover:shadow-green-500/50 transition transform hover:scale-105"
              onClick={()=>{router.push("/dashboard/meetings")}}
              >
                Get Started
              </button>
            </div>

            <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-slate-900/95 backdrop-blur-lg">
            <div className="px-4 pt-2 pb-4 space-y-3">
              <a href="#features" className="block text-gray-300 hover:text-white transition">Features</a>
              <a href="#how-it-works" className="block text-gray-300 hover:text-white transition">How it Works</a>
              <a href="#pricing" className="block text-gray-300 hover:text-white transition">Pricing</a>
              <button className="w-full px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg">
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-green-500/10 border border-green-500/30 rounded-full px-4 py-2 mb-8">
              <Sparkles className="w-4 h-4 text-green-400" />
              <span className="text-green-400 text-sm font-medium">AI-Powered Video Collaboration</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Meet Your AI
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent"> Interview </span>
              Assistant
            </h1>
            
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
              Transform your video calls with intelligent AI agents. Get instant summaries, searchable transcripts, 
              and contextual insights from every conversation.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button  onClick={()=>{router.push("/dashboard/meetings")}}  className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold hover:shadow-2xl hover:shadow-green-500/50 transition transform hover:scale-105 flex items-center space-x-2">
                <span>Start Free Trial</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold border border-white/20 hover:bg-white/20 transition flex items-center space-x-2">
                <Play className="w-5 h-5" />
                <span>Watch Demo</span>
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Everything You Need for Smarter Meetings
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Powerful features designed to make your video calls more productive and insightful
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div 
                key={i} 
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-green-500/50 transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Simple, Powerful Workflow
            </h2>
            <p className="text-xl text-gray-300">Get started in minutes, not hours</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Create Your Agent", desc: "Choose or customize an AI agent for your specific needs" },
              { step: "02", title: "Start Your Meeting", desc: "Launch a video call with your AI assistant in seconds" },
              { step: "03", title: "Get Insights", desc: "Receive summaries, transcripts, and AI-powered analysis instantly" }
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-green-500/50 transition-all">
                  <div className="text-6xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-400">{item.desc}</p>
                </div>
                {i < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-green-500/50" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-12 shadow-2xl shadow-green-500/30">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Meetings?
            </h2>
            <p className="text-xl text-green-100 mb-8">
              Join thousands of teams using Interview.AI to make their video calls more productive
            </p>
            <button  onClick={()=>{router.push("/dashboard/meetings")}} className="px-10 py-4 bg-white text-green-600 rounded-lg font-semibold text-lg hover:shadow-xl transition transform hover:scale-105">
              Get Started for Free
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8  rounded-lg flex items-center justify-center">
                  <Image src={"/logo.svg"} height={24} width={42} alt='logo'/>
                </div>
                <span className="text-xl font-bold text-white">Interview.Ai</span>
              </div>
              <p className="text-gray-400">AI-powered video collaboration for the modern workplace</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-white transition">Features</a>
                <a href="#" className="block text-gray-400 hover:text-white transition">Pricing</a>
                <a href="#" className="block text-gray-400 hover:text-white transition">Security</a>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-white transition">About</a>
                <a href="#" className="block text-gray-400 hover:text-white transition">Blog</a>
                <a href="#" className="block text-gray-400 hover:text-white transition">Careers</a>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-white transition">Help Center</a>
                <a href="#" className="block text-gray-400 hover:text-white transition">Contact</a>
                <a href="#" className="block text-gray-400 hover:text-white transition">Status</a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-gray-400">
            <p>&copy; 2026 Interview.AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}