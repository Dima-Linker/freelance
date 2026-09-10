/* eslint-disable @typescript-eslint/no-empty-interface, @typescript-eslint/no-empty-object-type, @typescript-eslint/no-unsafe-declaration-merging -- Bewusster Interface-Merge: Die Model-Properties werden zur Laufzeit vom Proxy im Konstruktor bereitgestellt und sind typseitig vollständig über OrmModels abgedeckt. */
import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { db } from '../../../prisma/db';

/**
 * Alle ORM-Models des public-Namespace, automatisch aus dem generierten
 * Contract-Typ abgeleitet. Neue Models in contract.prisma erscheinen nach
 * `prisma contract emit` ohne weitere Anpassung hier.
 */
export type OrmModels = typeof db.orm.public;

/**
 * Interface-Merge: ergänzt die Klassentypisierung um die Model-Accessoren
 * (this.prisma.User, this.prisma.Post, ...). Die Laufzeitwerte liefert der
 * Proxy im Konstruktor, der Zugriffe auf db.orm.public weiterleitet – die
 * Prisma-8-ORM liefert ihre Models selbst lazy über Proxies.
 */
export interface PrismaService extends OrmModels {}

@Injectable()
export class PrismaService implements OnModuleDestroy {
  readonly db = db;

  constructor() {
    const models = db.orm.public;
    return new Proxy(this, {
      get(target, prop, receiver) {
        if (prop in target) return Reflect.get(target, prop, receiver);
        return Reflect.get(models, prop, models);
      },
    });
  }

  async onModuleDestroy() {
    await db.close();
  }
}
