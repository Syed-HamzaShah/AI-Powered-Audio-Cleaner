import React from 'react';
import { Hero } from '@/components/Hero';
import { AudioUploader } from '@/components/AudioUploader';
import { ProcessingOptions } from '@/components/ProcessingOptions';
import { AudioPlayer } from '@/components/AudioPlayer';
import { DownloadSection } from '@/components/DownloadSection';
import { AdPlacement } from '@/components/AdPlacement';
import { useAudioProcessor } from '@/hooks/useAudioProcessor';

const Index = () => {
  const {
    uploadedFile,
    setUploadedFile,
    processingMode,
    setProcessingMode,
    isProcessing,
    processedAudio,
    startProcessing,
    downloadProcessedAudio,
    resetAll
  } = useAudioProcessor();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Hero Section */}
      <Hero />
      
      {/* Top Banner Ad */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-center">
          <AdPlacement id="top-banner" size="banner" className="max-w-4xl w-full" />
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content Area */}
          <div className="flex-1 space-y-8">
            {/* Upload Section */}
            <AudioUploader 
              onFileUpload={setUploadedFile}
              uploadedFile={uploadedFile}
              isProcessing={isProcessing}
            />
            
            {/* Processing Options */}
            {uploadedFile && (
              <ProcessingOptions
                mode={processingMode}
                onModeChange={setProcessingMode}
                onStartProcessing={startProcessing}
                isProcessing={isProcessing}
                disabled={isProcessing}
              />
            )}
            
            {/* Middle Rectangle Ad */}
            {uploadedFile && !processedAudio && (
              <div className="flex justify-center py-4">
                <AdPlacement id="middle-rectangle" size="rectangle" />
              </div>
            )}
            
            {/* Audio Player */}
            {uploadedFile && (
              <AudioPlayer
                originalFile={uploadedFile}
                processedAudio={processedAudio}
                isProcessing={isProcessing}
              />
            )}
            
            {/* Download Section */}
            {processedAudio && (
              <DownloadSection
                onDownload={downloadProcessedAudio}
                onReset={resetAll}
                fileName={uploadedFile?.name || 'audio'}
              />
            )}
          </div>
          
          {/* Sidebar with Ads */}
          <div className="hidden lg:block w-48 space-y-6">
            <AdPlacement id="sidebar-1" size="sidebar" />
            <AdPlacement id="sidebar-2" size="sidebar" />
          </div>
        </div>
      </div>
      
      {/* Bottom Mobile Banner Ad */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50">
        <div className="container mx-auto px-4 py-2">
          <AdPlacement id="mobile-bottom" size="mobile-banner" className="w-full" />
        </div>
      </div>

      {/* Bottom spacing for mobile ad */}
      <div className="lg:hidden h-20"></div>

      {/* SEO Content Section Styled Like Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 py-10 border-t border-blue-900">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform -skew-y-12"></div>
        </div>

        <div className="relative container mx-auto px-4 max-w-4xl text-blue-100">
          <h2 className="text-3xl font-bold text-white mb-10 text-center">
            Professional AI Audio Cleaning Tool
          </h2>
          <div className="grid md:grid-cols-2 gap-12 leading-relaxed">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-blue-200">Advanced Noise Reduction</h3>
              <p className="mb-6">
                Our AI-powered noise reduction technology removes unwanted background noise, 
                hums, clicks, and artifacts from your audio recordings. Perfect for podcasters, 
                content creators, and musicians who need clean, professional-quality audio.
              </p>

              <h3 className="text-xl font-semibold mb-3 text-blue-200">Vocal Isolation & Music Separation</h3>
              <p>
                Separate vocals from instrumental tracks or isolate specific instruments 
                using advanced machine learning algorithms. Great for creating karaoke tracks, 
                remixes, or extracting vocals for sampling.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3 text-blue-200">Supported Formats</h3>
              <ul className="list-disc list-inside space-y-2 mb-6">
                <li>MP3 files (all bitrates)</li>
                <li>WAV files (16-bit, 24-bit)</li>
                <li>High-quality output preservation</li>
                <li>Fast processing times</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 text-blue-200">Use Cases</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Podcast audio enhancement</li>
                <li>Music production and mastering</li>
                <li>Voice recording cleanup</li>
                <li>Interview audio improvement</li>
                <li>Educational content creation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
