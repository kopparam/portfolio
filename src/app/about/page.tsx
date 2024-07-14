import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import {
  GitHubIcon,
  LinkedInIcon,
} from '@/components/SocialIcons'
import portraitImage from '@/images/portrait.jpg'

function SocialLink({
  className,
  href,
  children,
  icon: Icon,
}: {
  className?: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  children: React.ReactNode
}) {
  return (
    <li className={clsx(className, 'flex')}>
      <Link
        href={href}
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  )
}

function MailIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
      />
    </svg>
  )
}

export const metadata: Metadata = {
  title: 'About',
  description:
    'I’m Kashyap Kopparam. I live in Singapore, where I build the future.',
}

export default function About() {
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        <div className="lg:pl-20">
          <div className="max-w-xs px-2.5 lg:max-w-none">
            <Image
              src={portraitImage}
              alt=""
              sizes="(min-width: 1024px) 32rem, 20rem"
              className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
            />
          </div>
        </div>
        <div className="lg:order-first lg:row-span-2">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
          I’m Kashyap Kopparam. I live in Singapore, where I build the future.
          </h1>
          <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
            <p>
              I’ve loved computers for as long as I can remember, the first 
              computer I used was a DOS PC which I used to play games on. Once 
              I learned how to code in high school, I was hooked. I’ve been coding 
              ever since. What you see is acutally in a `p` tag :D. 
            </p>
            <p>
              The only thing I loved equally to computers as a kid were games and
              sports. I played football, watched cricket, and played video games
              most of the time. I have since grown up, and I still play video games,
              appreciating the writing and development that’s gone into it is the
              only difference.
            </p>
            <p>
              I studied Computer Science in college, and I’ve been working in the
              tech industry ever since. I’ve worked as a software engineer, engineering
              manager, tech lead, product owner and architect. I’ve worked in the retail,
              tourism, and finance and banking industries.
            </p>
            <p>
              I grew up in Bangalore, India, where there was a big growth in software comapnies.
              Did my college and first job there. Then, I got an opportunity to work in Bangkok,
              Thailand, with Agoda, which I did for under 2 years. I then moved to Singapore,
              where I worked with GoTo Financial, formerly part of GoJek. I now work with audax.
            </p>
            <p>
              Today, I design, direct and govern the architecture of digital product offerings
              of audax. I work with engineers, product owners and the CTO to ensure the products
              we build and deliver are scalable, secure and reliable. I also work with the sales
              team to ensure the products we build are what the market needs.
            </p>
          </div>
        </div>
        <div className="lg:pl-20">
          <ul role="list">
            <SocialLink href="https://github.com/kopparam" icon={GitHubIcon} className="mt-4">
              Follow on GitHub
            </SocialLink>
            <SocialLink href="https://www.linkedin.com/in/kopparam" icon={LinkedInIcon} className="mt-4">
              Follow on LinkedIn
            </SocialLink>
            <SocialLink
              href="mailto:me@kkoppa.com"
              icon={MailIcon}
              className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
            >
              me@kkoppa.com
            </SocialLink>
          </ul>
        </div>
      </div>
    </Container>
  )
}
