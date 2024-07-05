import axios from 'axios';

export class PermissionsService {
  readonly permissions_endpoint: string;

  constructor() {
    this.permissions_endpoint = `/api/v1/permissions`;
  }

  async getPermissions() {
    try {
      const { data } = await axios.get(this.permissions_endpoint);
      return data;
    } catch (error) {
      console.error(`[PermissionsService][getPermissions]: ${error}`);
      throw error;
    }
  }
}
