import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import type { SavedSystem } from './system.service';
import { SystemService } from './system.service';

@Controller('api/system')
export class SystemController {
  constructor(private readonly systemService: SystemService) {}

  @Post()
  save(
    @Body()
    body: {
      clientId: string;
      quantities: Record<string, number>;
      activeVariant: Record<string, string>;
    },
  ): SavedSystem {
    return this.systemService.save(body.clientId, body.quantities, body.activeVariant);
  }

  @Get(':clientId')
  getById(@Param('clientId') clientId: string): SavedSystem | { error: string } {
    const system = this.systemService.getById(clientId);
    return system || { error: 'System not found' };
  }

  @Delete(':clientId')
  delete(@Param('clientId') clientId: string): { success: boolean } {
    const deleted = this.systemService.delete(clientId);
    return { success: deleted };
  }

  @Get()
  getAll(): SavedSystem[] {
    return this.systemService.getAll();
  }
}
