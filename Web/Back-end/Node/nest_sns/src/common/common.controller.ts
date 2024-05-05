import { Controller } from '@nestjs/common';
import { CommonService } from './CommonService';

@Controller('common')
export class CommonController {
  constructor(private readonly commonService: CommonService) {}
}
