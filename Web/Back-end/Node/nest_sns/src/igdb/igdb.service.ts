import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class IgdbService {
  async getGamesList() {
    console.log('c3yk2l2pwtplkk3erni8jsif8axe3n');
    try {
      const response = await axios.post(`http://api.igdb.com/v4/games`, {
        headers: {
          Accept: 'application/json',
          'Client-ID': `c3yk2l2pwtplkk3erni8jsif8axe3n`,
          Authorization: `Bearer hczot67uwumg32o3ifivtl9dyjfpf9`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching game data:', error);
      throw new Error('Failed to fetch game data');
    }
  }
}
