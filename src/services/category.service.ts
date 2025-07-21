import axios from 'axios';
import { ICreateCategoryRequest } from '@/types';

export class CategoryService {
  readonly categories_endpoint: string;

  constructor() {
    this.categories_endpoint = `/api/catalog/v1/categories`;
  }

  async getCategories() {
    try {
      const { data } = await axios.get(this.categories_endpoint);
      return data;
    } catch (error) {
      console.error(`[CategoryService][getCategories]: ${error}`);
      throw error;
    }
  }

  async createCategory(data: ICreateCategoryRequest) {
    try {
      const response = await axios.post(this.categories_endpoint, data);
      return response.data;
    } catch (error) {
      console.error(`[CategoryService][createCategory]: ${error}`);
      throw error;
    }
  }
}
