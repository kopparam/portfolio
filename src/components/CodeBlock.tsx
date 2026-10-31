// A code block drawn as a box on the page, its language on tape in the
// border. rehype-prism puts the language on the <pre> as language-<name>.
export function CodeBlock({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<'pre'>) {
  let language = className?.match(/\blanguage-(\S+)/)?.[1]

  return (
    <figure className="kl-code kl-wide">
      {language && language !== 'text' && (
        <figcaption>
          <span className="kl-tape">{language}</span>
        </figcaption>
      )}
      <pre className={className} {...props}>
        {children}
      </pre>
    </figure>
  )
}
