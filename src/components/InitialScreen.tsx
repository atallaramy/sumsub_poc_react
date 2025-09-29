import React from 'react';
import { VerificationLevel } from '../types';
import LoadingSpinner from './LoadingSpinner';

interface InitialScreenProps {
  userId: string;
  setUserId: (userId: string) => void;
  selectedLevel: string;
  setSelectedLevel: (level: string) => void;
  onStartVerification: () => void;
  isLoading: boolean;
}

const VERIFICATION_LEVELS: VerificationLevel[] = [
  { value: 'basic-kyc-level', label: 'Basic KYC Level' },
  { value: 'id-only', label: 'ID Only' },
  { value: 'id-and-liveness', label: 'ID and Liveness' },
  { value: 'idv-and-phone-verification', label: 'IDV and Phone Verification' }
];

const InitialScreen: React.FC<InitialScreenProps> = ({
  userId,
  setUserId,
  selectedLevel,
  setSelectedLevel,
  onStartVerification,
  isLoading
}) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && userId.trim()) {
      onStartVerification();
    }
  };

  return (
    <div className="container">
      <div>
        <h1 className="title">🔐 ID Verification</h1>
        <p className="subtitle">Secure identity verification powered by Sumsub</p>
      </div>

      <div>
        <div className="form-group">
          <label htmlFor="userId">
            Enter your unique user ID:
          </label>
          <input
            type="text"
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="e.g., user123, john.doe@email.com"
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="levelName">
            Select verification level:
          </label>
          <select
            id="levelName"
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="form-select"
          >
            {VERIFICATION_LEVELS.map((level) => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={onStartVerification}
          disabled={!userId.trim() || isLoading}
          className="btn btn-full"
        >
          {isLoading && <LoadingSpinner />}
          {isLoading ? 'Processing...' : 'Start Verification Process'}
        </button>
      </div>
    </div>
  );
};

export default InitialScreen;