import type { PortableTextComponents } from '@portabletext/svelte';
import PortableTextRenderer from './PortableTextRenderer.svelte';
import ExternalLink from './components/ExternalLink.svelte';
import InternalLink from './components/InternalLink.svelte';
import PageLink from './components/PageLink.svelte';
import ImageComponent from './components/ImageComponent.svelte';
import TableComponent from './components/TableComponent.svelte';

// Pre-configured components object for use with @portabletext/svelte
export const portableTextComponents: PortableTextComponents = {
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

// Export individual components for custom configurations
export { ExternalLink, InternalLink, PageLink, ImageComponent, TableComponent };

// Default export: the wrapper component
export default PortableTextRenderer;
