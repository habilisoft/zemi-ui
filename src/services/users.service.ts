import axios from "axios";
import { IChangePasswordRequest } from '@/types';

export class UsersService {
  readonly users_endpoint: string;

  constructor() {
    this.users_endpoint = `/api/v1/users`;
  }

  /*
    *==================
    * POST requests
    * ==================
   */

  async changePassword(changePasswordRequest: IChangePasswordRequest) {
    try {
      const { data } = await axios.post(`${this.users_endpoint}/change-password`, changePasswordRequest);
      return data;
    } catch (error) {
      console.error(`[UsersService][changePassword]: ${error}`);
      throw error;
    }
  }

}
