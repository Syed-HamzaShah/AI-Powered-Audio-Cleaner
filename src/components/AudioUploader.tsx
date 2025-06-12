
import React, { useCallback, useState } from 'react';
import { Upload, Music, X } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface AudioUploaderProps {
  onFileUpload: (file: File) => void;
  uploadedFile: File | null;
  isProcessing: boolean;
}

export const AudioUploader: React.FC<AudioUploaderProps> = ({
  onFileUpload,
  uploadedFile,
  isProcessing,
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      
      const files = Array.from(e.dataTransfer.files);
      const audioFile = files.find(file => 
        file.type.startsWith('audio/') || 
        file.name.toLowerCase().endsWith('.mp3') ||
        file.name.toLowerCase().endsWith('.wav')
      );
      
      if (audioFile) {
        onFileUpload(audioFile);
      }
    },
    [onFileUpload]
  );

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileUpload(file);
    }
  };

  const removeFile = () => {
    onFileUpload(null as any);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (uploadedFile) {
    return (
      <Card className="p-6 bg-white/80 backdrop-blur-sm border-blue-200 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Music className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{uploadedFile.name}</h3>
              <p className="text-sm text-gray-500">{formatFileSize(uploadedFile.size)}</p>
            </div>
          </div>
          {!isProcessing && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={removeFile}
              className="text-gray-400 hover:text-red-500"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-8 bg-white/80 backdrop-blur-sm border-blue-200 shadow-lg">
      <div
        className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
          isDragging
            ? 'border-blue-400 bg-blue-50/50'
            : 'border-gray-300 hover:border-blue-300 hover:bg-blue-50/30'
        }`}
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
      >
        <div className="space-y-6">
          {/* Upload Icon */}
          <div className="flex justify-center">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${
              isDragging ? 'bg-blue-100' : 'bg-gray-100'
            }`}>
              <Upload className={`w-8 h-8 ${isDragging ? 'text-blue-600' : 'text-gray-500'}`} />
            </div>
          </div>
          
          {/* Upload Text */}
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-gray-900">
              {isDragging ? 'Drop your audio file here' : 'Upload your audio file'}
            </h3>
            <p className="text-gray-500">
              Drag and drop your file here, or click to browse
            </p>
          </div>
          
          {/* File Input */}
          <div>
            <input
              type="file"
              accept=".mp3,.wav,audio/*"
              onChange={handleFileSelect}
              className="hidden"
              id="audio-upload"
            />
            <label htmlFor="audio-upload">
              <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
                <span className="cursor-pointer">Choose File</span>
              </Button>
            </label>
          </div>
          
          {/* Format Info */}
          <div className="text-sm text-gray-400 space-y-1">
            <p>Supported formats: MP3, WAV</p>
            <p>Maximum file size: 50MB</p>
          </div>
        </div>
      </div>
    </Card>
  );
};
