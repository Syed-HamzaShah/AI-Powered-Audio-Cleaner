
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface AudioPlayerProps {
  originalFile: File;
  processedAudio: string | null;
  isProcessing: boolean;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  originalFile,
  processedAudio,
  isProcessing,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [activeTab, setActiveTab] = useState('original');
  const audioRef = useRef<HTMLAudioElement>(null);

  const originalUrl = React.useMemo(() => {
    return URL.createObjectURL(originalFile);
  }, [originalFile]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const resetAudio = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
      setIsPlaying(false);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [activeTab]);

  // Mock waveform visualization
  const WaveformViz = ({ isProcessed = false }: { isProcessed?: boolean }) => (
    <div className="flex items-center gap-1 h-20 justify-center">
      {Array.from({ length: 50 }, (_, i) => (
        <div
          key={i}
          className={`w-1 bg-blue-400 rounded-full waveform-bar ${
            isProcessed ? 'opacity-70' : ''
          }`}
          style={{
            height: `${Math.random() * 60 + 20}%`,
            animationDelay: `${i * 0.05}s`,
          }}
        />
      ))}
    </div>
  );

  return (
    <Card className="p-6 bg-white/80 backdrop-blur-sm border-blue-200 shadow-lg animate-fade-in">
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Audio Preview
          </h3>
          <p className="text-gray-600">
            Listen to your original and processed audio
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="original">Original Audio</TabsTrigger>
            <TabsTrigger value="processed" disabled={!processedAudio && !isProcessing}>
              {isProcessing ? 'Processing...' : 'Processed Audio'}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="original" className="space-y-4">
            <audio
              ref={audioRef}
              src={originalUrl}
              onLoadedMetadata={() => {
                if (audioRef.current) {
                  setDuration(audioRef.current.duration);
                }
              }}
            />
            <WaveformViz />
            
            <div className="space-y-3">
              <Progress value={(currentTime / duration) * 100 || 0} className="w-full" />
              
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
              
              <div className="flex items-center justify-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetAudio}
                  className="px-3"
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
                
                <Button
                  onClick={togglePlayPause}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5" />
                  ) : (
                    <Play className="w-5 h-5" />
                  )}
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="processed" className="space-y-4">
            {isProcessing ? (
              <div className="text-center py-12 space-y-4">
                <div className="flex justify-center">
                  <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Processing your audio...</h4>
                  <p className="text-sm text-gray-600">This may take a few minutes</p>
                </div>
                <Progress value={65} className="w-64 mx-auto" />
              </div>
            ) : processedAudio ? (
              <>
                <audio
                  ref={audioRef}
                  src={processedAudio}
                  onLoadedMetadata={() => {
                    if (audioRef.current) {
                      setDuration(audioRef.current.duration);
                    }
                  }}
                />
                <WaveformViz isProcessed />
                
                <div className="space-y-3">
                  <Progress value={(currentTime / duration) * 100 || 0} className="w-full" />
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                  
                  <div className="flex items-center justify-center gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={resetAudio}
                      className="px-3"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                    
                    <Button
                      onClick={togglePlayPause}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6"
                    >
                      {isPlaying ? (
                        <Pause className="w-5 h-5" />
                      ) : (
                        <Play className="w-5 h-5" />
                      )}
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <p>No processed audio available</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Card>
  );
};
