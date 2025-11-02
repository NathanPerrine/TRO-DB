/**
 * GROQ projection for portable text blocks with internal link reference expansion.
 *
 * This projection expands internal link references to include all necessary fields
 * for building proper URLs in the InternalLink component.
 *
 * Usage:
 * ```typescript
 * import { portableTextProjection } from '$lib/utils/sanity/portableTextProjection';
 *
 * // In a GROQ query:
 * `description${portableTextProjection}`
 * `notes${portableTextProjection}`
 * `walkthrough${portableTextProjection}`
 * ```
 */
export const portableTextProjection = `[]{
  ...,
  markDefs[]{
    ...,
    _type == "internalLink" => {
      ...,
      "reference": reference-> {
        _type,
        slug,
        title,
        _type == "spell" => { "school": spellSchool },
        _type == "equipment" => { "armorWeapon": armorWeapon },
        _type == "item" => { "type": type },
        _type == "area" => { "areaType": areaType },
        _type == "book" => { "bookType": bookType }
      }
    }
  }
}`;
