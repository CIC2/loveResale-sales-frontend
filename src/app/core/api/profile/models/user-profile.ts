export interface UserProfile {
  name: string;
  profileImage: string;
  reservedUnits: number;
  profileStatus: 'Verified' | 'Pending' | 'Unverified';
}
