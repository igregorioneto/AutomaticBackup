interface UpdateScheduleInterface {
  name: string;
  hour: string;
  dayOfMonth?: string | null;
  month?: string | null;
  dayOfWeek?: string | null;
}

export interface UpdateScheduleServiceInterface {
  id: number;
  updateScheduleInterface: UpdateScheduleInterface;
}