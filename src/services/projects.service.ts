import axios from "axios";

export class ProjectsService {
  private projects_endpoint: string;

  constructor() {
    this.projects_endpoint = `/api/projects`;
  }

  /*
   *==================
   * GET requests
   *==================
   */
  async getProjects(searchTerm: string) {
    try {
      const { data } = await axios.get(
        this.projects_endpoint + "search=" + searchTerm
      );
      return data;
    } catch (error) {
      console.error(`[ProjectsService][getProjects]: ${error}`);
    }
  }
}
