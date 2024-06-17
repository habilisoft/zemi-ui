import axios from "axios";
import { ICompanyInformation } from '@/types';

export class CompanyService {
  readonly endpoint: string;

  constructor() {
    this.endpoint = `/api/v1/company`;
  }

  /*
   *==================
   * GET requests
   *==================
   */

  async getCompanyInfo(): Promise<ICompanyInformation> {
    try {
      const { data } = await axios.get(this.endpoint);
      return data;
    } catch (error) {
      console.error(`[BuyersService][getBuyer]: ${error}`);
      throw error;
    }
  }

  /*
    *==================
    * POST requests
    * ==================
   */
  async saveCompanyInfo(company: ICompanyInformation) : Promise<ICompanyInformation> {
    try {
      const { data } = await axios.post(this.endpoint, company);
      return data;
    } catch (error) {
      console.error(`[BuyersService][createBuyer]: ${error}`);
      throw error;
    }
  }
}
