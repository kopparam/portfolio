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
              className="aspect-square rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
            />
          </div>
        </div>
        <div className="lg:order-first lg:row-span-2">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
          I’m Kashyap Kopparam. I live in Singapore, where I build the future.
          </h1>
          <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
            <p>
              I’ve loved computers for as long as I can remember. The first 
              encounter was a DOS PC which I used to play games on. Once 
              I learned how to code in high school, I was hooked. I’ve been coding 
              ever since. 
              The only thing I loved equally to computers as a kid were games and
              sports. I spent a good chunk of my childhood playing football,
              watching sports, and playing video games. I have since grown up, and 
              developed appreciation for the writing and development
              that goes into software, which has contributed to my curiosity and
              passion for technology.
            </p>
            <p>
              I graduated with a Computer Science degree from my hometown, Bengaluru 
              , India. Bengaluru being the Silicon Valley of India, I was lucky enough 
              to land my first job at ThoughtWorks in my hometown and been working in
              the Tech industry ever since. I learnt a lot working at ThoughWorks
              and knew this was the right industry for me. I eventually moved to
              Bangkok, Thailand to work with Agoda where I learnt even more and 
              realized that I am a polyglot full stack developer. As the
              opportunities came along, I moved to Singapore to work with GoTo Financial,
              which is my longest tenure. I learnt so much about leadership, the FinTech 
              industry, and how technology can be used to solve real problems. I now
              work with Audax, which has me learning every day about banking technology.
              Over the years, I’ve worked as a software engineer, engineering manager, tech lead, 
              product owner and architect across various industries such as retail, 
              tourism, finance and banking. 
            </p>
            <p>
              Today, I design, direct, and govern the architecture of digital product 
              offerings at Audax. I work with engineers, product owners and the CTO to 
              ensure the products we build and deliver are scalable, secure and reliable.
              I also work with the sales team to ensure the products we build meet  
              market needs. I am passionate about the Tech space and strive to continue 
              learning so I can help companies a build cutting-edge technology solutions. 
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
