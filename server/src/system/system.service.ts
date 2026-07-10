import { Injectable } from '@nestjs/common';

export interface SavedSystem {
  clientId: string;
  quantities: Record<string, number>;
  activeVariant: Record<string, string>;
  savedAt: Date;
}

@Injectable()
export class SystemService {
  private savedSystems: Map<string, SavedSystem> = new Map();

  save(clientId: string, quantities: Record<string, number>, activeVariant: Record<string, string>): SavedSystem {
    const system: SavedSystem = {
      clientId,
      quantities,
      activeVariant,
      savedAt: new Date(),
    };
    this.savedSystems.set(clientId, system);
    return system;
  }

  getById(clientId: string): SavedSystem | undefined {
    return this.savedSystems.get(clientId);
  }

  delete(clientId: string): boolean {
    return this.savedSystems.delete(clientId);
  }

  getAll(): SavedSystem[] {
    return Array.from(this.savedSystems.values());
  }
}
