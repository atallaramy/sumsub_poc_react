import React, { useState, useEffect } from 'react';
import InitialScreen from './components/InitialScreen';
import VerificationScreen from './components/VerificationScreen';
import StatusMessage from './components/StatusMessage';
import { generateAccessToken, refreshAccessToken, getApplicantStatus } from './services/api';
import './App.css';

type StatusType = 'info' | 'success' | 'error';

function App() {
  const [currentScreen, setCurrentScreen] = useState<'initial' | 'verification'>('initial');
  const [userId, setUserId] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('id-and-liveness');
  const [accessToken, setAccessToken] = useState('');
  const [currentUserId, setCurrentUserId] = useState('');
  const [currentApplicantId, setCurrentApplicantId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingStatus, setIsLoadingStatus] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState<StatusType>('info');
  const [showStatus, setShowStatus] = useState(false);

  // Auto-generate fresh user ID on load
  useEffect(() => {
    generateFreshUserId();
  }, []);

  const generateFreshUserId = () => {
    const freshId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
    setUserId(freshId);
  };

  const showStatusMessage = (message: string, type: StatusType = 'info') => {
    setStatusMessage(message);
    setStatusType(type);
    setShowStatus(true);
  };

  const handleStartVerification = async () => {
    if (!userId.trim()) {
      showStatusMessage('Please enter a valid user ID', 'error');
      return;
    }

    setIsLoading(true);
    try {
      showStatusMessage('Generating secure access token...', 'info');

      const tokenData = await generateAccessToken(userId.trim(), selectedLevel);

      setAccessToken(tokenData.token);
      setCurrentUserId(tokenData.userId);
      setCurrentApplicantId(tokenData.applicantId);

      console.log('Stored user ID for token refresh:', tokenData.userId);

      setCurrentScreen('verification');
      showStatusMessage('Verification system ready. Please complete the steps above.', 'success');

    } catch (error) {
      console.error('Initialization error:', error);
      showStatusMessage(
        `Failed to start verification: ${error instanceof Error ? error.message : 'Unknown error'}`,
        'error'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleTokenExpiration = async (): Promise<string> => {
    if (!currentUserId) {
      throw new Error('No user ID available for token refresh');
    }

    console.log('Refreshing access token for user:', currentUserId);

    try {
      const tokenData = await refreshAccessToken(currentUserId);
      setAccessToken(tokenData.token);
      return tokenData.token;
    } catch (error) {
      console.error('Token refresh failed:', error);
      throw error;
    }
  };

  const handleSdkMessage = (type: string, payload: any) => {
    console.log(`SDK Event: ${type}`, payload);

    switch (type) {
      case 'idCheck.onStepCompleted':
        showStatusMessage('Step completed successfully!', 'success');
        if (payload.applicantId) {
          setCurrentApplicantId(payload.applicantId);
        }
        break;

      case 'idCheck.onApplicantLoaded':
        showStatusMessage('Applicant profile loaded', 'info');
        if (payload.applicantId) {
          setCurrentApplicantId(payload.applicantId);
        }
        break;

      case 'idCheck.applicantStatus':
        handleApplicantStatus(payload);
        break;

      case 'idCheck.onError':
        showStatusMessage(`Verification error: ${payload.message || 'Unknown error'}`, 'error');
        break;

      case 'idCheck.onResubmissionNeeded':
        showStatusMessage('Resubmission required. Please follow the instructions above.', 'info');
        break;

      default:
        console.log('Unhandled SDK message:', type, payload);
    }
  };

  const handleApplicantStatus = (payload: any) => {
    const status = payload.reviewStatus;
    console.log('Applicant status:', status);

    switch (status) {
      case 'completed':
        showStatusMessage('✅ Verification completed successfully!', 'success');
        break;
      case 'pending':
        showStatusMessage('⏳ Verification is being processed...', 'info');
        break;
      case 'init':
        showStatusMessage('📋 Please complete the verification steps above', 'info');
        break;
      default:
        showStatusMessage(`Status: ${status}`, 'info');
    }
  };

  const handleSdkError = (error: any) => {
    console.error('WebSDK Error:', error);
    showStatusMessage(`Verification error: ${error.message || 'Unknown error'}`, 'error');
  };

  const handleCheckStatus = async () => {
    if (!currentApplicantId) {
      showStatusMessage('No applicant ID available yet', 'error');
      return;
    }

    setIsLoadingStatus(true);
    try {
      const data = await getApplicantStatus(currentApplicantId);
      console.log('Applicant data:', data);

      const status = data.review?.reviewResult?.reviewAnswer || 'unknown';
      const reviewStatus = data.review?.reviewStatus || 'unknown';

      showStatusMessage(`Current status: ${reviewStatus} (${status})`, 'info');

    } catch (error) {
      console.error('Status check error:', error);
      showStatusMessage(
        `Failed to check status: ${error instanceof Error ? error.message : 'Unknown error'}`,
        'error'
      );
    } finally {
      setIsLoadingStatus(false);
    }
  };

  const handleStartOver = () => {
    setCurrentScreen('initial');
    setAccessToken('');
    setCurrentUserId('');
    setCurrentApplicantId('');
    setStatusMessage('');
    setShowStatus(false);
    generateFreshUserId();
  };

  return (
    <div>
      {currentScreen === 'initial' ? (
        <div>
          <InitialScreen
            userId={userId}
            setUserId={setUserId}
            selectedLevel={selectedLevel}
            setSelectedLevel={setSelectedLevel}
            onStartVerification={handleStartVerification}
            isLoading={isLoading}
          />
          <StatusMessage
            message={statusMessage}
            type={statusType}
            visible={showStatus}
          />
        </div>
      ) : (
        <div>
          <VerificationScreen
            accessToken={accessToken}
            onMessage={handleSdkMessage}
            onError={handleSdkError}
            onTokenExpiration={handleTokenExpiration}
            onCheckStatus={handleCheckStatus}
            onStartOver={handleStartOver}
            isLoadingStatus={isLoadingStatus}
          />
          <StatusMessage
            message={statusMessage}
            type={statusType}
            visible={showStatus}
          />
        </div>
      )}
    </div>
  );
}

export default App;