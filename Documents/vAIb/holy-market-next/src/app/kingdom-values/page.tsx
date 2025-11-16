"use client";

import { motion } from "framer-motion";
import { Heart, Shield, Scale, Users, BookOpen, Church, User, Info, ArrowLeft, Star, Quote, CheckCircle, Building2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function KingdomValuesPage() {
  const [activeSection, setActiveSection] = useState("principles");

  const sections = [
    { id: "principles", name: "Core Principles", icon: Heart },
    { id: "ethics", name: "Business Ethics", icon: Shield },
    { id: "leadership", name: "Leadership", icon: Users },
    { id: "scriptures", name: "Scriptures", icon: BookOpen },
  ];

  const corePrinciples = [
    {
      title: "Integrity",
      description: "Conducting business with honesty, transparency, and moral uprightness in all dealings",
      verse: "Proverbs 11:3",
      text: "The integrity of the upright guides them, but the unfaithful are destroyed by their duplicity.",
      icon: Shield,
      color: "text-blue-400"
    },
    {
      title: "Stewardship",
      description: "Managing God's resources responsibly and using them to serve His purposes",
      verse: "1 Peter 4:10",
      text: "Each of you should use whatever gift you have received to serve others, as faithful stewards of God's grace.",
      icon: Heart,
      color: "text-red-400"
    },
    {
      title: "Service",
      description: "Putting others' needs before profit and serving customers with excellence",
      verse: "Mark 10:45",
      text: "For even the Son of Man did not come to be served, but to serve, and to give his life as a ransom for many.",
      icon: Users,
      color: "text-green-400"
    },
    {
      title: "Excellence",
      description: "Striving for the highest quality in all work, honoring God through our efforts",
      verse: "Colossians 3:23",
      text: "Whatever you do, work at it with all your heart, as working for the Lord, not for human masters.",
      icon: Star,
      color: "text-yellow-400"
    }
  ];

  const businessEthics = [
    {
      principle: "Honest Pricing",
      description: "Fair pricing that reflects true value without exploitation",
      application: "Set prices based on fair market value and cost, avoiding price gouging or deceptive practices"
    },
    {
      principle: "Truthful Marketing",
      description: "Marketing that accurately represents products and services",
      application: "Use honest advertising that builds trust and provides real value to customers"
    },
    {
      principle: "Fair Treatment",
      description: "Treating employees, customers, and partners with dignity and respect",
      application: "Implement fair wages, safe working conditions, and respectful communication"
    },
    {
      principle: "Environmental Responsibility",
      description: "Caring for God's creation through sustainable business practices",
      application: "Minimize waste, use sustainable resources, and consider environmental impact in decisions"
    }
  ];

  const leadershipValues = [
    {
      title: "Servant Leadership",
      description: "Leading by serving others and putting their needs first",
      characteristics: ["Humility", "Empathy", "Selflessness", "Mentorship"],
      verse: "Matthew 20:26-27",
      text: "Whoever wants to become great among you must be your servant, and whoever wants to be first must be your slave."
    },
    {
      title: "Visionary Leadership",
      description: "Leading with God-given vision and purpose",
      characteristics: ["Clear Vision", "Strategic Thinking", "Inspiration", "Faith"],
      verse: "Proverbs 29:18",
      text: "Where there is no revelation, people cast off restraint; but blessed is the one who heeds wisdom's instruction."
    },
    {
      title: "Transformational Leadership",
      description: "Leading change that positively impacts people and communities",
      characteristics: ["Change Management", "Empowerment", "Innovation", "Impact"],
      verse: "Romans 12:2",
      text: "Do not conform to the pattern of this world, but be transformed by the renewing of your mind."
    }
  ];

  const scriptures = [
    {
      category: "Business Ethics",
      verses: [
        {
          reference: "Proverbs 16:11",
          text: "Honest scales and balances belong to the Lord; all the weights in the bag are of his making."
        },
        {
          reference: "Leviticus 19:35-36",
          text: "Do not use dishonest standards when measuring length, weight or quantity. Use honest scales and honest weights."
        }
      ]
    },
    {
      category: "Work & Excellence",
      verses: [
        {
          reference: "Ecclesiastes 9:10",
          text: "Whatever your hand finds to do, do it with all your might."
        },
        {
          reference: "Proverbs 22:29",
          text: "Do you see someone skilled in their work? They will serve before kings; they will not serve before officials of low rank."
        }
      ]
    },
    {
      category: "Stewardship",
      verses: [
        {
          reference: "Luke 16:10",
          text: "Whoever can be trusted with very little can also be trusted with much, and whoever is dishonest with very little will also be dishonest with much."
        },
        {
          reference: "1 Corinthians 4:2",
          text: "Now it is required that those who have been given a trust must prove faithful."
        }
      ]
    }
  ];

  const renderPrinciples = () => (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-display font-bold text-white mb-4">Core Kingdom Principles</h2>
        <p className="text-white/80 text-lg max-w-3xl mx-auto">
          These foundational principles guide Christian entrepreneurs in building businesses that honor God and serve His kingdom.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        {corePrinciples.map((principle, index) => {
          const IconComponent = principle.icon;
          return (
            <motion.div
              key={principle.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-faith-gold/50 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-16 h-16 bg-gradient-to-br from-faith-gold/20 to-faith-blue/20 rounded-full flex items-center justify-center`}>
                  <IconComponent className={`w-8 h-8 ${principle.color}`} />
                </div>
                <div>
                  <h3 className="text-2xl font-display font-bold text-white">{principle.title}</h3>
                  <p className="text-faith-gold font-medium">{principle.verse}</p>
                </div>
              </div>

              <p className="text-white/80 mb-6 leading-relaxed">{principle.description}</p>

              <div className="bg-white/5 rounded-lg p-4 border-l-4 border-faith-gold">
                <Quote className="w-6 h-6 text-faith-gold mb-2" />
                <p className="text-white/90 italic">"{principle.text}"</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );

  const renderEthics = () => (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-display font-bold text-white mb-4">Business Ethics</h2>
        <p className="text-white/80 text-lg max-w-3xl mx-auto">
          Practical guidelines for maintaining ethical standards in business operations and decision-making.
        </p>
      </motion.div>

      <div className="space-y-6">
        {businessEthics.map((ethic, index) => (
          <motion.div
            key={ethic.principle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-faith-gold/50 transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-faith-gold mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-xl font-display font-bold text-white mb-2">{ethic.principle}</h3>
                <p className="text-white/80 mb-3">{ethic.description}</p>
                <div className="bg-white/5 rounded-lg p-4">
                  <p className="text-white/90 text-sm">
                    <span className="font-semibold text-faith-gold">Application:</span> {ethic.application}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderLeadership = () => (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-display font-bold text-white mb-4">Christian Leadership</h2>
        <p className="text-white/80 text-lg max-w-3xl mx-auto">
          Leadership principles rooted in biblical wisdom and Christ-like character.
        </p>
      </motion.div>

      <div className="space-y-8">
        {leadershipValues.map((leadership, index) => (
          <motion.div
            key={leadership.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-faith-gold/50 transition-all duration-300"
          >
            <h3 className="text-2xl font-display font-bold text-white mb-4">{leadership.title}</h3>
            <p className="text-white/80 mb-6 text-lg">{leadership.description}</p>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-faith-gold mb-3">Key Characteristics:</h4>
                <ul className="space-y-2">
                  {leadership.characteristics.map((char, charIndex) => (
                    <li key={charIndex} className="flex items-center gap-2 text-white/80">
                      <CheckCircle className="w-4 h-4 text-faith-gold" />
                      {char}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white/5 rounded-lg p-4 border-l-4 border-faith-gold">
                <p className="text-faith-gold font-medium mb-2">{leadership.verse}</p>
                <p className="text-white/90 italic">"{leadership.text}"</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderScriptures = () => (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-display font-bold text-white mb-4">Biblical Scriptures</h2>
        <p className="text-white/80 text-lg max-w-3xl mx-auto">
          Scripture passages that provide guidance for Christian business practices and decision-making.
        </p>
      </motion.div>

      <div className="space-y-8">
        {scriptures.map((category, index) => (
          <motion.div
            key={category.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-faith-gold/50 transition-all duration-300"
          >
            <h3 className="text-2xl font-display font-bold text-white mb-6">{category.category}</h3>

            <div className="space-y-6">
              {category.verses.map((verse, verseIndex) => (
                <div key={verseIndex} className="bg-white/5 rounded-lg p-6 border-l-4 border-faith-gold">
                  <p className="text-faith-gold font-semibold mb-3">{verse.reference}</p>
                  <p className="text-white/90 text-lg leading-relaxed">"{verse.text}"</p>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-faith-blue via-faith-dark to-faith-gold">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-purple-600/80 dark:bg-purple-700/80 backdrop-blur-md border-b border-purple-500 dark:border-purple-600">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <ArrowLeft className="w-6 h-6 text-faith-blue dark:text-white" />
            </Link>
            <div className="flex items-center space-x-2">
              <Heart className="w-8 h-8 text-faith-gold" />
              <h1 className="text-2xl font-display font-bold text-faith-blue dark:text-white">
                Kingdom Values
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Section Navigation */}
      <section className="py-6 bg-white/10 dark:bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {sections.map((section) => {
              const IconComponent = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${activeSection === section.id
                      ? "bg-faith-gold text-faith-blue font-semibold"
                      : "bg-white/20 text-white hover:bg-white/30"
                    }`}
                >
                  <IconComponent className="w-4 h-4" />
                  {section.name}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          {activeSection === "principles" && renderPrinciples()}
          {activeSection === "ethics" && renderEthics()}
          {activeSection === "leadership" && renderLeadership()}
          {activeSection === "scriptures" && renderScriptures()}
        </div>
      </section>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-white/10">
        <div className="flex justify-around items-center py-3">
          <Link href="/" className="flex flex-col items-center gap-1">
            <div className="w-6 h-6 flex items-center justify-center">
              <Church size={20} className="text-white" />
            </div>
            <span className="text-xs text-white font-medium">Home</span>
          </Link>

          <Link href="/dashboard" className="flex flex-col items-center gap-1">
            <div className="w-6 h-6 flex items-center justify-center">
              <Building2 size={20} className="text-white" />
            </div>
            <span className="text-xs text-white font-medium">Dashboard</span>
          </Link>

          <Link href="/about" className="flex flex-col items-center gap-1">
            <div className="w-6 h-6 flex items-center justify-center">
              <Info size={20} className="text-white" />
            </div>
            <span className="text-xs text-white font-medium">About</span>
          </Link>

          <Link href="/christian-businesses" className="flex flex-col items-center gap-1">
            <div className="w-6 h-6 flex items-center justify-center">
              <User size={20} className="text-white" />
            </div>
            <span className="text-xs text-white font-medium">Browse Christian Businesses</span>
          </Link>

          <Link href="/christian-catalogue" className="flex flex-col items-center gap-1">
            <div className="w-6 h-6 flex items-center justify-center">
              <BookOpen size={20} className="text-green-400" />
            </div>
            <span className="text-xs text-green-400 font-medium">Catalogue</span>
          </Link>
        </div>
      </nav>
    </main>
  );
}