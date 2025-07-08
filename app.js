const { useState, useEffect, useRef } = React;
const { 
    Play, Pause, SkipBack, SkipForward, Volume2, Search, 
    Home, Music, Radio, Library, Heart, MoreHorizontal, 
    Shuffle, Repeat, Menu, X, Download, Share2, Plus,
    Clock, TrendingUp, Star, User
} = lucide;

const EchoVibeApp = () => {
    const [currentPage, setCurrentPage] = useState('discover');
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrack, setCurrentTrack] = useState(null);
    const [queue, setQueue] = useState([]);
    const [volume, setVolume] = useState(50);
    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [likedSongs, setLikedSongs] = useState(new Set());
    const [playlists, setPlaylists] = useState([]);
    const [recentlyPlayed, setRecentlyPlayed] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [user, setUser] = useState({ name: 'Music Lover', avatar: '🎵' });
    
    const audioRef = useRef(null);
    const progressRef = useRef(null);

    // Enhanced featured playlists with more variety
    const featuredPlaylists = [
        { 
            id: 1, 
            name: "Today's Top Hits", 
            description: "The biggest songs right now", 
            tracks: 50,
            color: "from-purple-600 to-pink-600",
            genre: "Pop"
        },
        { 
            id: 2, 
            name: "Chill Vibes", 
            description: "Relax and unwind", 
            tracks: 30,
            color: "from-blue-600 to-cyan-600",
            genre: "Chill"
        },
        { 
            id: 3, 
            name: "Workout Mix", 
            description: "High energy tracks", 
            tracks: 40,
            color: "from-red-600 to-orange-600",
            genre: "Electronic"
        },
        { 
            id: 4, 
            name: "Indie Discoveries", 
            description: "Fresh indie music", 
            tracks: 25,
            color: "from-green-600 to-teal-600",
            genre: "Indie"
        },
        { 
            id: 5, 
            name: "Hip Hop Classics", 
            description: "Legendary hip hop tracks", 
            tracks: 35,
            color: "from-yellow-600 to-red-600",
            genre: "Hip Hop"
        },
        { 
            id: 6, 
            name: "Rock Anthems", 
            description: "Epic rock songs", 
            tracks: 42,
            color: "from-gray-600 to-gray-800",
            genre: "Rock"
        }
    ];

    // Enhanced trending tracks with more metadata
    const trendingTracks = [
        { 
            id: 1, 
            title: "Blinding Lights", 
            artist: "The Weeknd", 
            duration: "3:20", 
            plays: "1.2B",
            genre: "Pop",
            year: "2019",
            thumbnail: "https://via.placeholder.com/60x60/8B5CF6/FFFFFF?text=BL"
        },
        { 
            id: 2, 
            title: "Levitating", 
            artist: "Dua Lipa", 
            duration: "3:23", 
            plays: "800M",
            genre: "Pop",
            year: "2020",
            thumbnail: "https://via.placeholder.com/60x60/EC4899/FFFFFF?text=LV"
        },
        { 
            id: 3, 
            title: "Good 4 U", 
            artist: "Olivia Rodrigo", 
            duration: "2:58", 
            plays: "600M",
            genre: "Pop Rock",
            year: "2021",
            thumbnail: "https://via.placeholder.com/60x60/10B981/FFFFFF?text=G4"
        },
        { 
            id: 4, 
            title: "Stay", 
            artist: "The Kid LAROI & Justin Bieber", 
            duration: "2:21", 
            plays: "900M",
            genre: "Pop",
            year: "2021",
            thumbnail: "https://via.placeholder.com/60x60/F59E0B/FFFFFF?text=ST"
        },
        { 
            id: 5, 
            title: "Heat Waves", 
            artist: "Glass Animals", 
            duration: "3:58", 
            plays: "1.5B",
            genre: "Indie Pop",
            year: "2020",
            thumbnail: "https://via.placeholder.com/60x60/EF4444/FFFFFF?text=HW"
        },
        { 
            id: 6, 
            title: "As It Was", 
            artist: "Harry Styles", 
            duration: "2:47", 
            plays: "1.1B",
            genre: "Pop",
            year: "2022",
            thumbnail: "https://via.placeholder.com/60x60/8B5CF6/FFFFFF?text=AI"
        },
        { 
            id: 7, 
            title: "Anti-Hero", 
            artist: "Taylor Swift", 
            duration: "3:20", 
            plays: "950M",
            genre: "Pop",
            year: "2022",
            thumbnail: "https://via.placeholder.com/60x60/EC4899/FFFFFF?text=AH"
        },
        { 
            id: 8, 
            title: "Unholy", 
            artist: "Sam Smith ft. Kim Petras", 
            duration: "2:36", 
            plays: "780M",
            genre: "Pop",
            year: "2022",
            thumbnail: "https://via.placeholder.com/60x60/10B981/FFFFFF?text=UH"
        }
    ];

    // Enhanced YouTube API simulation with better search results
    const searchYouTube = async (query) => {
        setIsLoading(true);
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1200));
        
        const mockResults = [
            { 
                id: Date.now() + 1, 
                title: `${query} - Official Music Video`, 
                artist: "Artist Official", 
                duration: "3:45", 
                thumbnail: `https://via.placeholder.com/60x60/8B5CF6/FFFFFF?text=${query.charAt(0).toUpperCase()}`,
                views: "10M views",
                genre: "Pop"
            },
            { 
                id: Date.now() + 2, 
                title: `${query} (Lyrics Video)`, 
                artist: "Lyrics Channel", 
                duration: "3:12", 
                thumbnail: `https://via.placeholder.com/60x60/EC4899/FFFFFF?text=L`,
                views: "5M views",
                genre: "Pop"
            },
            { 
                id: Date.now() + 3, 
                title: `${query} - Live Performance`, 
                artist: "Live Sessions", 
                duration: "4:30", 
                thumbnail: `https://via.placeholder.com/60x60/10B981/FFFFFF?text=🎤`,
                views: "2M views",
                genre: "Live"
            },
            { 
                id: Date.now() + 4, 
                title: `${query} - Acoustic Version`, 
                artist: "Acoustic Covers", 
                duration: "3:30", 
                thumbnail: `https://via.placeholder.com/60x60/F59E0B/FFFFFF?text=🎸`,
                views: "1M views",
                genre: "Acoustic"
            },
            { 
                id: Date.now() + 5, 
                title: `${query} - Remix`, 
                artist: "DJ Remix", 
                duration: "4:15", 
                thumbnail: `https://via.placeholder.com/60x60/EF4444/FFFFFF?text=🎧`,
                views: "800K views",
                genre: "Electronic"
            }
        ];
        
        setSearchResults(mockResults);
        setIsLoading(false);
    };

    const playTrack = (track) => {
        setCurrentTrack(track);
        setIsPlaying(true);
        setQueue(prev => [track, ...prev.filter(t => t.id !== track.id)]);
        
        // Add to recently played
        setRecentlyPlayed(prev => [track, ...prev.filter(t => t.id !== track.id)].slice(0, 10));
        
        // Reset progress
        setProgress(0);
        
        // Simulate audio playback
        if (audioRef.current) {
            audioRef.current.play().catch(() => {
                // Handle audio play errors
                console.log('Audio play prevented by browser');
            });
        }
    };

    const togglePlayPause = () => {
        setIsPlaying(!isPlaying);
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch(() => {
                    console.log('Audio play prevented by browser');
                });
            }
        }
    };

    const toggleLike = (track) => {
        setLikedSongs(prev => {
            const newSet = new Set(prev);
            if (newSet.has(track.id)) {
                newSet.delete(track.id);
            } else {
                newSet.add(track.id);
            }
            // Save to localStorage
            localStorage.setItem('echovibe-liked-songs', JSON.stringify([...newSet]));
            return newSet;
        });
    };

    const skipTrack = (direction) => {
        const currentIndex = queue.findIndex(track => track.id === currentTrack?.id);
        let nextIndex;
        
        if (direction === 'next') {
            nextIndex = currentIndex + 1;
        } else {
            nextIndex = currentIndex - 1;
        }
        
        if (nextIndex >= 0 && nextIndex < queue.length) {
            playTrack(queue[nextIndex]);
        } else if (direction === 'next' && trendingTracks.length > 0) {
            // Auto-play from trending if queue ends
            const randomTrack = trendingTracks[Math.floor(Math.random() * trendingTracks.length)];
            playTrack(randomTrack);
        }
    };

    // Load saved data on mount
    useEffect(() => {
        const savedLikedSongs = localStorage.getItem('echovibe-liked-songs');
        if (savedLikedSongs) {
            setLikedSongs(new Set(JSON.parse(savedLikedSongs)));
        }
        
        const savedRecentlyPlayed = localStorage.getItem('echovibe-recently-played');
        if (savedRecentlyPlayed) {
            setRecentlyPlayed(JSON.parse(savedRecentlyPlayed));
        }
    }, []);

    // Save recently played
    useEffect(() => {
        localStorage.setItem('echovibe-recently-played', JSON.stringify(recentlyPlayed));
    }, [recentlyPlayed]);

    // Simulate progress
    useEffect(() => {
        let interval;
        if (isPlaying && currentTrack) {
            interval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 100) {
                        skipTrack('next');
                        return 0;
                    }
                    return prev + 0.5;
                });
            }, 300);
        }
        return () => clearInterval(interval);
    }, [isPlaying, currentTrack]);

    const handleSearch = () => {
        if (searchTerm.trim()) {
            searchYouTube(searchTerm);
            setCurrentPage('search');
            setSidebarOpen(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const MusicVisualizerBars = () => (
        <div className="flex items-center space-x-1">
            <div className="music-bar"></div>
            <div className="music-bar"></div>
            <div className="music-bar"></div>
            <div className="music-bar"></div>
            <div className="music-bar"></div>
        </div>
    );

    const Navigation = () => (
        <nav className={`fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-gray-900 to-black text-white p-6 overflow-y-auto z-20 transform transition-transform duration-300 sidebar ${sidebarOpen ? 'open' : ''} md:translate-x-0`}>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        EchoVibe
                    </h1>
                    <p className="text-gray-400 text-sm">Stream Your World</p>
                </div>
                <button 
                    onClick={() => setSidebarOpen(false)}
                    className="md:hidden p-2 hover:bg-gray-800 rounded-lg"
                >
                    <X size={20} />
                </button>
            </div>
            
            <div className="space-y-2">
                <button
                    onClick={() => { setCurrentPage('discover'); setSidebarOpen(false); }}
                    className={`flex items-center space-x-3 w-full p-3 rounded-lg transition-all ${
                        currentPage === 'discover' ? 'bg-purple-600 shadow-lg' : 'hover:bg-gray-800'
                    }`}
                >
                    <Home size={20} />
                    <span>Discover</span>
                </button>
                
                <button
                    onClick={() => { setCurrentPage('trending'); setSidebarOpen(false); }}
                    className={`flex items-center space-x-3 w-full p-3 rounded-lg transition-all ${
                        currentPage === 'trending' ? 'bg-purple-600 shadow-lg' : 'hover:bg-gray-800'
                    }`}
                >
                    <TrendingUp size={20} />
                    <span>Trending</span>
                </button>
                
                <button
                    onClick={() => { setCurrentPage('library'); setSidebarOpen(false); }}
                    className={`flex items-center space-x-3 w-full p-3 rounded-lg transition-all ${
                        currentPage === 'library' ? 'bg-purple-600 shadow-lg' : 'hover:bg-gray-800'
                    }`}
                >
                    <Library size={20} />
                    <span>Your Library</span>
                </button>
                
                <button
                    onClick={() => { setCurrentPage('radio'); setSidebarOpen(false); }}
                    className={`flex items-center space-x-3 w-full p-3 rounded-lg transition-all ${
                        currentPage === 'radio' ? 'bg-purple-600 shadow-lg' : 'hover:bg-gray-800'
                    }`}
                >
                    <Radio size={20} />
                    <span>Radio</span>
                </button>
            </div>
            
            <div className="mt-8">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-gray-400 text-sm font-semibold">PLAYLISTS</h3>
                    <button className="p-1 hover:bg-gray-800 rounded">
                        <Plus size={16} className="text-gray-400" />
                    </button>
                </div>
                <div className="space-y-2">
                    {featuredPlaylists.slice(0, 4).map(playlist => (
                        <button
                            key={playlist.id}
                            className="block w-full text-left p-2 rounded hover:bg-gray-800 transition-colors"
                            onClick={() => setSidebarOpen(false)}
                        >
                            <div className="font-medium text-sm">{playlist.name}</div>
                            <div className="text-gray-400 text-xs">{playlist.tracks} tracks</div>
                        </button>
                    ))}
                </div>
            </div>
            
            {/* User Profile */}
            <div className="mt-8 pt-4 border-t border-gray-800">
                <div className="flex items-center space-x-3 p-2 hover:bg-gray-800 rounded-lg cursor-pointer">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-sm">
                        {user.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">{user.name}</div>
                        <div className="text-xs text-gray-400">Free Plan</div>
                    </div>
                </div>
            </div>
        </nav>
    );

    const Header = () => (
        <header className="fixed top-0 right-0 left-0 md:left-64 bg-gradient-to-r from-gray-900/95 to-black/95 backdrop-blur-sm text-white p-4 z-10">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <button 
                        onClick={() => setSidebarOpen(true)}
                        className="md:hidden p-2 hover:bg-gray-800 rounded-lg"
                    >
                        <Menu size={20} />
                    </button>
                    
                    <div className="flex-1 max-w-md">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search songs, artists, or albums..."
                                className="w-full pl-10 pr-4 py-2 bg-gray-800/80 backdrop-blur-sm rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-gray-800"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyPress={handleKeyPress}
                            />
                        </div>
                    </div>
                </div>
                
                <div className="flex items-center space-x-2">
                    <button 
                        onClick={handleSearch}
                        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-full transition-colors text-sm font-medium"
                    >
                        Search
                    </button>
                    <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
                        <MoreHorizontal size={20} />
                    </button>
                </div>
            </div>
        </header>
    );

    const TrackItem = ({ track, showArtist = true, onPlay, showIndex = false, index }) => (
        <div className="flex items-center space-x-4 p-3 hover:bg-gray-800/50 rounded-lg transition-all duration-200 group">
            {showIndex && (
                <div className="w-6 text-center text-gray-400 text-sm">
                    {currentTrack?.id === track.id && isPlaying ? (
                        <MusicVisualizerBars />
                    ) : (
                        index
                    )}
                </div>
            )}
            
            <div className="relative">
                <img 
                    src={track.thumbnail || `https://via.placeholder.com/48x48/8B5CF6/FFFFFF?text=♪`} 
                    alt={track.title}
                    className="w-12 h-12 rounded object-cover shadow-md"
                />
                <button
                    onClick={() => onPlay(track)}
                    className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded"
                >
                    {current
