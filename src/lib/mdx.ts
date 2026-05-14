export type MdxPostMeta = {
  slug: string;
  title: string;
  description: string;
  locale: string;
  published: boolean;
};

export async function getWritingPosts(): Promise<MdxPostMeta[]> {
  return [];
}
