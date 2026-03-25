import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Check API Health' })
  @ApiResponse({ status: 200, description: 'API is running successfully' })
  check() {
    return {
      status: 'ok',
      message: 'Safar backend foundation is running',
      timestamp: new Date().toISOString(),
    };
  }
}
