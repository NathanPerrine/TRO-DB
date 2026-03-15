import { client } from '$lib/utils/sanity/client';
import { error } from '@sveltejs/kit';
import { questDetailSchema } from '$lib/schemas/quest.server';
import { portableTextProjection } from '$lib/utils/sanity/portableTextProjection';
import { truncateDescription } from '$lib/utils/seo';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
  const rawData = await client.fetch(
    `*[_type == 'quest' && slug.current == $slug][0] {
      ...,
      "author": coalesce(author->displayName, author->name),
      questGiver -> {
        name,
        slug,
        npcType,
      },
      startingArea[] -> {
        _type,
        name,
        slug,
        areaType,
      },
      requirements {
        requiredQuests[] -> {
          title,
          slug,
        },
        requiredItems[] -> {
          _type,
          name,
          slug,
        },
        other,
      },
      introduction${portableTextProjection},
      "walkthrough": walkthrough[]{
        ...,
        markDefs[]{
          ...,
          _type == "internalLink" => {
            ...,
            "reference": reference-> {
              _type, slug, title,
              _type == "spell" => { spellSchool },
              _type == "equipment" => { "armorWeapon": armorWeapon },
              _type == "item" => { "type": type },
              _type == "area" => { "areaType": areaType },
              _type == "book" => { "bookType": bookType }
            }
          }
        },
        _type == "walkthroughStep" => {
          ...,
          content${portableTextProjection},
          substeps[]{
            ...,
            content${portableTextProjection}
          }
        }
      },
      rewards${portableTextProjection},
      tipsAndNotes${portableTextProjection},
      relatedAreas[] -> {
        name,
        slug,
        areaType,
      },
      relatedQuests[] -> {
        title,
        slug,
        summary,
      },
    }`,
    { slug: params.slug }
  );

  if (!rawData) {
    throw error(404, 'Quest not found');
  }

  const quest = questDetailSchema.parse(rawData);

  const seo = {
    title: quest.title,
    description: truncateDescription(quest.summary),
  };

  return { ...quest, seo };
}) satisfies PageServerLoad;
