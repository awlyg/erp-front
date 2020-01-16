export class Bid {
  id: number;
  name: string;
  clientName: string;
  cost: string;
  status: string;
  manager: number;
  submissionDate: Date;
  openingDate: Date;
  comment: string;
  expenses: number;
  link: string;
  letterOfGuarantee: boolean;

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.clientName = data.client_name;
    this.cost = data.cost;
    this.status = data.status;
    this.manager = data.manager;
    this.submissionDate = data.submission_date;
    this.comment = data.comment;
    this.expenses = data.expenses;
    this.link = data.link;
  }

  static arrayCast(data: any): Project [] {
    const projects: Project [] = [];
    data.data.forEach(projectItem => {
      const project = new Project(projectItem);
      projects.push(project);
    });
    return projects;
  }

  static getEmptyProject(): Project {
    return  {
      id: null,
      name: null,
      startDate: null,
      endDate: null,
      status: null,
      manager: null,
      code: null,
      poValue: null,
      expenses: null,
      link: null
    };
  }

}
