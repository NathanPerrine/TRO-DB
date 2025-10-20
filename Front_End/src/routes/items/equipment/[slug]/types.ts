export const CLASS_LIST = ['Melee', 'Tank', 'Thaumaturge', 'Sorcerer', 'Elementalist', 'Mystic', 'Necromancer'] as const;
export type PlayerClassType = typeof CLASS_LIST[number] | null;