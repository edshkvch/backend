export class ProjectClientDto {
  email: string;
  fullName: string;
  organization: string;

  constructor({ email, fullName, organization }) {
    this.email = email;
    this.fullName = fullName;
    this.organization = organization;
  }
}
