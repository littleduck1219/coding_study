import { Module } from '@nestjs/common';
import { CommonService } from './CommonService';
import { CommonController } from './common.controller';

@Module({
  controllers: [CommonController],
  providers: [CommonService],
  exports: [CommonService],
})
export class CommonModule {}
