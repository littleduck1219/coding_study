import { Controller, Get, Param, Post } from '@nestjs/common';
import { IgdbService } from './igdb.service';

@Controller('igdb')
export class IgdbController {
  constructor(private readonly igdbService: IgdbService) {}

  @Get()
  async getGamesList() {
    return this.igdbService.getGamesList();
  }
}
