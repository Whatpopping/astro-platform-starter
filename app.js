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
                    {currentTrack?.id === track.id && isPlaying ? (
                        <Pause size={16} className="text-white" />
                    ) : (
                        <Play size={16} className="text-white" />
                    )}
                </button>
            </div>
            
            <div className="flex-1 min-w-0">
                <div className="font-medium truncate">{track.title}</div>
                {showArtist && (
                    <div className="text-gray-400 text-sm truncate">
                        {track.artist}
                        {track.views && (
                            <span className="ml-2">• {track.views}</span>
                        )}
                    </div>
                )}
            </div>
            
            <div className="text-gray-400 text-sm">{track.duration}</div>
            
            <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                    onClick={() => toggleLike(track)}
                    className={`p-1 rounded transition-colors ${
                        likedSongs.has(track.id) ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
                    }`}
                >
                    <Heart size={16} fill={likedSongs.has(track.id) ? 'currentColor' : 'none'} />
                </button>
                <button className="p-1 text-gray-400 hover:text-white rounded transition-colors">
                    <MoreHorizontal size={16} />
                </button>
            </div>
        </div>
    );

    const PlaylistCard = ({ playlist, onClick }) => (
        <div 
            onClick={onClick}
            className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl hover:bg-gray-700/50 transition-all duration-300 cursor-pointer group transform hover:scale-105 shadow-lg"
        >
            <div className={`w-full h-32 bg-gradient-to-br ${playlist.color} rounded-lg mb-4 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow`}>
                <Music size={32} className="text-white" />
            </div>
            <h3 className="font-semibold mb-1 group-hover:text-purple-300 transition-colors">{playlist.name}</h3>
            <p className="text-gray-400 text-sm">{playlist.description}</p>
            <p className="text-gray-500 text-xs mt-1">{playlist.tracks} tracks</p>
        </div>
    );

    const DiscoverPage = () => (
        <div className="space-y-8">
            {/* Hero Section */}
            <section className="relative">
                <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-2xl p-8 text-white">
                    <div className="max-w-2xl">
                        <h1 className="text-4xl font-bold mb-4">Discover Your Sound</h1>
                        <p className="text-lg opacity-90 mb-6">
                            Explore millions of songs, create playlists, and find your new favorite tracks.
                        </p>
                        <button 
                            onClick={() => setCurrentPage('trending')}
                            className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-full hover:bg-gray-100 transition-colors"
                        >
                            Explore Trending
                        </button>
                    </div>
                </div>
            </section>
            
            <section>
                <h2 className="text-2xl font-bold mb-6">Featured Playlists</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {featuredPlaylists.map(playlist => (
                        <PlaylistCard 
                            key={playlist.id} 
                            playlist={playlist}
                            onClick={() => console.log('Open playlist:', playlist.name)}
                        />
                    ))}
                </div>
            </section>
            
            <section>
                <h2 className="text-2xl font-bold mb-6">Quick Picks</h2>
                <div className="space-y-2">
                    {trendingTracks.slice(0, 3).map((track, index) => (
                        <TrackItem 
                            key={track.id} 
                            track={track} 
                            onPlay={playTrack}
                            showIndex={true}
                            index={index + 1}
                        />
                    ))}
                </div>
            </section>
            
            {recentlyPlayed.length > 0 && (
                <section>
                    <h2 className="text-2xl font-bold mb-6">Recently Played</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {recentlyPlayed.slice(0, 6).map(track => (
                            <div 
                                key={`recent-${track.id}`}
                                onClick={() => playTrack(track)}
                                className="bg-gray-800/30 p-4 rounded-lg hover:bg-gray-700/50 transition-all cursor-pointer group"
                            >
                                <img 
                                    src={track.thumbnail} 
                                    alt={track.title}
                                    className="w-full aspect-square rounded-lg mb-3 group-hover:shadow-lg transition-shadow"
                                />
                                <h4 className="font-medium text-sm truncate">{track.title}</h4>
                                <p className="text-gray-400 text-xs truncate">{track.artist}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );

    const TrendingPage = () => (
        <div className="space-y-8">
            <section>
                <h2 className="text-3xl font-bold mb-2">Trending Now</h2>
                <p className="text-gray-400 mb-6">The hottest tracks everyone's listening to</p>
                
                <div className="space-y-1">
                    {trendingTracks.map((track, index) => (
                        <TrackItem 
                            key={track.id} 
                            track={track} 
                            onPlay={playTrack}
                            showIndex={true}
                            index={index + 1}
                        />
                    ))}
                </div>
            </section>
            
            <section>
                <h2 className="text-2xl font-bold mb-6">Trending Playlists</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuredPlaylists.slice(0, 3).map(playlist => (
                        <PlaylistCard 
                            key={playlist.id} 
                            playlist={playlist}
                            onClick={() => console.log('Open playlist:', playlist.name)}
                        />
                    ))}
                </div>
            </section>
        </div>
    );

    const SearchPage = () => (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Search Results for "{searchTerm}"</h2>
                {searchResults.length > 0 && (
                    <span className="text-gray-400 text-sm">{searchResults.length} results</span>
                )}
            </div>
            
            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20">
                    <div className="spinner mb-4"></div>
                    <p className="text-gray-400">Searching for "{searchTerm}"...</p>
                </div>
            ) : searchResults.length > 0 ? (
                <div className="space-y-1">
                    {searchResults.map(track => (
                        <TrackItem key={track.id} track={track} onPlay={playTrack} />
                    ))}
                </div>
            ) : searchTerm ? (
                <div className="text-center py-20">
                    <Search size={48} className="mx-auto text-gray-600 mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No results found</h3>
                    <p className="text-gray-400">Try searching for something else</p>
                </div>
            ) : (
                <div className="space-y-8">
                    <section>
                        <h3 className="text-xl font-bold mb-4">Browse by Genre</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {['Pop', 'Rock', 'Hip Hop', 'Electronic', 'Jazz', 'Classical'].map(genre => (
                                <button
                                    key={genre}
                                    className="p-4 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg text-center hover:from-purple-700 hover:to-pink-700 transition-all"
                                    onClick={() => setSearchTerm(genre)}
                                >
                                    <div className="font-semibold">{genre}</div>
                                </button>
                            ))}
                        </div>
                    </section>
                    
                    <section>
                        <h3 className="text-xl font-bold mb-4">Popular Searches</h3>
                        <div className="flex flex-wrap gap-2">
                            {['billie eilish', 'taylor swift', 'drake', 'ariana grande', 'post malone'].map(term => (
                                <button
                                    key={term}
                                    className="px-4 py-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors text-sm"
                                    onClick={() => {
                                        setSearchTerm(term);
                                        searchYouTube(term);
                                    }}
                                >
                                    {term}
                                </button>
                            ))}
                        </div>
                    </section>
                </div>
            )}
        </div>
    );

    const LibraryPage = () => {
        const likedTracksArray = trendingTracks.filter(track => likedSongs.has(track.id));
        
        return (
            <div className="space-y-8">
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold">Your Library</h2>
                        <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-full transition-colors text-sm font-medium">
                            Create Playlist
                        </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {/* Liked Songs */}
                        <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-6 rounded-xl text-white">
                            <Heart size={32} className="mb-4" />
                            <h3 className="text-xl font-bold mb-2">Liked Songs</h3>
                            <p className="opacity-90">{likedSongs.size} songs</p>
                        </div>
                        
                        {/* Recently Played */}
                        <div className="bg-gradient-to-br from-green-600 to-blue-600 p-6 rounded-xl text-white">
                            <Clock size={32} className="mb-4" />
                            <h3 className="text-xl font-bold mb-2">Recently Played</h3>
                            <p className="opacity-90">{recentlyPlayed.length} songs</p>
                        </div>
                        
                        {/* Your Playlists */}
                        <div className="bg-gray-800 p-6 rounded-xl border-2 border-dashed border-gray-600 hover:border-purple-500 transition-colors cursor-pointer">
                            <Plus size={32} className="text-gray-400 mb-4" />
                            <h3 className="text-xl font-bold mb-2">Create Playlist</h3>
                            <p className="text-gray-400">Start a new collection</p>
                        </div>
                    </div>
                </section>
                
                <section>
                    <h3 className="text-xl font-bold mb-4">Liked Songs</h3>
                    {likedTracksArray.length === 0 ? (
                        <div className="text-center py-12">
                            <Heart size={48} className="mx-auto text-gray-600 mb-4" />
                            <h4 className="text-lg font-semibold mb-2">No liked songs yet</h4>
                            <p className="text-gray-400 mb-4">Start exploring and like some tracks!</p>
                            <button 
                                onClick={() => setCurrentPage('discover')}
                                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-full transition-colors"
                            >
                                Discover Music
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-1">
                            {likedTracksArray.map((track, index) => (
                                <TrackItem 
                                    key={track.id} 
                                    track={track} 
                                    onPlay={playTrack}
                                    showIndex={true}
                                    index={index + 1}
                                />
                            ))}
                        </div>
                    )}
                </section>
                
                {recentlyPlayed.length > 0 && (
                    <section>
                        <h3 className="text-xl font-bold mb-4">Recently Played</h3>
                        <div className="space-y-1">
                            {recentlyPlayed.slice(0, 10).map((track, index) => (
                                <TrackItem 
                                    key={`recent-${track.id}`} 
                                    track={track} 
                                    onPlay={playTrack}
                                    showIndex={true}
                                    index={index + 1}
                                />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        );
    };

    const RadioPage = () => (
        <div className="space-y-8">
            <section>
                <h2 className="text-3xl font-bold mb-2">Radio Stations</h2>
                <p className="text-gray-400 mb-6">Discover new music with our curated radio stations</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        { name: 'EchoVibe Hits', description: 'The best of everything', color: 'from-red-500 to-pink-500' },
                        { name: 'Chill Out Radio', description: 'Relax and unwind', color: 'from-blue-500 to-cyan-500' },
                        { name: 'Workout Radio', description: 'High energy music', color: 'from-orange-500 to-red-500' },
                        { name: 'Indie Radio', description: 'Discover new artists', color: 'from-green-500 to-teal-500' },
                        { name: 'Hip Hop Radio', description: 'The latest in hip hop', color: 'from-purple-500 to-indigo-500' },
                        { name: 'Rock Radio', description: 'Classic and modern rock', color: 'from-gray-500 to-gray-700' }
                    ].map((station, index) => (
                        <div 
                            key={index}
                            className="bg-gray-800/50 p-6 rounded-xl hover:bg-gray-700/50 transition-all cursor-pointer group"
                        >
                            <div className={`w-full h-32 bg-gradient-to-br ${station.color} rounded-lg mb-4 flex items-center justify-center`}>
                                <Radio size={32} className="text-white" />
                            </div>
                            <h3 className="font-bold mb-2">{station.name}</h3>
                            <p className="text-gray-400 text-sm">{station.description}</p>
                            <button className="mt-4 w-full py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors">
                                Listen Now
                            </button>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );

    const MusicPlayer = () => {
        if (!currentTrack) return null;
        
        return (
            <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-gray-900/95 to-black/95 backdrop-blur-lg text-white border-t border-gray-800/50 z-30">
                <div className="px-4 py-3">
                    <div className="flex items-center justify-between">
                        {/* Track Info */}
                        <div className="flex items-center space-x-4 flex-1 min-w-0">
                            <img 
                                src={currentTrack.thumbnail || "https://via.placeholder.com/48x48/8B5CF6/FFFFFF?text=♪"} 
                                alt={currentTrack.title}
                                className="w-12 h-12 rounded-lg object-cover shadow-lg"
                            />
                            <div className="min-w-0 flex-1">
                                <div className="font-medium truncate text-sm">{currentTrack.title}</div>
                                <div className="text-gray-400 text-xs truncate">{currentTrack.artist}</div>
                            </div>
                            <button
                                onClick={() => toggleLike(currentTrack)}
                                className={`p-1 rounded transition-colors ${
                                    likedSongs.has(currentTrack.id) ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
                                }`}
                            >
                                <Heart size={16} fill={likedSongs.has(currentTrack.id) ? 'currentColor' : 'none'} />
                            </button>
                        </div>
                        
                        {/* Player Controls */}
                        <div className="flex flex-col items-center space-y-2 flex-1 max-w-md">
                            <div className="flex items-center space-x-4">
                                <button className="p-1 hover:text-purple-400 transition-colors">
                                    <Shuffle size={16} />
                                </button>
                                <button 
                                    onClick={() => skipTrack('previous')}
                                    className="p-1 hover:text-white transition-colors"
                                >
                                    <SkipBack size={18} />
                                </button>
                                <button 
                                    onClick={togglePlayPause}
                                    className="p-2 bg-white text-black rounded-full hover:scale-105 transition-transform shadow-lg"
                                >
                                    {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                                </button>
                                <button 
                                    onClick={() => skipTrack('next')}
                                    className="p-1 hover:text-white transition-colors"
                                >
                                    <SkipForward size={18} />
                                </button>
                                <button className="p-1 hover:text-purple-400 transition-colors">
                                    <Repeat size={16} />
                                </button>
                            </div>
                            
                            <div className="w-full flex items-center space-x-2">
                                <span className="text-xs text-gray-400 w-10 text-right">
                                    {Math.floor(progress * 3.45 / 100)}:{String(Math.floor((progress * 3.45 / 100 % 1) * 60)).padStart(2, '0')}
                                </span>
                                <div 
                                    className="flex-1 bg-gray-700 rounded-full h-1 cursor-pointer"
                                    onClick={(e) => {
                                        const rect = e.currentTarget.getBoundingClientRect();
                                        const x = e.clientX - rect.left;
                                        const width = rect.width;
                                        setProgress((x / width) * 100);
                                    }}
                                >
                                    <div 
                                        className="bg-white h-1 rounded-full transition-all duration-300 relative"
                                        style={{ width: `${progress}%` }}
                                    >
                                        <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 hover:opacity-100 transition-opacity"></div>
                                    </div>
                                </div>
                                <span className="text-xs text-gray-400 w-10">{currentTrack.duration}</span>
                            </div>
                        </div>
                        
                        {/* Volume Control */}
                        <div className="flex items-center space-x-2 flex-1 justify-end">
                            <Volume2 size={16} />
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={volume}
                                onChange={(e) => setVolume(e.target.value)}
                                className="w-20 accent-white"
                            />
                        </div>
                    </div>
                </div>
                
                <audio ref={audioRef} />
            </div>
        );
    };

    const renderCurrentPage = () => {
        switch (currentPage) {
            case 'discover':
                return <DiscoverPage />;
            case 'trending':
                return <TrendingPage />;
            case 'search':
                return <SearchPage />;
            case 'library':
                return <LibraryPage />;
            case 'radio':
                return <RadioPage />;
            default:
                return <DiscoverPage />;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
            {/* Overlay for mobile sidebar */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-10 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
            
            <Navigation />
            <Header />
            <main className={`transition-all duration-300 pt-20 pb-24 p-4 md:p-8 main-content ${sidebarOpen ? 'sidebar-open' : ''} md:ml-64`}>
                {renderCurrentPage()}
            </main>
            <MusicPlayer />
        </div>
    );
};

ReactDOM.render(<EchoVibeApp />, document.getElementById('root'));
                >
                    {current
