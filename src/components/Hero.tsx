
import React from 'react';
import { Headphones, Zap, Music } from 'lucide-react';

export const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform -skew-y-12"></div>
      </div>
      
      <div className="relative container mx-auto px-4 py-20 lg:py-32">
        <div className="text-center">
          {/* Icon */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm animate-pulse-glow">
                <Headphones className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                <Zap className="w-3 h-3 text-yellow-800" />
              </div>
            </div>
          </div>
          
          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-in">
            Clean Your Audio
            <span className="block text-blue-200">with AI</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Remove background noise or isolate vocals from any audio file in seconds
          </p>
          
          {/* Features */}
          <div className="flex flex-wrap justify-center gap-6 mb-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <Music className="w-5 h-5 text-blue-200" />
              <span className="text-blue-100 font-medium">Music Separation</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <Zap className="w-5 h-5 text-blue-200" />
              <span className="text-blue-100 font-medium">Noise Reduction</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <Headphones className="w-5 h-5 text-blue-200" />
              <span className="text-blue-100 font-medium">AI Powered</span>
            </div>
          </div>
          
          {/* CTA */}
          <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <p className="text-blue-200 font-medium mb-2">
              Upload your audio file below to get started
            </p>
            <div className="w-12 h-0.5 bg-blue-300 mx-auto rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
