import React from 'react';
import SumsubWebSdk from '@sumsub/websdk-react';
import LoadingSpinner from './LoadingSpinner';
import { SumsubMessage } from '../types';

interface VerificationScreenProps {
  accessToken: string;
  onMessage: (type: string, payload: any) => void;
  onError: (error: any) => void;
  onTokenExpiration: () => Promise<string>;
  onCheckStatus: () => void;
  onStartOver: () => void;
  isLoadingStatus: boolean;
}

const VerificationScreen: React.FC<VerificationScreenProps> = ({
  accessToken,
  onMessage,
  onError,
  onTokenExpiration,
  onCheckStatus,
  onStartOver,
  isLoadingStatus
}) => {
  const config = {
    lang: 'en',
    theme: 'light'
  };

  const options = {};

  return (
    <div className="container large-container">
      <div>
        <h2 className="title">Identity Verification in Progress</h2>
        <p className="subtitle">Please complete the verification process below:</p>
      </div>

      <div className="sumsub-container">
        <SumsubWebSdk
          accessToken={accessToken}
          expirationHandler={onTokenExpiration}
          config={config}
          options={options}
          onMessage={onMessage}
          onError={onError}
        />
      </div>

      <div className="btn-group">
        <button
          onClick={onCheckStatus}
          disabled={isLoadingStatus}
          className="btn"
        >
          {isLoadingStatus && <LoadingSpinner size="sm" />}
          Check Verification Status
        </button>

        <button
          onClick={onStartOver}
          className="btn btn-secondary"
        >
          Start Over
        </button>
      </div>
    </div>
  );
};

export default VerificationScreen;