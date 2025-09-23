"use client";

import { motion } from "framer-motion";
import { BookOpen, Search, Filter, Download, Star, Heart, Church, User, Info, ArrowLeft, ExternalLink, Play, FileText, Video, Music, Image, Building2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ChristianCataloguePage() {
  const [searchTerm, setSearchTerm] = useState("");
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
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-faith-dark/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
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
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search resources, authors, or topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/20 dark:bg-black/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
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
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                      selectedCategory === category.id
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
                  className={`px-4 py-2 rounded-full transition-all duration-300 ${
                    selectedType === type.id
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