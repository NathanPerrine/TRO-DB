/**
 * GROQ projection for portable text blocks with internal link reference expansion.
 *
 * This projection expands internal link references to include all necessary fields
 * for building proper URLs in the InternalLink component.
 *
 * This handles both top-level links and links nested inside table cells.
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
  rows[]{
    ...,
    cells[]{
      ...,
      content[]{
        _key,
        _type,
        children,
        style,
        level,
        listItem,
        markDefs[]{
          _key,
          _type,
          blank,
          href,
          "reference": *[_id == ^.reference._ref][0]{
            _type,
            slug,
            title,
            spellSchool,
            armorWeapon,
            type,
            areaType,
            bookType
          }
        }
      }
    }
  },
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
