import axios from "axios";
import { IProject, IProjectUnit, IReserveUnitData } from '@/types';

export class ProjectsService {
  readonly projects_endpoint: string;
  readonly projectId: string | undefined;

  constructor(projectId?: string) {
    this.projects_endpoint = `/api/v1/projects`;
    this.projectId = projectId;
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

  async getProject(): Promise<IProject> {
    try {
      const { data } = await axios.get(this.projects_endpoint + "/" + this.projectId);
      return data;
    } catch (error) {
      console.error(`[ProjectsService][getProject]: ${error}`);
      throw error;
    }
  }

  /*
    *==================
    * POST requests
    * ==================
   */
  async createProject(project: IProject) {
    try {
      const { data } = await axios.post(this.projects_endpoint, project);
      return data;
    } catch (error) {
      console.error(`[ProjectsService][createProject]: ${error}`);
    }
  }

  async getUnit(unitId: string | undefined): Promise<IProjectUnit> {
    try {
      const { data } = await axios.get(this.projects_endpoint + "/" + this.projectId + "/units/" + unitId);
      return data;
    } catch (error) {
      console.error(`[ProjectsService][getUnit]: ${error}`);
      throw error;
    }
  }

  async addUnits(units: IProjectUnit[]) {
    try {
      const { data } = await axios.post(this.projects_endpoint + "/" + this.projectId + "/units", { units });
      return data;
    } catch (error) {
      console.error(`[ProjectsService][addUnits]: ${error}`);
      throw error;
    }
  }

  async reserveUnit(unitId: string, request: IReserveUnitData) {
    try {
      const { data } = await axios.post(this.projects_endpoint + "/" + this.projectId + "/units/" + unitId + "/reserve", request);
      return data;
    } catch (error) {
      console.error(`[ProjectsService][reserveUnit]: ${error}`);
      throw error;
    }

  }
}
