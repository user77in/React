import React, { useState, useRef } from 'react';
import { Play, Plus, ChevronLeft, ChevronRight, Star, Calendar, Clock, Search, Bell, User } from 'lucide-react';

const API_KEY = '';
const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

export default function StreamingApp() {
  const [activeCategory, setActiveCategory] = useState('home');
  
  // Sample movie data structure
  const heroMovie = {
    title: "The Last of Us",
    rating: 8.8,
    year: "2023",
    seasons: "Season 1",
    genre: "Drama, Sci-Fi, Thriller",
    description: "Twenty years after a fungal outbreak ravages the planet, survivors Joel and Ellie embark on a brutal journey through a post-apocalyptic America.",
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1200&q=80"
  };

  const categories = [
    {
      title: "Continue Watch Movies",
      movies: Array(6).fill(null).map((_, i) => ({
        id: i,
        title: `Movie ${i + 1}`,
        image: `https://images.unsplash.com/photo-${1574267432951 + i}-4c5c5a8d2a71?w=300&q=80`,
        progress: Math.random() * 100
      }))
    },
    {
      title: "Top 10 Movies To Watch",
      isRanked: true,
      movies: Array(6).fill(null).map((_, i) => ({
        id: i,
        rank: i + 1,
        title: `Top Movie ${i + 1}`,
        image: `https://images.unsplash.com/photo-${1485846234256 + i}-a0b7e3c3a772?w=300&q=80`
      }))
    },
    {
      title: "Only On Streamit",
      movies: Array(6).fill(null).map((_, i) => ({
        id: i,
        title: `Original ${i + 1}`,
        image: `https://images.unsplash.com/photo-${1478720568477 + i}-3e1fca99a83e?w=300&q=80`
      }))
    },
    {
      title: "Fresh Picks Just For You",
      movies: Array(6).fill(null).map((_, i) => ({
        id: i,
        title: `Pick ${i + 1}`,
        image: `https://images.unsplash.com/photo-${1440404653325 + i}-c3ab58bfb0a4?w=300&q=80`
      }))
    },
    {
      title: "Upcoming Movies",
      movies: Array(6).fill(null).map((_, i) => ({
        id: i,
        title: `Coming Soon ${i + 1}`,
        image: `https://images.unsplash.com/photo-${1489599849927 + i}-2a5d07ec80d6?w=300&q=80`,
        releaseDate: "Dec 2024"
      }))
    },
    {
      title: "Popular Movies",
      movies: Array(6).fill(null).map((_, i) => ({
        id: i,
        title: `Popular ${i + 1}`,
        image: `https://images.unsplash.com/photo-${1461151304267 + i}-49e44c4815d1?w=300&q=80`,
        rating: (Math.random() * 2 + 7).toFixed(1)
      }))
    }
  ];

  const MovieRow = ({ category }) => {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
      if (scrollRef.current) {
        const scrollAmount = direction === 'left' ? -600 : 600;
        scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    };

    return (
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4 px-12">
          <h2 className="text-white text-xl font-semibold">{category.title}</h2>
          <button className="text-red-500 hover:text-red-400 text-sm">View All</button>
        </div>
        <div className="relative group px-12">
          <button 
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/80 text-white p-2 rounded-r opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronLeft size={24} />
          </button>
          
          <div ref={scrollRef} className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth">
            {category.movies.map((movie, idx) => (
              <div key={idx} className="flex-shrink-0 relative group/card">
                {category.isRanked && (
                  <div className="absolute -left-4 bottom-0 z-20">
                    <span className="text-8xl font-black text-white" style={{
                      WebkitTextStroke: '2px #000',
                      textShadow: '0 0 20px rgba(0,0,0,0.8)'
                    }}>
                      {movie.rank}
                    </span>
                  </div>
                )}
                <div className="w-48 relative overflow-hidden rounded-lg cursor-pointer transform transition-transform group-hover/card:scale-105">
                  <img 
                    src={movie.image} 
                    alt={movie.title}
                    className="w-full h-72 object-cover"
                  />
                  {movie.progress && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
                      <div 
                        className="h-full bg-red-600"
                        style={{ width: `${movie.progress}%` }}
                      />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity flex items-end p-4">
                    <div className="w-full">
                      <div className="flex gap-2 mb-2">
                        <button className="bg-white text-black p-2 rounded-full hover:bg-gray-200">
                          <Play size={16} fill="black" />
                        </button>
                        <button className="bg-gray-800/80 text-white p-2 rounded-full hover:bg-gray-700">
                          <Plus size={16} />
                        </button>
                      </div>
                      {movie.rating && (
                        <div className="flex items-center gap-1 text-yellow-400 text-sm">
                          <Star size={14} fill="currentColor" />
                          <span>{movie.rating}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <button 
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/80 text-white p-2 rounded-l opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-black min-h-screen text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/90 to-transparent px-12 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="text-red-600 text-3xl font-black">STREAMIT</h1>
            <nav className="flex gap-6">
              {['Home', 'Features', 'Pages', 'Blog', 'Shop'].map(item => (
                <button 
                  key={item}
                  className="text-white hover:text-red-500 transition-colors"
                >
                  {item}
                </button>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-6">
            <Search className="cursor-pointer hover:text-red-500" size={20} />
            <Bell className="cursor-pointer hover:text-red-500" size={20} />
            <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer">
              <User size={20} />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative h-screen">
        <div className="absolute inset-0">
          <img 
            src={heroMovie.image}
            alt={heroMovie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>
        
        <div className="relative h-full flex items-center px-12">
          <div className="max-w-2xl">
            <h2 className="text-6xl font-black mb-4">{heroMovie.title}</h2>
            <div className="flex items-center gap-4 mb-4 text-sm">
              <div className="flex items-center gap-1">
                <Star className="text-yellow-400" size={16} fill="currentColor" />
                <span>{heroMovie.rating}</span>
              </div>
              <span>{heroMovie.year}</span>
              <span>{heroMovie.seasons}</span>
              <span className="px-2 py-1 border border-white/30 rounded text-xs">18+</span>
            </div>
            <div className="text-gray-300 mb-2 text-sm">{heroMovie.genre}</div>
            <p className="text-gray-300 mb-6 leading-relaxed">{heroMovie.description}</p>
            <div className="flex gap-4">
              <button className="bg-red-600 hover:bg-red-700 px-8 py-3 rounded flex items-center gap-2 font-semibold transition-colors">
                <Play size={20} fill="white" />
                Play Now
              </button>
              <button className="bg-white/10 hover:bg-white/20 backdrop-blur px-8 py-3 rounded flex items-center gap-2 font-semibold transition-colors">
                <Plus size={20} />
                My List
              </button>
            </div>
          </div>
        </div>

        {/* Thumbnails */}
        <div className="absolute bottom-8 left-12 flex gap-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="w-32 h-20 rounded overflow-hidden border-2 border-transparent hover:border-red-600 cursor-pointer transition-all">
              <img 
                src={`https://images.unsplash.com/photo-${1574267432951 + i}-4c5c5a8d2a71?w=200&q=80`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Content Sections */}
      <div className="relative z-10 -mt-32 pb-12">
        {categories.map((category, idx) => (
          <MovieRow key={idx} category={category} />
        ))}
      </div>

      {/* Featured Section - Pirates */}
      <div className="relative h-screen mb-12">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=1200&q=80"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
        </div>
        
        <div className="relative h-full flex items-center px-12">
          <div className="max-w-2xl">
            <div className="text-sm text-gray-400 mb-2">All Episodes</div>
            <h2 className="text-6xl font-black mb-4">Pirates Of Day One</h2>
            <div className="flex gap-4 mb-4">
              <span className="flex items-center gap-1">
                <Star className="text-yellow-400" size={16} fill="currentColor" />
                9.2
              </span>
              <span>4hr 22min Today</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Epic adventure on the high seas following a legendary pirate crew as they search for the ultimate treasure. Betrayal, action, and heart-stopping moments await.
            </p>
            <div className="flex gap-4 mb-8">
              <button className="bg-red-600 hover:bg-red-700 px-8 py-3 rounded font-semibold transition-colors">
                Watch Now
              </button>
              <button className="bg-white/10 hover:bg-white/20 backdrop-blur px-8 py-3 rounded font-semibold transition-colors">
                Episodes
              </button>
            </div>
            
            {/* Episode List */}
            <div className="space-y-3">
              {['War of Games', 'When Will Deadpool...', 'Wilson finds', 'Selling Bigs'].map((ep, i) => (
                <div key={i} className="flex items-center gap-4 bg-white/5 backdrop-blur p-3 rounded hover:bg-white/10 cursor-pointer transition-colors">
                  <img 
                    src={`https://images.unsplash.com/photo-${1509347528160 + i}-9a9e33742cdb?w=100&q=80`}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <div className="font-semibold">{ep}</div>
                    <div className="text-sm text-gray-400">Season 1 • Episode {i + 1}</div>
                  </div>
                  <Play size={20} className="text-red-500" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 px-12 py-8">
        <div className="grid grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-red-600 text-2xl font-black mb-4">STREAMIT</h3>
            <p className="text-gray-400 text-sm">Your ultimate streaming destination</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Movies to watch</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Top trending</li>
              <li>Recommended</li>
              <li>Popular</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>About Us</li>
              <li>Contact Us</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Subscribe Newsletter</h4>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email"
                className="flex-1 bg-white/10 border border-gray-700 rounded px-4 py-2 text-sm"
              />
              <button className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded text-sm font-semibold">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        <div className="text-center text-gray-500 text-sm border-t border-gray-800 pt-4">
          © 2024 STREAMIT. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}