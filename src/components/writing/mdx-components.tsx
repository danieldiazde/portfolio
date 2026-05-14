import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  h1: (props) => <h1 className="text-4xl font-semibold tracking-tight" {...props} />,
  h2: (props) => <h2 className="mt-10 text-2xl font-semibold tracking-tight" {...props} />,
  p: (props) => <p className="mt-5 leading-8 text-muted-foreground" {...props} />,
};
