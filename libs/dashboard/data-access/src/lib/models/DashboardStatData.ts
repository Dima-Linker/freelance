export interface DashboardStatData {
  label: string;
  value: number;
  badge?: string;
  footer?: {
    left: string;
    right?: string;
  };
}
