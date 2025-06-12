
import React from 'react';
import { Zap, Music, Volume2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

export type ProcessingMode = 'noise-reduction' | 'vocal-separation';

interface ProcessingOptionsProps {
  mode: ProcessingMode;
  onModeChange: (mode: ProcessingMode) => void;
  onStartProcessing: () => void;
  isProcessing: boolean;
  disabled: boolean;
}

export const ProcessingOptions: React.FC<ProcessingOptionsProps> = ({
  mode,
  onModeChange,
  onStartProcessing,
  isProcessing,
  disabled,
}) => {
  return (
    <Card className="p-6 bg-white/80 backdrop-blur-sm border-blue-200 shadow-lg animate-fade-in">
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Choose Processing Mode
          </h3>
          <p className="text-gray-600">
            Select how you want to process your audio file
          </p>
        </div>
        
        <RadioGroup 
          value={mode} 
          onValueChange={onModeChange}
          className="space-y-4"
          disabled={disabled}
        >
          {/* Noise Reduction Option */}
          <div className="flex items-start space-x-3">
            <RadioGroupItem value="noise-reduction" id="noise-reduction" className="mt-1" />
            <Label htmlFor="noise-reduction" className="flex-1 cursor-pointer">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mt-1">
                  <Volume2 className="w-5 h-5 text-green-600" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-medium text-gray-900">Noise Reduction</h4>
                  <p className="text-sm text-gray-600">
                    Remove background noise, wind, hiss, and other unwanted sounds from your audio
                  </p>
                  <div className="text-xs text-green-600 font-medium">
                    Perfect for: Podcasts, Recordings, Interviews
                  </div>
                </div>
              </div>
            </Label>
          </div>
          
          {/* Vocal Separation Option */}
          <div className="flex items-start space-x-3">
            <RadioGroupItem value="vocal-separation" id="vocal-separation" className="mt-1" />
            <Label htmlFor="vocal-separation" className="flex-1 cursor-pointer">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mt-1">
                  <Music className="w-5 h-5 text-purple-600" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-medium text-gray-900">Music/Vocal Separation</h4>
                  <p className="text-sm text-gray-600">
                    Separate vocals from instrumental music or create karaoke tracks
                  </p>
                  <div className="text-xs text-purple-600 font-medium">
                    Perfect for: Karaoke, Remixes, Music Production
                  </div>
                </div>
              </div>
            </Label>
          </div>
        </RadioGroup>
        
        {/* Process Button */}
        <div className="pt-4 border-t border-gray-200">
          <Button
            onClick={onStartProcessing}
            disabled={disabled}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-medium"
          >
            {isProcessing ? (
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Processing Audio...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Start AI Processing
              </div>
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
};
