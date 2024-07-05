import axios from "axios";
import { IChangePasswordRequest, ICreateUserRequest, IResetPasswordRequest, IUser, IUserCreated } from '@/types';

export class UsersService {
  readonly users_endpoint: string;

  constructor(userId?: string) {
    if(userId === undefined) {
      this.users_endpoint = `/api/v1/users`;
    } else {
      this.users_endpoint = `/api/v1/users/${userId}`;
    }
  }

  /*
    *==================
    * GET requests
    * ==================
   */
  async getUser() : Promise<Partial<IUser>>{
    try {
      const { data } = await axios.get(this.users_endpoint);
      return data;
    } catch (error) {
      console.error(`[UsersService][getUser]: ${error}`);
      throw error;
    }
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

  async resetPassword(resetPasswordRequest: IResetPasswordRequest) {
    try {
      const { data } = await axios.post(`${this.users_endpoint}/reset-password`, resetPasswordRequest);
      return data;
    } catch (error) {
      console.error(`[UsersService][resetPassword]: ${error}`);
      throw error;
    }
  }

  async removeRolesFromUser(roles: string[]) {
    try {
      const { data } = await axios.post(`${this.users_endpoint}/roles/remove`, { roles });
      return data;
    } catch (error) {
      console.error(`[UsersService][removeRolesFromUser]: ${error}`);
      throw error;
    }
  }

  async createUser(user: ICreateUserRequest) : Promise<IUserCreated> {
    try {
      const { data } = await axios.post(this.users_endpoint, user);
      return data;
    } catch (error) {
      console.error(`[UsersService][createUsers]: ${error}`);
      throw error;
    }
  }

  async assignRolesToUser(selectedRecords: string[]) {
    try {
      const { data } = await axios.post(`${this.users_endpoint}/roles`, { roles: selectedRecords });
      return data;
    } catch (error) {
      console.error(`[UsersService][assignRolesToUser]: ${error}`);
      throw error;
    }

  }

  async deleteUser() {
    try {
      const { data } = await axios.delete(this.users_endpoint);
      return data;
    } catch (error) {
      console.error(`[UsersService][deleteUser]: ${error}`);
      throw error;
    }
  }
}
