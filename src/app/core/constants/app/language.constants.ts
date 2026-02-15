export const Language = {
  ENGLISH: 'en',
  ARABIC: 'ar',
} as const;

export type Language = (typeof Language)[keyof typeof Language];

export const AvailableLangs: string[] = [
  Language.ENGLISH,
  Language.ARABIC,
] as const;
