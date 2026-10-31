import { type Metadata } from 'next'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'

const projects = [
  {
    name: 'Homelab',
    description:
      'Kubernetes cluster on Raspberry Pis, a Ceph Sorage cluster, and a bunch of other cool stuff.',
    link: { href: 'http://github.com/kopparam/homelab', label: 'Github' },
  },
]

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Things I’ve made trying to put my dent in the universe.',
}

export default function Projects() {
  return (
    <SimpleLayout
      title="Things I’ve made and love to share with you"
      intro="I’ve worked on little projects over the years but these are the ones that I’m love the most. All of them are open-source, so if you see something that piques your interest, check out the code and contribute if you have ideas for how it can be improved."
    >
      <ul
        role="list"
        className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
      >
        {projects.map((project) => (
          <Card as="li" key={project.name}>
            <Card.Title href={project.link.href}>{project.name}</Card.Title>
            <Card.Description>{project.description}</Card.Description>
            <Card.Cta href={project.link.href}>{project.link.label}</Card.Cta>
          </Card>
        ))}
      </ul>
    </SimpleLayout>
  )
}
