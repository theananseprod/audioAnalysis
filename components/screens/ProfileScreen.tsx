import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Switch } from '../ui/switch';
import { useTheme } from '../../contexts/ThemeContext';
import { 
  User, 
  Settings, 
  Eye, 
  EyeOff, 
  Lock, 
  Globe, 
  Music, 
  Moon, 
  Sun,
  Crown
} from 'lucide-react';

export function ProfileScreen() {
  const { theme, toggleTheme } = useTheme();
  const [profileVisibility, setProfileVisibility] = useState<'public' | 'private' | 'unlisted'>('public');
  const [name, setName] = useState('Alex Johnson');
  const [username, setUsername] = useState('@alexjohnson');
  const [bio, setBio] = useState('Music enthusiast and audio engineer passionate about discovering new sounds and analyzing audio metadata.');

  // Mock data for top artists
  const topArtists = [
    { name: 'Billie Eilish', count: 23, genre: 'Pop' },
    { name: 'Tame Impala', count: 18, genre: 'Psychedelic Rock' },
    { name: 'FKA twigs', count: 15, genre: 'Alternative R&B' }
  ];

  const getVisibilityIcon = () => {
    switch (profileVisibility) {
      case 'public':
        return <Globe className="h-4 w-4" />;
      case 'private':
        return <Lock className="h-4 w-4" />;
      case 'unlisted':
        return <EyeOff className="h-4 w-4" />;
      default:
        return <Globe className="h-4 w-4" />;
    }
  };

  const getVisibilityColor = () => {
    switch (profileVisibility) {
      case 'public':
        return 'bg-green-500/10 text-green-500';
      case 'private':
        return 'bg-red-500/10 text-red-500';
      case 'unlisted':
        return 'bg-yellow-500/10 text-yellow-500';
      default:
        return 'bg-green-500/10 text-green-500';
    }
  };

  return (
    <div className="p-4 pb-20 max-w-4xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl mb-2 bg-gradient-to-r from-[var(--color-galaxy-purple)] via-[var(--color-galaxy-blue)] to-[var(--color-galaxy-cyan)] bg-clip-text text-transparent">
          Profile
        </h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      {/* Profile Info */}
      <Card className="p-6">
        <div className="flex items-start gap-6 mb-6">
          <Avatar className="h-20 w-20">
            <AvatarImage src="/api/placeholder/80/80" alt="Profile" />
            <AvatarFallback className="bg-gradient-to-br from-[var(--color-galaxy-purple)] to-[var(--color-galaxy-blue)] text-white text-xl">
              AJ
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 space-y-4">
            <div>
              <label className="block text-sm mb-2">Display Name</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your display name"
              />
            </div>
            
            <div>
              <label className="block text-sm mb-2">Username</label>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="@username"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-2">Biography</label>
            <Textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us about yourself..."
              rows={4}
            />
          </div>

          <Button className="bg-gradient-to-r from-[var(--color-galaxy-purple)] to-[var(--color-galaxy-blue)] text-white hover:opacity-90">
            Save Changes
          </Button>
        </div>
      </Card>

      {/* Privacy Settings */}
      <Card className="p-6">
        <h3 className="text-lg mb-4 flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Privacy Settings
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-3">Profile Visibility</label>
            <div className="flex gap-2">
              {(['public', 'unlisted', 'private'] as const).map((visibility) => (
                <Button
                  key={visibility}
                  variant={profileVisibility === visibility ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setProfileVisibility(visibility)}
                  className={`
                    capitalize
                    ${profileVisibility === visibility 
                      ? 'bg-gradient-to-r from-[var(--color-galaxy-purple)] to-[var(--color-galaxy-blue)] text-white' 
                      : ''
                    }
                  `}
                >
                  {getVisibilityIcon()}
                  {visibility}
                </Button>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {profileVisibility === 'public' && 'Your profile and analysis data are visible to everyone'}
              {profileVisibility === 'unlisted' && 'Your profile is not searchable but accessible via direct link'}
              {profileVisibility === 'private' && 'Only you can see your profile and analysis data'}
            </p>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              {theme === 'dark' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              <div>
                <div className="font-medium">Dark Mode</div>
                <div className="text-sm text-muted-foreground">
                  Toggle between light and dark theme
                </div>
              </div>
            </div>
            <Switch
              checked={theme === 'dark'}
              onCheckedChange={toggleTheme}
            />
          </div>
        </div>
      </Card>

      {/* Top Artists */}
      <Card className="p-6">
        <h3 className="text-lg mb-4 flex items-center gap-2">
          <Crown className="h-5 w-5 text-yellow-500" />
          Your Top 3 Artists
        </h3>
        
        <div className="space-y-4">
          {topArtists.map((artist, index) => (
            <div key={artist.name} className="flex items-center justify-between p-4 bg-accent/30 rounded-lg">
              <div className="flex items-center gap-4">
                <div className={`
                  flex items-center justify-center w-8 h-8 rounded-full font-bold text-white
                  ${index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-400'}
                `}>
                  {index + 1}
                </div>
                <div>
                  <div className="font-medium">{artist.name}</div>
                  <div className="text-sm text-muted-foreground">{artist.genre}</div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="font-bold text-primary">{artist.count}</div>
                <div className="text-sm text-muted-foreground">tracks analyzed</div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick Stats */}
      <Card className="p-6">
        <h3 className="text-lg mb-4 flex items-center gap-2">
          <Music className="h-5 w-5" />
          Quick Stats
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">127</div>
            <div className="text-sm text-muted-foreground">Files Analyzed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">8</div>
            <div className="text-sm text-muted-foreground">Genres Explored</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">45</div>
            <div className="text-sm text-muted-foreground">Unique Artists</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">7h 23m</div>
            <div className="text-sm text-muted-foreground">Total Duration</div>
          </div>
        </div>
      </Card>
    </div>
  );
}