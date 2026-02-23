
export interface BrandConfig {
  logoName: string;
  primaryColor: string;
  accentColor: string;
  lightBlue: string;
  grayBlue: string;
  headerFont: string;
  bodyFont: string;
  contactEmail: string;
  legalName: string;
}

export enum UserRole {
  SELLER = 'SELLER',
  AGENT = 'AGENT'
}

export enum ExplanatoryPreference {
  SIMPLE = 'SIMPLE',
  STANDARD = 'STANDARD',
  COMPLETE = 'COMPLETE'
}

export enum TransactionStep {
  PROPERTY_CONFIRM = 0,
  AUTHENTICATION = 1,
  SELLER_AUTHORIZATION = 2,
  PAYOFFS_WIRE = 3,
  REMAINING_INFO = 4,
  REVIEW_CONFIRM = 5,
  SUCCESS = 6
}

export interface AgentInfo {
  name: string;
  brokerage: string;
  phone: string;
  email: string;
  image: string;
  rating: number;
  reviewCount: number;
  isVerified: boolean;
  reviewSource: 'Google' | 'Zillow';
}

export interface Document {
  id: string;
  name: string;
  status: 'In Review' | 'Action Needed' | 'Complete';
}

export interface TitleIssue {
  id: string;
  description: string;
  party: string;
  status: 'Pending' | 'Resolved';
}
