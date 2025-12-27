
export type ResourceType = 'PDF' | 'Áudio' | 'Link';

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: ResourceType;
  lockDays: number;
  isManualLock: boolean;
  coverBase64: string;
  fileBase64?: string;
  externalLink?: string;
  createdAt: number;
}

export interface User {
  id: string;
  name: string;
  role: 'admin' | 'user';
  joinedAt: number;
  magneticPower: number;
}

export enum ViewMode {
  LIBRARY = 'LIBRARY',
  ADMIN = 'ADMIN',
  PROFILE = 'PROFILE'
}
