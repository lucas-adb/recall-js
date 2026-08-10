export const TAG_NAMES = ['front', 'back', 'node'] as const;
export type Tag = (typeof TAG_NAMES)[number];
