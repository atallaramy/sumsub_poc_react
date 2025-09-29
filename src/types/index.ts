export interface VerificationLevel {
  value: string;
  label: string;
}

export interface AccessTokenResponse {
  token: string;
  applicantId: string;
  userId: string;
}

export interface RefreshTokenResponse {
  token: string;
  userId: string;
}

export interface ApplicantStatus {
  review?: {
    reviewStatus?: string;
    reviewResult?: {
      reviewAnswer?: string;
    };
  };
  [key: string]: any;
}

export interface SumsubMessage {
  type: string;
  payload: any;
}