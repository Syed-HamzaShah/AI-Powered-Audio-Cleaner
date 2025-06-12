
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

export type ProcessingMode = 'noise-reduction' | 'vocal-separation';

export const useAudioProcessor = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [processingMode, setProcessingMode] = useState<ProcessingMode>('noise-reduction');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedAudio, setProcessedAudio] = useState<string | null>(null);

  const startProcessing = async () => {
    if (!uploadedFile) {
      toast({
        title: "No file uploaded",
        description: "Please upload an audio file first.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      // Simulate AI processing with a delay
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // For demo purposes, we'll just return the original file as processed
      // In a real implementation, this would call your AI processing API
      const processedUrl = URL.createObjectURL(uploadedFile);
      setProcessedAudio(processedUrl);
      
      toast({
        title: "Processing complete!",
        description: `Your audio has been processed using ${processingMode === 'noise-reduction' ? 'noise reduction' : 'vocal separation'}.`,
      });
      
    } catch (error) {
      toast({
        title: "Processing failed",
        description: "There was an error processing your audio. Please try again.",
        variant: "destructive",
      });
      console.error('Processing error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadProcessedAudio = () => {
    if (!processedAudio || !uploadedFile) return;

    const link = document.createElement('a');
    link.href = processedAudio;
    const fileName = uploadedFile.name.replace(/\.[^/.]+$/, '');
    link.download = `${fileName}_cleaned.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Download started",
      description: "Your processed audio file is being downloaded.",
    });
  };

  const resetAll = () => {
    setUploadedFile(null);
    setProcessedAudio(null);
    setIsProcessing(false);
    setProcessingMode('noise-reduction');
    
    toast({
      title: "Reset complete",
      description: "Ready to process a new audio file.",
    });
  };

  return {
    uploadedFile,
    setUploadedFile,
    processingMode,
    setProcessingMode,
    isProcessing,
    processedAudio,
    startProcessing,
    downloadProcessedAudio,
    resetAll,
  };
};
