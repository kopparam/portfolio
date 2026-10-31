import Image, { type ImageProps } from 'next/image'
import { type MDXComponents } from 'mdx/types'

import { CodeBlock } from '@/components/CodeBlock'
import { Diagram } from '@/components/Diagram'

export function useMDXComponents(components: MDXComponents) {
  return {
    ...components,
    pre: CodeBlock,
    table: (props: React.ComponentPropsWithoutRef<'table'>) => (
      <div className="kl-table kl-wide">
        <table {...props} />
      </div>
    ),
    Diagram,
    Image: (props: ImageProps) => <Image {...props} />,
  }
}
