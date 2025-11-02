<script lang="ts">
  import { PortableText } from '@portabletext/svelte';
  import type { PortableTextComponents } from '@portabletext/svelte';
  import ExternalLink from './components/ExternalLink.svelte';
  import InternalLink from './components/InternalLink.svelte';
  import PageLink from './components/PageLink.svelte';
  import ImageComponent from './components/ImageComponent.svelte';
  import TableComponent from './components/TableComponent.svelte';

  let { value } = $props<{
    value: any;
  }>();

  const components: PortableTextComponents = {
    types: {
      image: ImageComponent as any,
      table: TableComponent as any
    },
    marks: {
      link: ExternalLink as any,
      internalLink: InternalLink as any,
      pageLink: PageLink as any
    }
  };
</script>

<PortableText {value} {components} />
