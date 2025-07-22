import React, { useState } from 'react';
import { FileUpload } from '../FileUpload';
import { AudioWaveform } from '../AudioWaveform';
import { MetadataDisplay } from '../MetadataDisplay';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Play, Pause, Volume2 } from 'lucide-react';

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

export function HomeScreen() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [metadata, setMetadata] = useState<AudioMetadata | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleFileSelect = async (file: File) => {
    setSelectedFile(file);
    setIsAnalyzing(true);
    setIsPlaying(false);

    // Simulate analysis delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock metadata extraction
    const mockMetadata: AudioMetadata = {
      title: file.name.replace(/\.[^/.]+$/, ""),
      artist: "Sample Artist",
      album: "Sample Album",
      producer: "John Smith",
      composer: "Jane Doe",
      lyricist: "Bob Johnson",
      masteringEngineer: "Mike Wilson",
      mixingEngineer: "Sarah Davis",
      recordingEngineer: "Tom Brown",
      vocalEngineer: "Lisa Garcia",
      songwriter: "Jane Doe",
      vocalists: ["Sample Artist", "Featured Vocalist"],
      instrumentalists: ["Guitar Player", "Bass Player", "Drummer"],
      publisher: "Sample Records",
      genre: "Pop",
      year: "2024",
      duration: "3:45"
    };

    setMetadata(mockMetadata);
    setIsAnalyzing(false);
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="space-y-6 p-4 pb-20 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl mb-2 bg-gradient-to-r from-[var(--color-galaxy-purple)] via-[var(--color-galaxy-blue)] to-[var(--color-galaxy-cyan)] bg-clip-text text-transparent">
          Audio Analyzer
        </h1>
        <p className="text-muted-foreground">
          Upload your audio files to extract detailed metadata and credits
        </p>
      </div>

      {!selectedFile ? (
        <FileUpload onFileSelect={handleFileSelect} />
      ) : (
        <div className="space-y-6">
          {/* File Info & Controls */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg mb-1">{selectedFile.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={togglePlayback}
                  disabled={isAnalyzing}
                  className="bg-gradient-to-r from-[var(--color-galaxy-purple)] to-[var(--color-galaxy-blue)] text-white border-none hover:opacity-90"
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Volume2 className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            <AudioWaveform 
              isAnimating={isPlaying || isAnalyzing} 
              className="mb-4"
            />

            {isAnalyzing && (
              <div className="text-center text-muted-foreground">
                <div className="inline-flex items-center gap-2">
                  <div className="h-2 w-2 bg-primary rounded-full animate-pulse"></div>
                  Analyzing audio file...
                </div>
              </div>
            )}
          </Card>

          {/* Metadata Display */}
          <MetadataDisplay metadata={metadata} />

          {/* New Upload Button */}
          <div className="text-center">
            <Button
              variant="outline"
              onClick={() => {
                setSelectedFile(null);
                setMetadata(null);
                setIsAnalyzing(false);
                setIsPlaying(false);
              }}
            >
              Upload Another File
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}