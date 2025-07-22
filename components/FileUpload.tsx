import React, { useState, useRef } from 'react';
import { Upload, Music } from 'lucide-react';
import { Button } from './ui/button';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  className?: string;
}

export function FileUpload({ onFileSelect, className = '' }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    const audioFile = files.find(file => file.type.startsWith('audio/'));
    
    if (audioFile) {
      onFileSelect(audioFile);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={className}>
      <div
        className={`
          relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300
          ${isDragging 
            ? 'border-primary bg-primary/10' 
            : 'border-muted-foreground/30 hover:border-primary/50 hover:bg-accent/50'
          }
        `}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="audio/*"
          onChange={handleFileInput}
          className="hidden"
        />
        
        <div className="flex flex-col items-center gap-4">
          <div className={`
            p-4 rounded-full bg-gradient-to-br from-[var(--color-galaxy-purple)] to-[var(--color-galaxy-blue)] 
            ${isDragging ? 'scale-110' : 'scale-100'} transition-transform duration-300
          `}>
            {isDragging ? (
              <Music className="h-8 w-8 text-white" />
            ) : (
              <Upload className="h-8 w-8 text-white" />
            )}
          </div>
          
          <div>
            <h3 className="mb-2">
              {isDragging ? 'Drop your audio file here' : 'Upload Audio File'}
            </h3>
            <p className="text-muted-foreground mb-4">
              Drag and drop or click to select an audio file
            </p>
            
            <Button 
              onClick={openFileDialog}
              variant="outline"
              className="bg-gradient-to-r from-[var(--color-galaxy-purple)] to-[var(--color-galaxy-blue)] text-white border-none hover:opacity-90"
            >
              Choose File
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}