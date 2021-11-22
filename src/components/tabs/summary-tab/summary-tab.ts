import { JobApplicationRepository } from '../../../repositories/job-applications';
export class SummaryTab {

  constructor(public readonly applicationRepository: JobApplicationRepository) {
  }
}
