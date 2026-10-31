import clsx from 'clsx'

export const profiles = [
  { href: 'https://github.com/kopparam', label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/kopparam', label: 'LinkedIn' },
]

export function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={clsx('kl-social', className)}>
      {profiles.map((profile) => (
        <li key={profile.href}>
          <a href={profile.href} rel="me">
            {profile.label}
          </a>
        </li>
      ))}
    </ul>
  )
}
