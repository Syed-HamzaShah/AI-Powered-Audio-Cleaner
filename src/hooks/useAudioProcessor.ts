import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

export const useAudioProcessor = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedAudio, setProcessedAudio] = useState<string | null>(null);

  const startProcessing = async () => {
    if (!uploadedFile) {
      toast({
        title: 'No file uploaded',
        description: 'Please upload an audio file first.',
        variant: 'destructive',
      });
      return;
    }

    setIsProcessing(true);

    try {
      const formData = new FormData();
      formData.append('file', uploadedFile);

      const backendBaseUrl = 'https://audiorefine.onrender.com';
      const endpoint = `${backendBaseUrl}/process/silero`; // ✅ Hardcoded to silero

      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Processing failed');

      const { processedUrl } = await response.json();
      setProcessedAudio(processedUrl);

      toast({
        title: 'Processing complete!',
        description: 'Your audio has been cleaned using noise reduction and silence removal.',
      });
    } catch (error) {
      toast({
        title: 'Processing failed',
        description: 'There was an error processing your audio. Please try again.',
        variant: 'destructive',
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
    link.download = `${fileName}_processed.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: 'Download started',
      description: 'Your processed audio file is being downloaded.',
    });
  };

  const resetAll = () => {
    setUploadedFile(null);
    setProcessedAudio(null);
    setIsProcessing(false);

    toast({
      title: 'Reset complete',
      description: 'Ready to process a new audio file.',
    });
  };

  return {
    uploadedFile,
    setUploadedFile,
    isProcessing,
    processedAudio,
    startProcessing,
    downloadProcessedAudio,
    resetAll,
  };
};
