import { type Metadata } from 'next'
import Image from 'next/image'

import { Container } from '@/components/Container'
import { Prose } from '@/components/Prose'
import { profiles } from '@/components/SocialLinks'
import portraitImage from '@/images/portrait.jpg'

export const metadata: Metadata = {
  title: 'About',
  description:
    'I’m Kashyap Kopparam. I live in Singapore, where I build the future.',
}

export default function About() {
  return (
    <Container className="pb-24 pt-12 sm:pt-16">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16">
        <div className="flex flex-col gap-10">
          <header className="kl-article__head">
            <h1 className="kl-article__title">
              I’m Kashyap Kopparam. I live in Singapore, where I build the future.
            </h1>
          </header>
          <Prose>
          <p>
            I’ve loved computers for as long as I can remember. The first encounter was a DOS PC which I used to play games on. Once I learned how to code in high school, I was hooked. I’ve been coding ever since. The only thing I loved equally to computers as a kid were games and sports. I spent a good chunk of my childhood playing football, watching sports, and playing video games. I have since grown up, and developed appreciation for the writing and development that goes into software, which has contributed to my curiosity and passion for technology.
          </p>
          <p>
            I graduated with a Computer Science degree from my hometown, Bengaluru , India. Bengaluru being the Silicon Valley of India, I was lucky enough to land my first job at ThoughtWorks in my hometown and been working in the Tech industry ever since. I learnt a lot working at ThoughWorks and knew this was the right industry for me. I eventually moved to Bangkok, Thailand to work with Agoda where I learnt even more and realized that I am a polyglot full stack developer. As the opportunities came along, I moved to Singapore to work with GoTo Financial, which is my longest tenure. I learnt so much about leadership, the FinTech industry, and how technology can be used to solve real problems. I now work with Audax, which has me learning every day about banking technology. Over the years, I’ve worked as a software engineer, engineering manager, tech lead, product owner and architect across various industries such as retail, tourism, finance and banking.
          </p>
          <p>
            Today, I design, direct, and govern the architecture of digital product offerings at Audax. I work with engineers, product owners and the CTO to ensure the products we build and deliver are scalable, secure and reliable. I also work with the sales team to ensure the products we build meet market needs. I am passionate about the Tech space and strive to continue learning so I can help companies a build cutting-edge technology solutions.
          </p>
          </Prose>
        </div>
        <div className="flex flex-col gap-8 lg:order-none">
          <Image
            src={portraitImage}
            alt=""
            sizes="(min-width: 1024px) 20rem, 20rem"
            className="aspect-square w-full max-w-xs border-stroke-line border-ink bg-surface-sunken object-cover"
          />
          <ul className="kl-social flex-col">
            {profiles.map((profile) => (
              <li key={profile.href}>
                <a href={profile.href} rel="me">
                  Follow on {profile.label}
                </a>
              </li>
            ))}
            <li className="border-t border-stroke-hair border-line pt-4">
              <a href="mailto:me@kkoppa.com">me@kkoppa.com</a>
            </li>
          </ul>
        </div>
      </div>
    </Container>
  )
}
