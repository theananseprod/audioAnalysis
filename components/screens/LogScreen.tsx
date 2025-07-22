import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Music, Search, Calendar, Clock, User } from 'lucide-react';

interface LogEntry {
  id: string;
  fileName: string;
  title: string;
  artist: string;
  uploadDate: string;
  duration: string;
  genre: string;
  producer: string;
}

export function LogScreen() {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for previous uploads
  const mockLogEntries: LogEntry[] = [
    {
      id: '1',
      fileName: 'summer_vibes.mp3',
      title: 'Summer Vibes',
      artist: 'Sunny Day',
      uploadDate: '2024-01-20',
      duration: '3:45',
      genre: 'Pop',
      producer: 'Mike Johnson'
    },
    {
      id: '2',
      fileName: 'midnight_jazz.wav',
      title: 'Midnight Jazz',
      artist: 'Blue Note Collective',
      uploadDate: '2024-01-18',
      duration: '5:23',
      genre: 'Jazz',
      producer: 'Sarah Williams'
    },
    {
      id: '3',
      fileName: 'electric_dreams.flac',
      title: 'Electric Dreams',
      artist: 'Neon Pulse',
      uploadDate: '2024-01-15',
      duration: '4:12',
      genre: 'Electronic',
      producer: 'Alex Chen'
    },
    {
      id: '4',
      fileName: 'acoustic_sunset.mp3',
      title: 'Acoustic Sunset',
      artist: 'Mountain Echo',
      uploadDate: '2024-01-12',
      duration: '3:58',
      genre: 'Folk',
      producer: 'Emily Davis'
    },
    {
      id: '5',
      fileName: 'urban_rhythm.wav',
      title: 'Urban Rhythm',
      artist: 'City Beats',
      uploadDate: '2024-01-10',
      duration: '3:32',
      genre: 'Hip Hop',
      producer: 'James Wilson'
    }
  ];

  const filteredEntries = mockLogEntries.filter(entry =>
    entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.genre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.producer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <div className="p-4 pb-20 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl mb-2 bg-gradient-to-r from-[var(--color-galaxy-purple)] via-[var(--color-galaxy-blue)] to-[var(--color-galaxy-cyan)] bg-clip-text text-transparent">
          Analysis Log
        </h1>
        <p className="text-muted-foreground">
          View your previously analyzed audio files
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by title, artist, genre, or producer..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-primary">{mockLogEntries.length}</div>
          <div className="text-sm text-muted-foreground">Total Files</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-primary">
            {new Set(mockLogEntries.map(e => e.genre)).size}
          </div>
          <div className="text-sm text-muted-foreground">Genres</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-primary">
            {new Set(mockLogEntries.map(e => e.artist)).size}
          </div>
          <div className="text-sm text-muted-foreground">Artists</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-primary">
            {new Set(mockLogEntries.map(e => e.producer)).size}
          </div>
          <div className="text-sm text-muted-foreground">Producers</div>
        </Card>
      </div>

      {/* Log Entries */}
      <div className="space-y-4">
        {filteredEntries.length === 0 ? (
          <Card className="p-8 text-center">
            <Music className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground">
              {searchTerm ? 'No files match your search criteria' : 'No files analyzed yet'}
            </p>
          </Card>
        ) : (
          filteredEntries.map((entry) => (
            <Card key={entry.id} className="p-4 hover:bg-accent/50 transition-colors cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-gradient-to-br from-[var(--color-galaxy-purple)] to-[var(--color-galaxy-blue)] rounded-lg">
                      <Music className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium">{entry.title}</h3>
                      <p className="text-sm text-muted-foreground">{entry.artist}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(entry.uploadDate)}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {entry.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {entry.producer}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    {entry.genre}
                  </Badge>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}