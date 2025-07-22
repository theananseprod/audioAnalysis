import React from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Music, User, Disc, Mic, Headphones } from 'lucide-react';

interface AudioMetadata {
  title?: string;
  artist?: string;
  album?: string;
  producer?: string;
  composer?: string;
  lyricist?: string;
  masteringEngineer?: string;
  mixingEngineer?: string;
  recordingEngineer?: string;
  vocalEngineer?: string;
  songwriter?: string;
  vocalists?: string[];
  instrumentalists?: string[];
  publisher?: string;
  genre?: string;
  year?: string;
  duration?: string;
}

interface MetadataDisplayProps {
  metadata: AudioMetadata | null;
  className?: string;
}

export function MetadataDisplay({ metadata, className = '' }: MetadataDisplayProps) {
  if (!metadata) {
    return (
      <Card className={`p-6 ${className}`}>
        <div className="text-center text-muted-foreground">
          <Music className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>Upload an audio file to view metadata</p>
        </div>
      </Card>
    );
  }

  const metadataItems = [
    { label: 'Producer', value: metadata.producer, icon: User },
    { label: 'Composer', value: metadata.composer, icon: Music },
    { label: 'Lyricist', value: metadata.lyricist, icon: User },
    { label: 'Mastering Engineer', value: metadata.masteringEngineer, icon: Headphones },
    { label: 'Mixing Engineer', value: metadata.mixingEngineer, icon: Headphones },
    { label: 'Recording Engineer', value: metadata.recordingEngineer, icon: Mic },
    { label: 'Vocal Engineer', value: metadata.vocalEngineer, icon: Mic },
    { label: 'Songwriter', value: metadata.songwriter, icon: Music },
    { label: 'Publisher', value: metadata.publisher, icon: Disc },
  ];

  return (
    <Card className={`p-6 ${className}`}>
      <div className="space-y-6">
        {/* Basic Info */}
        <div>
          <h3 className="mb-4 text-lg flex items-center gap-2">
            <Music className="h-5 w-5 text-primary" />
            Track Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Title</p>
              <p className="font-medium">{metadata.title || 'Unknown'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Artist</p>
              <p className="font-medium">{metadata.artist || 'Unknown'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Album</p>
              <p className="font-medium">{metadata.album || 'Unknown'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Genre</p>
              <p className="font-medium">{metadata.genre || 'Unknown'}</p>
            </div>
          </div>
        </div>

        {/* Credits */}
        <div>
          <h4 className="mb-4 flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            Credits
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {metadataItems.map(({ label, value, icon: Icon }) => (
              value && (
                <div key={label}>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Icon className="h-3 w-3" />
                    {label}
                  </p>
                  <p className="font-medium">{value}</p>
                </div>
              )
            ))}
          </div>
        </div>

        {/* People Lists */}
        {(metadata.vocalists?.length || metadata.instrumentalists?.length) && (
          <div>
            <h4 className="mb-4">Performers</h4>
            <div className="space-y-3">
              {metadata.vocalists?.length && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Vocalists</p>
                  <div className="flex flex-wrap gap-2">
                    {metadata.vocalists.map((vocalist, index) => (
                      <Badge key={index} variant="secondary" className="bg-primary/10 text-primary">
                        {vocalist}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              {metadata.instrumentalists?.length && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Instrumentalists</p>
                  <div className="flex flex-wrap gap-2">
                    {metadata.instrumentalists.map((instrumentalist, index) => (
                      <Badge key={index} variant="secondary" className="bg-secondary/10 text-secondary-foreground">
                        {instrumentalist}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}