import { ComparisonProperty } from './comparison-property';

export interface ComparisonRow {
  icon: string;
  label: string;
  key: keyof ComparisonProperty;
}
