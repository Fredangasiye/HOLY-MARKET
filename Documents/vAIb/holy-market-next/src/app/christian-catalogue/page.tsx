"use client";

import { motion } from "framer-motion";
import { BookOpen, Search, Filter, Download, Star, Heart, Church, User, Info, ArrowLeft, ExternalLink, Play, FileText, Video, Music, Image, Building2 } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";

export default function ChristianCataloguePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

  const categories = [
    { id: "all", name: "All Categories", icon: BookOpen },
    { id: "books", name: "Books & Literature", icon: BookOpen },
    { id: "videos", name: "Videos & Media", icon: Video },
    { id: "music", name: "Music & Worship", icon: Music },
    { id: "podcasts", name: "Podcasts", icon: Play },
    { id: "tools", name: "Business Tools", icon: FileText },
    { id: "courses", name: "Courses & Training", icon: Star },
  ];

  const types = [
    { id: "all", name: "All Types" },
    { id: "free", name: "Free" },
    { id: "premium", name: "Premium" },
    { id: "recommended", name: "Recommended" },
  ];

  const resources = [
    {
      id: 1,
      title: "The Purpose Driven Business",
      author: "Rick Warren",
      category: "books",
      type: "premium",
      description: "A comprehensive guide to building a business that serves God's purposes and creates lasting impact in your community.",
      rating: 4.9,
      reviews: 234,
      price: "$19.99",
      image: "/api/placeholder/300/400",
      tags: ["Business Strategy", "Purpose", "Leadership"],
      format: "E-book",
      language: "English",
      pages: 320,
      published: "2023"
    },
    {
      id: 2,
      title: "Biblical Principles for Entrepreneurs",
      author: "Dr. John Maxwell",
      category: "videos",
      type: "free",
      description: "A video series exploring how biblical wisdom applies to modern business challenges and opportunities.",
      rating: 4.8,
      reviews: 156,
      price: "Free",
      image: "/api/placeholder/300/400",
      tags: ["Biblical Wisdom", "Entrepreneurship", "Values"],
      format: "Video Series",
      language: "English",
      duration: "2.5 hours",
      published: "2023"
    },
    {
      id: 3,
      title: "Kingdom Business Podcast",
      author: "Various Hosts",
      category: "podcasts",
      type: "free",
      description: "Weekly interviews with successful Christian entrepreneurs sharing their journey, challenges, and insights.",
      rating: 4.7,
      reviews: 89,
      price: "Free",
      image: "/api/placeholder/300/400",
      tags: ["Interviews", "Success Stories", "Inspiration"],
      format: "Podcast",
      language: "English",
      episodes: 156,
      published: "2022"
    },
    {
      id: 4,
      title: "Christian Business Plan Template",
      author: "Faithful Business Academy",
      category: "tools",
      type: "premium",
      description: "A comprehensive business plan template designed specifically for Christian entrepreneurs, including mission statement guidance.",
      rating: 4.9,
      reviews: 67,
      price: "$29.99",
      image: "/api/placeholder/300/400",
      tags: ["Business Planning", "Templates", "Strategy"],
      format: "PDF Template",
      language: "English",
      pages: 45,
      published: "2023"
    },
    {
      id: 5,
      title: "Worship Music for Work",
      author: "Various Artists",
      category: "music",
      type: "free",
      description: "Curated playlist of worship music perfect for creating a God-centered work environment.",
      rating: 4.6,
      reviews: 123,
      price: "Free",
      image: "/api/placeholder/300/400",
      tags: ["Worship", "Ambient", "Focus"],
      format: "Playlist",
      language: "English",
      tracks: 25,
      published: "2023"
    },
    {
      id: 6,
      title: "Faith-Based Marketing Course",
      author: "Christian Marketing Institute",
      category: "courses",
      type: "premium",
      description: "Learn how to market your business authentically while staying true to Christian values and principles.",
      rating: 4.8,
      reviews: 98,
      price: "$149.99",
      image: "/api/placeholder/300/400",
      tags: ["Marketing", "Ethics", "Branding"],
      format: "Online Course",
      language: "English",
      modules: 12,
      published: "2023"
    },
    {
      id: 7,
      title: "Daily Devotional for Business Leaders",
      author: "Pastor Sarah Kimani",
      category: "books",
      type: "free",
      description: "365 daily devotions specifically designed for Christian business leaders and entrepreneurs.",
      rating: 4.9,
      reviews: 187,
      price: "Free",
      image: "/api/placeholder/300/400",
      tags: ["Devotional", "Daily Reading", "Leadership"],
      format: "E-book",
      language: "English",
      pages: 365,
      published: "2023"
    },
    {
      id: 8,
      title: "Christian Business Ethics Guide",
      author: "Ethics Institute",
      category: "books",
      type: "recommended",
      description: "A comprehensive guide to navigating ethical dilemmas in business from a Christian perspective.",
      rating: 4.7,
      reviews: 145,
      price: "$24.99",
      image: "/api/placeholder/300/400",
      tags: ["Ethics", "Decision Making", "Values"],
      format: "E-book",
      language: "English",
      pages: 280,
      published: "2022"
    }
  ];

  // External curated resources
  const saResources = [
    {
      name: "BibleSA",
      type: "Bible & Study",
      desc: "Free Bibles in all 11 SA languages, reading plans, and devotionals.",
      cost: "Free",
      link: "https://www.biblesa.co.za",
    },
    {
      name: "Humanitas",
      type: "Counselling",
      desc: "Free online sessions with intern counsellors (Christian-friendly)",
      cost: "Free / Donation",
      link: "https://www.humanitas.co.za",
    },
    {
      name: "Hope House Counselling Centre",
      type: "Counselling",
      desc: "Lay Christian counselling, affordable and confidential",
      cost: "Sliding scale",
      link: "https://www.hopehouse.org.za",
    },
    {
      name: "The Sanctuary SA",
      type: "Therapy",
      desc: "Christian counselling and mentorship",
      cost: "Sliding scale",
      link: "https://www.thesanctuarysa.org",
    },
    {
      name: "Rosebank Union Church",
      type: "Church",
      desc: "Multicultural Joburg church with sermons & podcasts online",
      cost: "Free",
      link: "https://www.rosebankunion.org.za",
    },
    {
      name: "Cornerstone Church Bedfordview",
      type: "Church",
      desc: "Charismatic church with media library & outreach",
      cost: "Free",
      link: "https://cornerstonechurch.co.za",
    },
    {
      name: "Revelation Church",
      type: "Church",
      desc: "Fast-growing church led by Prophet Lovy Elias’ SA branch",
      cost: "Free",
      link: "https://www.revelationchurchjhb.org",
    },
    {
      name: "UNISA Theology Department",
      type: "Education",
      desc: "Online accredited Christian studies & theology degrees",
      cost: "Paid",
      link: "https://www.unisa.ac.za",
    },
  ];

  const internationalResources = [
    {
      name: "YouVersion Bible App",
      type: "Bible & Devotionals",
      desc: "Huge library of Bible versions, audio, and plans",
      cost: "Free",
      link: "https://www.bible.com",
    },
    {
      name: "BibleProject",
      type: "Visual Theology",
      desc: "Animated videos, podcasts, and courses exploring Scripture deeply",
      cost: "Free",
      link: "https://www.bibleproject.com",
    },
    {
      name: "RightNow Media",
      type: "Streaming",
      desc: "\"Netflix of Christian content\" for individuals & churches",
      cost: "Paid (Free via partner churches)",
      link: "https://www.rightnowmedia.org",
    },
    {
      name: "Desiring God",
      type: "Teachings",
      desc: "Solid biblical articles, sermons, and guides by John Piper",
      cost: "Free",
      link: "https://www.desiringgod.org",
    },
    {
      name: "Crossway",
      type: "Books & Study",
      desc: "Premium theology books, devotionals, ESV Bible materials",
      cost: "Paid",
      link: "https://www.crossway.org",
    },
    {
      name: "Alpha International",
      type: "Courses",
      desc: "Global Christian introduction courses for seekers",
      cost: "Free",
      link: "https://www.alpha.org",
    },
    {
      name: "Focus on the Family",
      type: "Family",
      desc: "Marriage, parenting, and youth resources",
      cost: "Free / Paid",
      link: "https://www.focusonthefamily.com",
    },
    {
      name: "Faithlife / Logos Bible Software",
      type: "Study",
      desc: "Digital Bible library and study tools",
      cost: "Paid / Free trial",
      link: "https://www.logos.com",
    },
  ];

  const groupByType = (items: { type: string }[]) => {
    return items.reduce((acc: Record<string, any[]>, item: any) => {
      acc[item.type] = acc[item.type] ? [...acc[item.type], item] : [item];
      return acc;
    }, {} as Record<string, any[]>);
  };

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory;
    const matchesType = selectedType === "all" || resource.type === selectedType;
    return matchesSearch && matchesCategory && matchesType;
  });

  const getTypeIcon = (category: string) => {
    switch (category) {
      case "books": return BookOpen;
      case "videos": return Video;
      case "music": return Music;
      case "podcasts": return Play;
      case "tools": return FileText;
      case "courses": return Star;
      default: return BookOpen;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "free": return "text-green-400";
      case "premium": return "text-faith-gold";
      case "recommended": return "text-blue-400";
      default: return "text-white";
    }
  };

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
              <BookOpen className="w-8 h-8 text-emerald-400" />
              <h1 className="text-2xl font-display font-bold text-faith-blue dark:text-white">
                Christian Catalogue
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white/10 dark:bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            {/* Search Bar */}
            <div className="relative mb-6">
              <button
                type="button"
                aria-label="Search"
                onClick={() => searchInputRef.current?.focus()}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-white/15 hover:bg-white/25 border border-white/20 shadow-sm transition-colors"
              >
                <Search className="text-white w-4 h-4" />
              </button>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search resources, authors, or topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-4 py-4 rounded-full bg-white/10 dark:bg-black/20 backdrop-blur-sm border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-3 mb-4">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${selectedCategory === category.id
                      ? "bg-emerald-400 text-white font-semibold"
                      : "bg-white/20 text-white hover:bg-white/30"
                      }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    {category.name}
                  </button>
                );
              })}
            </div>

            {/* Type Filter */}
            <div className="flex flex-wrap gap-3 mb-6">
              {types.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`px-4 py-2 rounded-full transition-all duration-300 ${selectedType === type.id
                    ? "bg-faith-gold text-faith-blue font-semibold"
                    : "bg-white/20 text-white hover:bg-white/30"
                    }`}
                >
                  {type.name}
                </button>
              ))}
            </div>

            {/* Results Count */}
            <p className="text-white/80 text-center">
              Showing {filteredResources.length} of {resources.length} resources
            </p>
          </motion.div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredResources.map((resource, index) => {
              const TypeIcon = getTypeIcon(resource.category);
              return (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-emerald-400/50 transition-all duration-300 hover:scale-105"
                >
                  {/* Resource Image */}
                  <div className="w-full h-48 bg-gradient-to-br from-emerald-400/20 to-faith-blue/20 rounded-xl mb-4 flex items-center justify-center">
                    <TypeIcon className="w-16 h-16 text-emerald-400" />
                  </div>

                  {/* Resource Info */}
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-display font-bold text-white mb-1 line-clamp-2">{resource.title}</h3>
                        <p className="text-emerald-400 font-medium text-sm">{resource.author}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(resource.type)} bg-white/10`}>
                        {resource.type}
                      </span>
                    </div>

                    <p className="text-white/80 text-sm leading-relaxed line-clamp-3">{resource.description}</p>

                    {/* Rating */}
                    <div className="flex items-center gap-2 text-emerald-400">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm font-medium">{resource.rating}</span>
                      <span className="text-white/60 text-sm">({resource.reviews} reviews)</span>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      {resource.tags.slice(0, 2).map((tag, tagIndex) => (
                        <span key={tagIndex} className="px-2 py-1 bg-white/10 text-white/70 rounded-full text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Format and Details */}
                    <div className="text-white/60 text-xs space-y-1">
                      <div>Format: {resource.format}</div>
                      <div>Language: {resource.language}</div>
                      {resource.pages && <div>Pages: {resource.pages}</div>}
                      {resource.duration && <div>Duration: {resource.duration}</div>}
                      {resource.episodes && <div>Episodes: {resource.episodes}</div>}
                      {resource.tracks && <div>Tracks: {resource.tracks}</div>}
                      {resource.modules && <div>Modules: {resource.modules}</div>}
                    </div>

                    {/* Price and Actions */}
                    <div className="flex items-center justify-between pt-3 border-t border-white/20">
                      <span className="text-lg font-bold text-faith-gold">{resource.price}</span>
                      <div className="flex gap-2">
                        <button className="bg-emerald-400 text-white font-semibold px-3 py-1 rounded-lg hover:bg-emerald-400/80 transition-colors text-sm">
                          {resource.type === "free" ? "Download" : "Purchase"}
                        </button>
                        <button className="bg-white/20 text-white font-semibold px-3 py-1 rounded-lg hover:bg-white/30 transition-colors text-sm">
                          Preview
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {filteredResources.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <BookOpen className="w-16 h-16 text-white/50 mx-auto mb-4" />
              <h3 className="text-xl font-display font-bold text-white mb-2">No resources found</h3>
              <p className="text-white/70">Try adjusting your search or filter criteria</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Faith Resources (External) */}
      <section className="py-10 bg-white/10 dark:bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-white mb-6">Faith Resources</h2>

          {/* South African Resources grouped by type */}
          <div className="mb-10">
            <h3 className="text-lg font-semibold text-white/90 mb-6">🇿🇦 South African Resources</h3>
            {Object.entries(groupByType(saResources)).map(([type, items]) => (
              <div key={type} className="mb-8">
                <h4 className="text-base font-semibold text-white/80 mb-4">{type}</h4>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {(items as any[]).map((r, index) => {
                    const TypeIcon = getTypeIcon("tools");
                    const isFree = r.cost === "Free" || r.cost.includes("Free");
                    return (
                      <motion.div
                        key={r.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-emerald-400/50 transition-all duration-300 hover:scale-105"
                      >
                        {/* Resource Image */}
                        <div className="w-full h-48 bg-gradient-to-br from-emerald-400/20 to-faith-blue/20 rounded-xl mb-4 flex items-center justify-center">
                          <TypeIcon className="w-16 h-16 text-emerald-400" />
                        </div>

                        {/* Resource Info */}
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="text-lg font-display font-bold text-white mb-1 line-clamp-2">{r.name}</h3>
                              <p className="text-emerald-400 font-medium text-sm">{type}</p>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(isFree ? "free" : "premium")} bg-white/10`}>
                              {isFree ? "free" : "premium"}
                            </span>
                          </div>

                          <p className="text-white/80 text-sm leading-relaxed line-clamp-3">{r.desc}</p>

                          {/* Format and Details */}
                          <div className="text-white/60 text-xs space-y-1">
                            <div>Format: {type}</div>
                            <div>Language: English</div>
                          </div>

                          {/* Price and Actions */}
                          <div className="flex items-center justify-between pt-3 border-t border-white/20">
                            <span className="text-lg font-bold text-faith-gold">{r.cost}</span>
                            <div className="flex gap-2">
                              <a
                                href={r.link.startsWith('http') ? r.link : `https://${r.link}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-emerald-400 text-white font-semibold px-3 py-1 rounded-lg hover:bg-emerald-400/80 transition-colors text-sm"
                              >
                                {isFree ? "Visit" : "Visit"}
                              </a>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* International Resources grouped by type */}
          <div>
            <h3 className="text-lg font-semibold text-white/90 mb-6">🌐 International Resources</h3>
            {Object.entries(groupByType(internationalResources)).map(([type, items]) => (
              <div key={type} className="mb-8">
                <h4 className="text-base font-semibold text-white/80 mb-4">{type}</h4>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {(items as any[]).map((r, index) => {
                    const TypeIcon = getTypeIcon("tools");
                    const isFree = r.cost === "Free" || r.cost.includes("Free");
                    return (
                      <motion.div
                        key={r.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-emerald-400/50 transition-all duration-300 hover:scale-105"
                      >
                        {/* Resource Image */}
                        <div className="w-full h-48 bg-gradient-to-br from-emerald-400/20 to-faith-blue/20 rounded-xl mb-4 flex items-center justify-center">
                          <TypeIcon className="w-16 h-16 text-emerald-400" />
                        </div>

                        {/* Resource Info */}
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="text-lg font-display font-bold text-white mb-1 line-clamp-2">{r.name}</h3>
                              <p className="text-emerald-400 font-medium text-sm">{type}</p>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(isFree ? "free" : "premium")} bg-white/10`}>
                              {isFree ? "free" : "premium"}
                            </span>
                          </div>

                          <p className="text-white/80 text-sm leading-relaxed line-clamp-3">{r.desc}</p>

                          {/* Format and Details */}
                          <div className="text-white/60 text-xs space-y-1">
                            <div>Format: {type}</div>
                            <div>Language: English</div>
                          </div>

                          {/* Price and Actions */}
                          <div className="flex items-center justify-between pt-3 border-t border-white/20">
                            <span className="text-lg font-bold text-faith-gold">{r.cost}</span>
                            <div className="flex gap-2">
                              <a
                                href={r.link.startsWith('http') ? r.link : `https://${r.link}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-emerald-400 text-white font-semibold px-3 py-1 rounded-lg hover:bg-emerald-400/80 transition-colors text-sm"
                              >
                                {isFree ? "Visit" : "Visit"}
                              </a>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Google Maps Embed (replace YOUR_API_KEY before enabling) */}
          {/* <div className="mt-12">
            <h3 className="text-xl font-bold mb-4 text-white">Churches in Johannesburg</h3>
            <iframe
              width="100%"
              height="500"
              style={{ border: 0, borderRadius: "12px" }}
              loading="lazy"
              allowFullScreen
              src="https://www.google.com/maps/embed/v1/search?key=YOUR_API_KEY&q=churches+in+Johannesburg+South+Africa"
            />
          </div> */}
        </div>
      </section>

      {/* Footer handled globally by MobileNavigation */}
    </main>
  );
}