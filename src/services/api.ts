import axios from 'axios';
import { AccessTokenResponse, RefreshTokenResponse, ApplicantStatus } from '../types';

const API_BASE_URL = '/api';

export const generateAccessToken = async (
  userId: string,
  levelName: string
): Promise<AccessTokenResponse> => {
  const response = await axios.post(`${API_BASE_URL}/access-token`, {
    userId,
    levelName
  });
  return response.data;
};

export const refreshAccessToken = async (userId: string): Promise<RefreshTokenResponse> => {
  const response = await axios.post(`${API_BASE_URL}/refresh-token`, {
    userId
  });
  return response.data;
};

export const getApplicantStatus = async (applicantId: string): Promise<ApplicantStatus> => {
  const response = await axios.get(`${API_BASE_URL}/applicant/${applicantId}`);
  return response.data;
};