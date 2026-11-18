export const social = {
  instagram: 'https://www.instagram.com/its_hayamakeupartist/',
  tiktok: 'https://www.tiktok.com/@hayamakeupartist0',
}

// Supplied in the project brief; not independently verified. Confirm before launch.
export const services = [
  { name: 'Full Glam Makeup', price: 120, category: 'Makeup', description: 'Defined eyes, luminous skin and a statement finish.' },
  { name: 'Soft Glam Makeup', price: 80, category: 'Makeup', description: 'Softly sculpted, effortlessly radiant, beautifully you.' },
  { name: 'Bridal Trial Makeup', price: 180, category: 'Bridal', description: 'Explore the colours and details of your bridal look.' },
  { name: 'Bridal Glam Package', price: 400, category: 'Bridal', description: 'A bridal beauty look for your most meaningful day. Enquire for package details.' },
  { name: 'Hollywood Waves', price: 60, category: 'Hair', description: 'Glossy, sculpted waves with timeless appeal.' },
  { name: 'Blow Dry', price: 45, category: 'Hair', description: 'A polished finish with beautiful movement.' },
  { name: 'Soft Curls', price: 100, category: 'Hair', description: 'Soft shape and romantic, flowing texture.' },
  { name: 'Hair Styling', price: null, category: 'Hair', description: 'The finishing touch to complement your occasion.' },
] as const

export const asset = (file: string) => `${import.meta.env.BASE_URL}images/${file}`
