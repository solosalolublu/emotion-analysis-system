'use client';

import React from 'react';

export function ThemeStyles() {
  return (
    <style jsx global>{`
      :root {
        --primary-color: #9333ea;
        --primary-light: #c084fc;
        --primary-dark: #7e22ce;
        --secondary-color: #ec4899;
        --secondary-light: #f9a8d4;
        --secondary-dark: #be185d;
        --background-light: #fdf4ff;
        --background-dark: #4a044e;
        --text-light: #581c87;
        --text-dark: #f5d0fe;
      }
      
      .btn-primary {
        background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
        color: white;
      }
      
      .btn-primary:hover {
        background: linear-gradient(to right, var(--primary-dark), var(--secondary-dark));
      }
      
      .gradient-bg {
        background: linear-gradient(to right, #f5f3ff, #fce7f3);
      }
      
      .dark .gradient-bg {
        background: linear-gradient(to right, #4c1d95, #831843);
      }
      
      .gradient-text {
        background: linear-gradient(to right, #9333ea, #ec4899);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      
      .card-header {
        background: linear-gradient(to right, #f5f3ff, #fce7f3);
        border-radius: 0.5rem 0.5rem 0 0;
      }
      
      .dark .card-header {
        background: linear-gradient(to right, #4c1d95, #831843);
      }
    `}</style>
  );
}
