"use client";

import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote";

type ClientMDXProps = {
  source: MDXRemoteProps;
};

export default function ClientMDX({ source }: ClientMDXProps) {
  return <MDXRemote {...source} />;
}
