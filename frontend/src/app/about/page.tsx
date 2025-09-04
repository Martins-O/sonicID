'use client'

import Header from '@/components/Header'

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Alex Chen",
      role: "Founder & CEO",
      bio: "Former cryptography researcher at MIT with 10+ years in zero-knowledge systems",
      avatar: "👨‍💻"
    },
    {
      name: "Sarah Rodriguez",
      role: "Chief Technology Officer",
      bio: "Blockchain architect and former lead engineer at Ethereum Foundation",
      avatar: "👩‍💻"
    },
    {
      name: "Marcus Johnson",
      role: "Head of Security",
      bio: "Cybersecurity expert with extensive background in privacy-preserving technologies",
      avatar: "🔒"
    },
    {
      name: "Dr. Emily Watson",
      role: "Chief Scientist",
      bio: "PhD in Applied Cryptography, published researcher in zero-knowledge proofs",
      avatar: "🔬"
    }
  ]

  const milestones = [
    {
      date: "Q4 2023",
      title: "Project Inception",
      description: "SonicID concept developed and initial research began"
    },
    {
      date: "Q1 2024",
      title: "Prototype Development",
      description: "First working prototype on Sonic testnet"
    },
    {
      date: "Q2 2024",
      title: "Alpha Testing",
      description: "Closed alpha with 100 selected users"
    },
    {
      date: "Q3 2024",
      title: "Public Beta",
      description: "Open beta launch with enhanced features"
    },
    {
      date: "Q4 2024",
      title: "Mainnet Launch",
      description: "Full production deployment on Sonic blockchain"
    },
    {
      date: "Q1 2025",
      title: "Enterprise Adoption",
      description: "Major partnerships and enterprise integrations"
    }
  ]

  return (
    <div className="min-h-screen w-full">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-slate-800 via-blue-600 to-indigo-700 bg-clip-text text-transparent mb-8 leading-tight">
            About SonicID
          </h1>
          <p className="text-xl md:text-2xl text-slate-700 max-w-4xl mx-auto mb-8 leading-relaxed">
            We're building the future of digital identity verification through zero-knowledge technology and decentralized infrastructure.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-white/20">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Our Mission</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              To democratize identity verification by giving individuals complete control over their personal data while enabling trusted interactions in the digital world.
            </p>
            <p className="text-slate-600 leading-relaxed">
              We believe privacy is a fundamental right, and verification shouldn't come at the cost of exposing sensitive information.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-xl border border-white/20">
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Our Vision</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              A world where digital identity verification is instant, private, and universally trusted across all platforms and applications.
            </p>
            <p className="text-slate-600 leading-relaxed">
              We envision a future where your reputation and credentials seamlessly travel with you, protected by mathematics rather than centralized authorities.
            </p>
          </div>
        </div>

        {/* Our Story */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">Our Story</h2>
          <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-8 md:p-12 rounded-2xl border border-slate-200">
            <div className="prose prose-lg max-w-none text-slate-700">
              <p className="text-xl leading-relaxed mb-6">
                SonicID was born from a simple observation: the internet's identity crisis was getting worse, not better.
              </p>
              <p className="leading-relaxed mb-6">
                In 2023, our founders—a team of cryptographers, blockchain engineers, and privacy advocates—came together after witnessing countless data breaches and privacy violations in traditional identity systems. They asked a fundamental question: "What if we could prove who we are without revealing who we are?"
              </p>
              <p className="leading-relaxed mb-6">
                This question led to months of research into zero-knowledge cryptography, ultimately resulting in the SonicID protocol. Built on the high-performance Sonic blockchain, our system can generate and verify identity proofs in under a second while maintaining mathematical guarantees of privacy.
              </p>
              <p className="leading-relaxed">
                Today, SonicID represents the convergence of cutting-edge cryptography, blockchain technology, and user-centric design. We're not just building a product—we're establishing a new paradigm for digital trust.
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-lg border border-white/20 text-center">
                <div className="text-4xl mb-4">{member.avatar}</div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">{member.name}</h3>
                <p className="text-blue-600 font-semibold mb-3">{member.role}</p>
                <p className="text-slate-600 text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">Our Journey</h2>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 to-indigo-600 transform md:-translate-x-1/2"></div>
            
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center gap-6 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-white/20">
                      <span className="text-blue-600 font-bold text-sm">{milestone.date}</span>
                      <h3 className="text-xl font-bold text-slate-800 mb-2">{milestone.title}</h3>
                      <p className="text-slate-600">{milestone.description}</p>
                    </div>
                  </div>
                  
                  <div className="w-8 h-8 bg-blue-600 rounded-full border-4 border-white shadow-lg flex-shrink-0 relative z-10"></div>
                  
                  <div className="flex-1 hidden md:block"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Privacy First</h3>
              <p className="text-slate-600">Your data belongs to you. We design every feature with privacy as the foundation, not an afterthought.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.586-3.414l-2.172-2.172a1 1 0 00-.707-.293H12a1 1 0 00-1 1v4.586a1 1 0 00.293.707l5.414 5.414a1 1 0 001.414 0l4.172-4.172a1 1 0 000-1.414z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Transparency</h3>
              <p className="text-slate-600">Open source code, published research, and clear communication about how our technology works.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">User Empowerment</h3>
              <p className="text-slate-600">We build tools that give users control, not convenience that comes at the cost of autonomy.</p>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center bg-gradient-to-br from-blue-50 to-indigo-50 p-12 rounded-2xl border border-blue-200">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Want to Learn More?</h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            We're always happy to discuss our technology, answer questions, or explore potential partnerships.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="/how-it-works"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-bold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Explore the Technology
            </a>
            <a 
              href="mailto:hello@sonicid.com"
              className="text-slate-600 hover:text-slate-800 font-semibold transition-colors"
            >
              Contact Our Team →
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}