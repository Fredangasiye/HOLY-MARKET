"use client";

import { motion } from "framer-motion";
import { Users, MessageCircle, Calendar, Award, Heart, Church, User, Info, BookOpen, ArrowLeft, Plus, Star, Clock, Building2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("events");

  const tabs = [
    { id: "events", name: "Events", icon: Calendar },
    { id: "discussions", name: "Discussions", icon: MessageCircle },
    { id: "mentorship", name: "Mentorship", icon: Award },
    { id: "networking", name: "Networking", icon: Users },
  ];

  const events = [
    {
      id: 1,
      title: "Christian Entrepreneurs Prayer Breakfast",
      date: "2024-02-15",
      time: "7:00 AM - 9:00 AM",
      location: "Nairobi, Kenya",
      description: "Join us for a morning of prayer, fellowship, and business networking over breakfast",
      attendees: 45,
      maxAttendees: 50,
      organizer: "Grace Fellowship Business Network",
      type: "Prayer Meeting"
    },
    {
      id: 2,
      title: "Kingdom Business Workshop",
      date: "2024-02-20",
      time: "2:00 PM - 5:00 PM",
      location: "Mombasa, Kenya",
      description: "Learn how to integrate Christian values into your business practices",
      attendees: 32,
      maxAttendees: 40,
      organizer: "Faithful Business Academy",
      type: "Workshop"
    },
    {
      id: 3,
      title: "Monthly Business Fellowship",
      date: "2024-02-25",
      time: "6:00 PM - 8:00 PM",
      location: "Kisumu, Kenya",
      description: "Monthly gathering for Christian business owners to share experiences and support each other",
      attendees: 28,
      maxAttendees: 35,
      organizer: "Christian Business Alliance",
      type: "Fellowship"
    }
  ];

  const discussions = [
    {
      id: 1,
      title: "How do you maintain integrity in competitive markets?",
      author: "Sarah Mwangi",
      replies: 12,
      views: 89,
      lastActivity: "2 hours ago",
      category: "Business Ethics"
    },
    {
      id: 2,
      title: "Balancing profit and purpose in Christian business",
      author: "David Kimani",
      replies: 8,
      views: 67,
      lastActivity: "4 hours ago",
      category: "Business Strategy"
    },
    {
      id: 3,
      title: "Prayer requests for struggling businesses",
      author: "Pastor John",
      replies: 15,
      views: 124,
      lastActivity: "1 hour ago",
      category: "Prayer Requests"
    }
  ];

  const mentors = [
    {
      id: 1,
      name: "Dr. Grace Wanjiku",
      title: "Business Consultant & Author",
      expertise: "Strategic Planning, Leadership",
      experience: "15+ years",
      rating: 4.9,
      sessions: 156,
      bio: "Helping Christian entrepreneurs build businesses that honor God and serve communities"
    },
    {
      id: 2,
      name: "Pastor Michael Otieno",
      title: "Ministry Leader & Entrepreneur",
      expertise: "Faith Integration, Team Building",
      experience: "12+ years",
      rating: 4.8,
      sessions: 98,
      bio: "Guiding business leaders to integrate biblical principles in their daily operations"
    },
    {
      id: 3,
      name: "Jane Akinyi",
      title: "Marketing Expert & Speaker",
      expertise: "Digital Marketing, Branding",
      experience: "10+ years",
      rating: 4.7,
      sessions: 87,
      bio: "Empowering Christian businesses to reach their target audience with authentic messaging"
    }
  ];

  const networkingGroups = [
    {
      id: 1,
      name: "Young Christian Entrepreneurs",
      members: 156,
      description: "Network for entrepreneurs under 35 building businesses with Christian values",
      focus: "Startups & Innovation"
    },
    {
      id: 2,
      name: "Women in Kingdom Business",
      members: 89,
      description: "Supporting and empowering Christian women in business leadership",
      focus: "Women Leadership"
    },
    {
      id: 3,
      name: "Tech for God's Glory",
      members: 67,
      description: "Christian tech entrepreneurs using technology to serve God's purposes",
      focus: "Technology & Innovation"
    }
  ];

  const renderEvents = () => (
    <div className="space-y-6">
      {events.map((event, index) => (
        <motion.div
          key={event.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-faith-gold/50 transition-all duration-300"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-display font-bold text-white mb-2">{event.title}</h3>
              <p className="text-white/80 mb-3">{event.description}</p>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2 text-white/70">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{event.date}</span>
                </div>
                <div className="flex items-center gap-2 text-white/70">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{event.time}</span>
                </div>
                <div className="flex items-center gap-2 text-white/70">
                  <Church className="w-4 h-4" />
                  <span className="text-sm">{event.location}</span>
                </div>
                <div className="flex items-center gap-2 text-white/70">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">{event.attendees}/{event.maxAttendees} attendees</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-faith-gold/20 text-faith-gold rounded-full text-sm font-medium">
                  {event.type}
                </span>
                <button className="bg-faith-gold text-faith-blue font-semibold px-4 py-2 rounded-lg hover:bg-faith-gold/80 transition-colors">
                  Join Event
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const renderDiscussions = () => (
    <div className="space-y-4">
      {discussions.map((discussion, index) => (
        <motion.div
          key={discussion.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-faith-gold/50 transition-all duration-300 cursor-pointer"
        >
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-lg font-display font-bold text-white flex-1">{discussion.title}</h3>
            <span className="px-2 py-1 bg-faith-gold/20 text-faith-gold rounded-full text-xs font-medium ml-4">
              {discussion.category}
            </span>
          </div>

          <div className="flex items-center gap-4 text-white/70 text-sm mb-3">
            <span>By {discussion.author}</span>
            <span>{discussion.replies} replies</span>
            <span>{discussion.views} views</span>
            <span>{discussion.lastActivity}</span>
          </div>

          <button className="text-faith-gold hover:text-faith-gold/80 transition-colors text-sm font-medium">
            Join Discussion →
          </button>
        </motion.div>
      ))}
    </div>
  );

  const renderMentorship = () => (
    <div className="space-y-6">
      {mentors.map((mentor, index) => (
        <motion.div
          key={mentor.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-faith-gold/50 transition-all duration-300"
        >
          <div className="flex items-start gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-faith-gold/20 to-faith-blue/20 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-faith-gold" />
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xl font-display font-bold text-white">{mentor.name}</h3>
                <div className="flex items-center gap-1 text-faith-gold">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm font-medium">{mentor.rating}</span>
                </div>
              </div>

              <p className="text-faith-gold font-medium mb-2">{mentor.title}</p>
              <p className="text-white/80 mb-3">{mentor.bio}</p>

              <div className="flex items-center gap-4 text-white/70 text-sm mb-4">
                <span>Expertise: {mentor.expertise}</span>
                <span>Experience: {mentor.experience}</span>
                <span>{mentor.sessions} sessions</span>
              </div>

              <button className="bg-faith-gold text-faith-blue font-semibold px-4 py-2 rounded-lg hover:bg-faith-gold/80 transition-colors">
                Request Mentorship
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const renderNetworking = () => (
    <div className="space-y-6">
      {networkingGroups.map((group, index) => (
        <motion.div
          key={group.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-faith-gold/50 transition-all duration-300"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-display font-bold text-white mb-2">{group.name}</h3>
              <p className="text-white/80 mb-3">{group.description}</p>

              <div className="flex items-center gap-4 text-white/70 text-sm mb-4">
                <span>{group.members} members</span>
                <span className="px-2 py-1 bg-faith-gold/20 text-faith-gold rounded-full text-xs font-medium">
                  {group.focus}
                </span>
              </div>

              <button className="bg-faith-gold text-faith-blue font-semibold px-4 py-2 rounded-lg hover:bg-faith-gold/80 transition-colors">
                Join Group
              </button>
            </div>
          </div>
        </motion.div>
      ))}
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
              <Users className="w-8 h-8 text-faith-gold" />
              <h1 className="text-2xl font-display font-bold text-faith-blue dark:text-white">
                Community
              </h1>
            </div>
          </div>

          <button className="bg-faith-gold text-faith-blue font-semibold px-4 py-2 rounded-lg hover:bg-faith-gold/80 transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Create Event
          </button>
        </div>
      </header>

      {/* Tab Navigation */}
      <section className="py-6 bg-white/10 dark:bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${activeTab === tab.id
                    ? "bg-faith-gold text-faith-blue font-semibold"
                    : "bg-white/20 text-white hover:bg-white/30"
                    }`}
                >
                  <IconComponent className="w-4 h-4" />
                  {tab.name}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          {activeTab === "events" && renderEvents()}
          {activeTab === "discussions" && renderDiscussions()}
          {activeTab === "mentorship" && renderMentorship()}
          {activeTab === "networking" && renderNetworking()}
        </div>
      </section>

      {/* Footer handled globally by MobileNavigation */}
    </main>
  );
}