import axios from 'axios';
import { IRole } from '@/types';

export class RolesService {
  readonly endpoint: string;

  constructor(id?: string) {
    this.endpoint = id ? `/api/v1/roles/${id}` : '/api/v1/roles';
  }

  async getRoles() {
    try {
      const { data } = await axios.get(this.endpoint);
      return data;
    } catch (error) {
      console.error(`[PermissionsService][getPermissions]: ${error}`);
      throw error;
    }
  }

  async getRole(): Promise<IRole> {
    try {
      const { data } = await axios.get(this.endpoint);
      return data;
    } catch (error) {
      console.error(`[PermissionsService][getPermissions]: ${error}`);
      throw error;
    }
  }

  async assignRoleToUsers(users: string[]) {
    try {
      const { data } = await axios.post(`${this.endpoint}/assign`, { users });
      return data;
    } catch (error) {
      console.error(`[PermissionsService][assignRoleToUsers]: ${error}`);
      throw error;
    }
  }

  async createRole(role: IRole) {
    try {
      const { data } = await axios.post(this.endpoint, role);
      return data;
    } catch (error) {
      console.error(`[PermissionsService][createRole]: ${error}`);
      throw error;
    }
  }

  async deleteRole() {
    try {
      const { data } = await axios.delete(this.endpoint);
      return data;
    } catch (error) {
      console.error(`[PermissionsService][deleteRole]: ${error}`);
      throw error;
    }
  }

  async assignPermissions(permissions: string[]) {
    try {
      const { data } = await axios.post(`${this.endpoint}/permissions`, { permissions });
      return data;
    } catch (error) {
      console.error(`[PermissionsService][assignPermissions]: ${error}`);
      throw error;
    }
  }

  async removePermissions(permissions: string[]) {
    try {
      const { data } = await axios.delete(`${this.endpoint}/permissions`, { data: { permissions } });
      return data;
    } catch (error) {
      console.error(`[PermissionsService][removePermissions]: ${error}`);
      throw error;
    }
  }
}
