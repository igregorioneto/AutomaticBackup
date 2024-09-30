export interface CreateScheduleServiceInterface {
  name: string;
  hour: string;
  dayOfMonth?: string | null;
  month?: string | null;
  dayOfWeek?: string | null;
}