import { Card } from '@/components/Card'
import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'

function ToolsSection({
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof Section>) {
  return (
    <Section {...props}>
      <ul role="list" className="space-y-16">
        {children}
      </ul>
    </Section>
  )
}

function Tool({
  title,
  href,
  children,
}: {
  title: string
  href?: string
  children: React.ReactNode
}) {
  return (
    <Card as="li">
      <Card.Title as="h3" href={href}>
        {title}
      </Card.Title>
      <Card.Description>{children}</Card.Description>
    </Card>
  )
}

export const metadata = {
  title: 'Uses',
  description: 'Software I use, gadgets I love, and other things I recommend.',
}

export default function Uses() {
  return (
    <SimpleLayout
      title="Software I use, gadgets I love, and other things I recommend."
      intro="A list of things I use to interface with the world."
    >
      <div className="space-y-20">
        <ToolsSection title="Workstation">
          <Tool title="15” Lenovo Legion 5 (2020)">
            I use a gaming laptop as my daily driver because I like the
            flexibility. Windows for gaming, and Linux Mint for everything else.
          </Tool>
          <Tool title="Everdesk+ Lite Standing Desk">
            Using a standing desk along with some kind of reminder to stand every
            hour or so greatly improves my overall strain and stiffness at the end
            of a long day.
          </Tool>
          <Tool title="ZSA Voyeger Keyboard">
            This is easily my favourite keyboard. To my surprise, the split layout
            forced me to learn touch typing properly and I’m now faster and more
            accurate. Pair this keyboard with a c-clamp mount, and you have infite
            adjustability to the angle and distane for each half.
          </Tool>
          <Tool title="Herman Miller Aeron Chair">
            I blindly bought it without trying, and I can happily say I’ve never sat
            on a more comfortable chair.
          </Tool>
        </ToolsSection>
        <ToolsSection title="Development tools">
          <Tool title="Linux Mint OS">
            Sorry Ubuntu, I cannot use outdated and slow Snap packages anymore.
          </Tool>
          <Tool title="Starship prompt">
            Coming over from oh-my-zsh, starship.rs gives me most of what I need
            and it way faster than oh-my-zsh. Definitely recommend this if simplicity
            and speed is a priority.
          </Tool>
          <Tool title="Comic Code Font">
            A fully hand written font with care to re-hand write for italics and bold
            is something I can really appretiate. So much easier on the eyes even at
            smaller sizes. I patched this with Nerd Fonts for the icons, and now use
            it for terminal and all IDEs.
          </Tool>
        </ToolsSection>
        <ToolsSection title="Homelab">
          <Tool title="Raspberry Pis">
            The model 2B was my first one, and I got 4 RaspberryPi 5s in mid 2024. I use
            the older 32-bit one for PiHole. One RPi5 for Kodi, one for various services
            like Romm, NextCloud, HomeAssistant, a private family website and this website.
            Still finding a use case for the other 2.
          </Tool>
        </ToolsSection>
      </div>
    </SimpleLayout>
  )
}
