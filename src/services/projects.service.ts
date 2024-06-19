import axios from "axios";
import {
  DownPaymentInstallmentRequest,
  IProject, IProjectRequest,
  IProjectUnitRequest,
  IReserveUnitData,
  IUnitDetailResponse,
} from '@/types';

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
  async getProjects(): Promise<IProject[]> {
    try {
      const { data } = await axios.get(
        this.projects_endpoint,
      );
      return data;
    } catch (error) {
      console.error(`[ProjectsService][getProjects]: ${error}`);
      throw error;
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

  async getUnitDownPaymentDetails(name: string) {
    try {
      const { data } = await axios.get(this.projects_endpoint + "/" + this.projectId + "/units/" + name + "/down-payment");
      return data;
    } catch (error) {
      console.error(`[ProjectsService][getUnitDownPaymentDetails]: ${error}`);
      throw error;
    }
  }

  async getUnit(unitId: string | undefined): Promise<IUnitDetailResponse> {
    try {
      const { data } = await axios.get(this.projects_endpoint + "/" + this.projectId + "/units/" + unitId);
      return data;
    } catch (error) {
      console.error(`[ProjectsService][getUnit]: ${error}`);
      throw error;
    }
  }

  /*
    *==================
    * POST requests
    * ==================
   */
  async createProject(project: IProjectRequest) {
    try {
      const { data } = await axios.post(this.projects_endpoint, project);
      return data;
    } catch (error) {
      console.error(`[ProjectsService][createProject]: ${error}`);
    }
  }

  async addUnits(units: IProjectUnitRequest[]) {
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

  async downPaymentInstallment(name: string, requestData: DownPaymentInstallmentRequest) {
    try {
      const { data } = await axios.post(this.projects_endpoint + "/" + this.projectId + "/units/" + name + "/down-payment/installments", requestData);
      return data;
    } catch (error) {
      console.error(`[ProjectsService][downPaymentInstallment]: ${error}`);
      throw error;
    }

  }
}
