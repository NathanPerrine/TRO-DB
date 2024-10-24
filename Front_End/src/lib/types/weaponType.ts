type AttributeScalingObj = {
  attribute: 'strength' | 'dexterity' | 'intelligence' | 'endurance';
  scalingType: 'primary' | 'splash';
};

export type WeaponType = {
  name:
    | 'axe'
    | 'club'
    | 'mace'
    | 'maul'
    | 'two handed sword'
    | 'dagger'
    | 'throwing dagger'
    | 'fist'
    | 'long sword'
    | 'short sword';
  range: number;
  attributeScaling: AttributeScalingObj[];
  skill: 'light piercing' | 'light one-handed' | 'light two-handed' | 'heavy two-handed';
};
