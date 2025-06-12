
import React from 'react';
import { Download, RotateCcw, CheckCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface DownloadSectionProps {
  onDownload: () => void;
  onReset: () => void;
  fileName: string;
}

export const DownloadSection: React.FC<DownloadSectionProps> = ({
  onDownload,
  onReset,
  fileName,
}) => {
  const cleanFileName = fileName.replace(/\.[^/.]+$/, '');

  return (
    <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50 border-green-200 shadow-lg animate-fade-in">
      <div className="text-center space-y-6">
        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>
        
        {/* Success Message */}
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-gray-900">
            Audio Processing Complete!
          </h3>
          <p className="text-gray-600">
            Your audio has been successfully processed and is ready for download
          </p>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={onDownload}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg font-medium flex items-center gap-2"
          >
            <Download className="w-5 h-5" />
            Download Clean Audio
          </Button>
          
          <Button
            onClick={onReset}
            variant="outline"
            className="px-6 py-3 flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Process Another File
          </Button>
        </div>
        
        {/* File Info */}
        <div className="text-sm text-gray-500 border-t border-gray-200 pt-4">
          <p>File: {cleanFileName}_cleaned.mp3</p>
          <p>Processing completed successfully</p>
        </div>
      </div>
    </Card>
  );
};
