// review:
// para manipular as datas em tempo de execução, os domínios serão no formato Date
// mas para armazenar em bancos, será em ISO 8601. Teremos um mapeador para fazer o "meio de campo"

import type { UUID } from 'node:crypto';
import type { Tag } from './tag.interface.js';

export interface Card {
  id: UUID;
  question: string;
  answer: string;
  tags: Tag[];
  createdAt: Date;
  updatedAt: Date;
}
