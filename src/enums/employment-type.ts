export enum EmploymentTypeEnum {
  FULLTIME = "Full-time",
  PARTTIME = "Part-time",
  CASUAL = "Casual",
  FIXED_TERM = "Fixed Term",
  SHIFT_WORKER = "Shiftworker",
  DAYLY_WEEKLY_HIRE = "Daily/Weekly Hire",
  PROBATION = "Probation",
  TRAINEE = "Apprentice/Trainee",
  OUTWORKER = "Outworker",
}

export const EmploymentTypeEnumCount: number =
  Object.keys(EmploymentTypeEnum).length;
