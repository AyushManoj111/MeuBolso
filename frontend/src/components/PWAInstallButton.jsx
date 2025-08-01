import React from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';

const PWAInstallButton = ({ className = '' }) => {
  const { isInstallable, isInstalled, installApp } = usePWAInstall();

  if (isInstalled || !isInstallable) {
    return null;
  }

  return (
    <button
      onClick={installApp}
      className={`fixed top-4 right-4 z-50 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 w-8 h-8 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center group ${className}`}
      title="Instalar App"
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        className="group-hover:scale-110 transition-transform duration-200"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7,10 12,15 17,10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    </button>
  );
};

export default PWAInstallButton;