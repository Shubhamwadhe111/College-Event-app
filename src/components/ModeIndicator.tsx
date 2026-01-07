/**
 * Mode Indicator Component
 * 
 * Displays current system mode (Live/Demo) and provides user guidance
 */

import React from 'react';
import { useBackendStatus } from '../hooks/useBackendStatus';

interface ModeIndicatorProps {
  className?: string;
  showTooltip?: boolean;
}

export const ModeIndicator: React.FC<ModeIndicatorProps> = ({ 
  className = '', 
  showTooltip = true 
}) => {
  const { status, isAvailable, isChecking, lastChecked, error } = useBackendStatus();

  const getModeText = () => {
    if (isChecking) return 'Checking...';
    return isAvailable ? 'Live Mode' : 'Demo Mode';
  };

  const getModeColor = () => {
    if (isChecking) return 'text-yellow-600 bg-yellow-50';
    return isAvailable ? 'text-green-600 bg-green-50' : 'text-blue-600 bg-blue-50';
  };

  const getTooltipText = () => {
    if (isChecking) {
      return 'Checking backend connection...';
    }
    
    if (isAvailable) {
      return 'Connected to database - all features available';
    }
    
    return 'Using local storage - data saved in browser only';
  };

  const formatLastChecked = () => {
    if (!lastChecked) return '';
    return `Last checked: ${lastChecked.toLocaleTimeString()}`;
  };

  return (
    <div className={`inline-flex items-center ${className}`}>
      <div 
        className={`px-2 py-1 rounded-full text-xs font-medium border ${getModeColor()} ${
          showTooltip ? 'cursor-help' : ''
        }`}
        title={showTooltip ? getTooltipText() : undefined}
      >
        <div className="flex items-center space-x-1">
          {/* Status indicator dot */}
          <div 
            className={`w-2 h-2 rounded-full ${
              isChecking 
                ? 'bg-yellow-400 animate-pulse' 
                : isAvailable 
                  ? 'bg-green-400' 
                  : 'bg-blue-400'
            }`}
          />
          <span>{getModeText()}</span>
        </div>
      </div>
      
      {/* Error indicator */}
      {error && (
        <div 
          className="ml-2 text-red-500 cursor-help"
          title={`Connection error: ${error}`}
        >
          ⚠️
        </div>
      )}
      
      {/* Last checked time (for debugging) */}
      {process.env.NODE_ENV === 'development' && lastChecked && (
        <div className="ml-2 text-xs text-gray-400" title={formatLastChecked()}>
          🕒
        </div>
      )}
    </div>
  );
};

// Compact version for headers/navbars
export const CompactModeIndicator: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { isAvailable, isChecking } = useBackendStatus();

  if (isChecking) {
    return (
      <div className={`inline-flex items-center ${className}`}>
        <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center ${className}`}>
      <div 
        className={`w-2 h-2 rounded-full ${isAvailable ? 'bg-green-400' : 'bg-blue-400'}`}
        title={isAvailable ? 'Live Mode' : 'Demo Mode'}
      />
    </div>
  );
};

// Banner version for prominent display
export const ModeBanner: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { isAvailable, isChecking } = useBackendStatus();

  // Don't show banner in live mode
  if (isAvailable) return null;

  return (
    <div className={`bg-blue-50 border-l-4 border-blue-400 p-4 ${className}`}>
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <div className={`w-3 h-3 rounded-full ${isChecking ? 'bg-yellow-400 animate-pulse' : 'bg-blue-400'}`} />
        </div>
        <div className="ml-3">
          <p className="text-sm text-blue-700">
            {isChecking ? (
              'Checking backend connection...'
            ) : (
              <>
                <strong>Demo Mode:</strong> You're using the offline version. 
                Data is saved locally in your browser.
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};