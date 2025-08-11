const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = withMDX({
  // Support MDX in /content/reviews/ and /src
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
});

module.exports = nextConfig;
