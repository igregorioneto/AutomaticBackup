export class Schedule {
  constructor(
    public name: string,
    public hour: string,
    public id?: number,
    public dayOfMonth?: string | null,
    public month?: string | null,
    public dayOfWeek?: string | null
  ) {}
}