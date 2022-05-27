export class ProjectEmployeeDto {
  fullName: string;
  phone: string;

  constructor({ fullName, phone }) {
    this.fullName = fullName;
    this.phone = phone;
  }
}
