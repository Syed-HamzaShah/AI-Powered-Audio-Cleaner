
import React from 'react';
import { Hero } from '@/components/Hero';
import { AudioUploader } from '@/components/AudioUploader';
import { ProcessingOptions } from '@/components/ProcessingOptions';
import { AudioPlayer } from '@/components/AudioPlayer';
import { DownloadSection } from '@/components/DownloadSection';
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
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="space-y-8">
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
      </div>
    </div>
  );
};

export default Index;
