import { client } from '$lib/utils/sanity/client';
import { error } from '@sveltejs/kit';
import { guidePageDataSchema } from '$lib/schemas/guide.server.js';

export const load = async ({ params }) => {
  const rawData = await client.fetch(
    `*[_type == "guide" && slug.current == $slug][0]{
      title,
      author,
      summary,
      category,
      sections[] {
        sectionTitle,
        sectionSlug,
        content[] {
          ...,
          _type == "image" => {
            "asset": asset->,
            alt,
            alignment,
            width
          },
          _type == "table" => {
            ...,
            rows[] {
              cells[] {
                content
              }
            }
          },
          _type == "block" => {
            ...,
            markDefs[] {
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
          }
        },
        subsections[] {
          subsectionTitle,
          subsectionSlug,
          content[] {
            ...,
            _type == "image" => {
              "asset": asset->,
              alt,
              alignment,
              width
            },
            _type == "table" => {
              ...,
              rows[] {
                cells[] {
                  content
                }
              }
            },
            _type == "block" => {
              ...,
              markDefs[] {
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
            }
          }
        }
      },
      relatedGuides[]-> {
        _id,
        title,
        slug,
        summary
      },
      _createdAt,
      _updatedAt,
    }`,
    { slug: params.slug }
  );

  if (!rawData) {
    throw error(404, 'Guide not found :(');
  }

  const guide = guidePageDataSchema.parse(rawData);

  return guide;
};
