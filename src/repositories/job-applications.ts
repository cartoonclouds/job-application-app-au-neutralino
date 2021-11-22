import { RepositoryBase } from "./repository-base";
import { JobApplication } from "../models/JobApplication";
import { JobProfession } from "../enums/job-profession";
import moment from "moment";
import { EmploymentType } from "../enums/employment-type";
import { Job } from "../models/Job";
import { Address } from "../models/Address";
import { CompaniesRepository } from "./companies";

/**
 * Repository to perform bulk actions on job applications.
 */
export class JobApplicationRepository extends RepositoryBase {
  private static jobApplicationList = [
    new JobApplication({
      job: new Job({
        profession: JobProfession.IT_PROFESSIONAL,
        employmentType: EmploymentType.FULLTIME,
        closingDate: moment().add(6, "months"),
        salary: { start: 1, end: 90000 },
        rate: { amount: 11.11, unit: "day" },
        url: "www.jobwebsite.com",
        comments: "Comments about this job",
        address: new Address({
          address_line_1: "U9 2/3 Birchmore Close",
          suburb: "Plmpton",
          state: "SA",
          postcode: 5040,
          country: "Australia",
        }),
      }),
      company: CompaniesRepository.companies()[0],
    }),
  ];

  public static jobApplications() {
    return this.jobApplicationList;
  }

  public static jobApplication(id: string) {
    return this.jobApplicationList.find((j) => j.id === id);
  }

  public static jobApplicationCount(): number {
    return this.jobApplicationList.length;
  }

  /**
   * Returns an array of job applications which have been set as requiring follow-up.
   */
  public getApplicationsRequiringFollowup(): JobApplication[] {
    return JobApplicationRepository.jobApplications().filter(
      (application: JobApplication) => application.requiresFollowup
    );
  }
  // By:
  // * salary range
  // * rate
  // * profession
  // * employmentType
  // * closing date
  // * created date
  // * company
  // * location (ie, Address suburb, state, postcode, country)
}
