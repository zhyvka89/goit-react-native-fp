import React, { createContext, ReactNode, useContext, useState } from 'react';

type GenerationContextType = {
  generation: Generation | null;
  setGeneration: (generation: Generation) => void;
};

type Generation = {
  id: string;
  title: string; 
  image: string;
};

const GenerationContext = createContext<GenerationContextType | undefined>(undefined);

export const GenerationProvider = ({ children }: { children: ReactNode }) => {
  const [generation, setGeneration] = useState<Generation | null>(null);

  return (
    <GenerationContext.Provider value={{ generation, setGeneration }}>
      {children}
    </GenerationContext.Provider>
  );
};

export const useGeneration = (): GenerationContextType => {
  const context = useContext(GenerationContext);
  if (!context) {
    throw new Error('useGeneration must be used within a GenerationProvider');
  }
  return context;
};
