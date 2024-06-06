import axios from "axios";
import { IBuyer } from '@/types';

export class BuyersService {
  readonly buyers_endpoint: string;
  readonly buyerId: string | undefined;

  constructor(buyerId?: string) {
    this.buyers_endpoint = `/api/v1/buyers`;
    this.buyerId = buyerId;
  }

  /*
   *==================
   * GET requests
   *==================
   */

  async getBuyer(): Promise<IBuyer> {
    try {
      const { data } = await axios.get(this.buyers_endpoint + "/" + this.buyerId);
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
  async createBuyer(buyer: IBuyer) {
    try {
      const { data } = await axios.post(this.buyers_endpoint, buyer);
      return data;
    } catch (error) {
      console.error(`[BuyersService][createBuyer]: ${error}`);
    }
  }
}
