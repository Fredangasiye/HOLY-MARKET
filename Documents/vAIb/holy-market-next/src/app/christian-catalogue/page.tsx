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

  // Add music resources to fill the music category - actual playlists
  const musicResources = [
    {
      name: "Spotify - Top Christian Worship",
      type: "Music & Worship",
      desc: "Top Christian worship songs and playlists on Spotify",
      cost: "Free",
      link: "https://open.spotify.com/playlist/37i9dQZF1DX6J5NfMJS675",
    },
    {
      name: "Spotify - Gospel Music",
      type: "Music & Worship",
      desc: "Best gospel music playlists and songs",
      cost: "Free",
      link: "https://open.spotify.com/playlist/37i9dQZF1DXc8YFRm3W8vL",
    },
    {
      name: "Apple Music - Christian Hits",
      type: "Music & Worship",
      desc: "Top Christian hits and worship music",
      cost: "Free / Paid",
      link: "https://music.apple.com/us/playlist/top-christian-hits/pl.5f8c8c8e8e8e8e8e",
    },
    {
      name: "YouTube Music - Christian Worship",
      type: "Music & Worship",
      desc: "Christian worship music videos and playlists",
      cost: "Free",
      link: "https://music.youtube.com/playlist?list=PLrAXtmErZgOeiT4V5hTiJY4CbWjO6ZqJQ",
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

  // Map resource types to categories
  const mapTypeToCategory = (type: string): string => {
    const typeMap: Record<string, string> = {
      "Bible & Study": "books",
      "Bible & Devotionals": "books",
      "Books & Study": "books",
      "Visual Theology": "videos",
      "Streaming": "videos",
      "Teachings": "videos",
      "Courses": "courses",
      "Education": "courses",
      "Study": "tools",
      "Counselling": "tools",
      "Therapy": "tools",
      "Family": "books",
      "Church": "podcasts",
      "Music & Worship": "music"
    };
    return typeMap[type] || "books";
  };

  // Convert Faith Resources to filterable format
  const convertToResource = (item: any, index: number, source: string) => ({
    id: `${source}-${index}`,
    title: item.name,
    author: item.type,
    category: mapTypeToCategory(item.type),
    type: item.cost === "Free" || item.cost.includes("Free") ? "free" : "premium",
    description: item.desc,
    price: item.cost,
    link: item.link,
    format: item.type,
    language: "English"
  });

  // Combine all resources
  const allResources = [
    ...saResources.map((r, i) => convertToResource(r, i, "sa")),
    ...internationalResources.map((r, i) => convertToResource(r, i, "int")),
    ...musicResources.map((r, i) => convertToResource(r, i, "music"))
  ];

  const groupByType = (items: { type: string }[]) => {
    return items.reduce((acc: Record<string, any[]>, item: any) => {
      acc[item.type] = acc[item.type] ? [...acc[item.type], item] : [item];
      return acc;
    }, {} as Record<string, any[]>);
  };

  const filteredResources = allResources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase());
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
    <main className="bg-gradient-to-br from-faith-blue via-faith-dark to-faith-gold pb-32">
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
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white w-5 h-5 pointer-events-none" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search resources, authors, or topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-full bg-white/10 dark:bg-black/20 backdrop-blur-sm border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
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
              Showing {filteredResources.length} of {allResources.length} resources
            </p>
          </motion.div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-8 pb-32">
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

                    {/* Format and Details */}
                    <div className="text-white/60 text-xs space-y-1">
                      <div>Format: {resource.format}</div>
                      <div>Language: {resource.language}</div>
                    </div>

                    {/* Price and Actions */}
                    <div className="flex items-center justify-between pt-3 border-t border-white/20">
                      <span className="text-lg font-bold text-faith-gold">{resource.price}</span>
                      <div className="flex gap-2">
                        <a
                          href={resource.link?.startsWith('http') ? resource.link : `https://${resource.link}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-emerald-400 text-white font-semibold px-3 py-1 rounded-lg hover:bg-emerald-400/80 transition-colors text-sm"
                        >
                          Visit
                        </a>
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

      {/* Interactive Map of Churches in SA */}
      <section className="py-10 bg-white/10 dark:bg-black/20 backdrop-blur-sm pb-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-display font-bold text-white mb-4 flex items-center justify-center gap-3">
                <Church className="w-8 h-8 text-emerald-400" />
                Churches in South Africa
              </h2>
              <p className="text-white/80 text-lg">Find Christian churches near you</p>
            </div>
            
            <div className="bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="w-full h-[500px] rounded-xl overflow-hidden bg-gradient-to-br from-emerald-400/20 to-faith-blue/20 flex items-center justify-center relative">
                <div className="text-center z-10 p-8">
                  <Church className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-display font-bold text-white mb-2">Find Churches in South Africa</h3>
                  <p className="text-white/80 mb-6">Explore Christian churches across the country</p>
                  <a 
                    href="https://www.google.com/maps/search/churches+in+South+Africa" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-400 text-white rounded-lg hover:bg-emerald-500 transition-colors font-semibold shadow-lg hover:shadow-xl"
                  >
                    <ExternalLink className="w-5 h-5" />
                    Open Google Maps
                  </a>
                </div>
                <div className="absolute inset-0 opacity-10">
                  <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNTAgMTBjLTIyIDAtNDAgMTgtNDAgNDBzMTggNDAgNDAgNDAgNDAtMTggNDAtNDAtMTgtNDAtNDAtNDB6IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSIvPjwvc3ZnPg==')]"></div>
                </div>
              </div>
              <div className="mt-4 text-center">
                <p className="text-white/70 text-sm">
                  Click the button above to search for churches in South Africa on Google Maps. You can filter by location, denomination, and more.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer handled globally by MobileNavigation */}
    </main>
  );
}