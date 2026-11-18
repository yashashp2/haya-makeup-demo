import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

for (const width of [375, 390, 768, 1440]) {
  test(`layout, assets and accessibility at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    const errors: string[] = []
    page.on('pageerror', e => errors.push(e.message))
    page.on('response', r => { if (r.status() >= 400) errors.push(`${r.status()} ${r.url()}`) })
    await page.goto('./')
    await page.evaluate(async () => {
      await document.fonts.ready
      document.querySelectorAll('img').forEach(i => i.loading = 'eager')
      await Promise.all([...document.images].map(i => i.decode()))
    })
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Beauty, Elegance& Confidence')
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    expect(await page.locator('img').evaluateAll(images => images.every(i => (i as HTMLImageElement).naturalWidth > 0))).toBe(true)
    for (const a of await page.locator('a[href^="#"]').all()) {
      const href = await a.getAttribute('href')
      expect(await page.locator(href!).count()).toBe(1)
    }
    const results = await new AxeBuilder({ page }).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze()
    expect(results.violations.map(v => ({id:v.id, nodes:v.nodes.map(n=>n.target)}))).toEqual([])
    expect(errors).toEqual([])
    await page.screenshot({path:`test-results/home-${width}.png`,fullPage:true})
  })
}

test('mobile menu, keyboard dismissal and portfolio filtering', async ({ page }) => {
  await page.setViewportSize({width:375,height:812})
  await page.goto('./')
  const button=page.getByRole('button',{name:'Open menu'})
  await button.click()
  await expect(page.getByRole('navigation',{name:'Mobile navigation'})).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(button).toBeFocused()
  await button.click()
  await page.getByRole('navigation',{name:'Mobile navigation'}).getByRole('link',{name:'Portfolio',exact:true}).click()
  await expect(page.getByRole('navigation',{name:'Mobile navigation'})).toBeHidden()
  await page.getByRole('button',{name:'Hair',exact:true}).click()
  await expect(page.locator('.look')).toHaveCount(1)
  await expect(page.locator('.look')).toContainText('The finishing touch')
  await page.getByRole('button',{name:'All looks'}).click()
  await expect(page.locator('.look')).toHaveCount(4)
})

test('enquiry validates, prepares and copies without requests or storage', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read','clipboard-write'])
  await page.goto('./#contact')
  await page.getByRole('button',{name:'Prepare My Enquiry'}).click()
  await expect(page.getByLabel('Prepared enquiry message')).toHaveCount(0)
  await page.getByLabel('Full name').fill('Demo Person')
  await page.getByLabel('Email').fill('demo@example.com')
  await page.getByLabel('Service', {exact:false}).selectOption('Bridal Glam Package')
  await page.getByLabel('Preferred date').fill('2099-06-15')
  await page.getByLabel('Event location').fill('London')
  await page.getByLabel('A little about your occasion').fill('Demonstration details only')
  const requests: string[]=[]
  page.on('request', r => { if (r.method() !== 'GET' || /demo@example.com|Demo%20Person/.test(r.url())) requests.push(r.url()) })
  await page.getByRole('button',{name:'Prepare My Enquiry'}).click()
  await expect(page.getByLabel('Prepared enquiry message')).toHaveValue(/Bridal Glam Package/)
  await expect(page.getByText('It has not been sent.',{exact:false})).toBeVisible()
  await page.getByRole('button',{name:'Copy Message'}).click()
  await expect(page.getByRole('status').filter({hasText:'Copied.'})).toBeVisible()
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain('Demo Person')
  expect(requests).toEqual([])
  expect(await page.evaluate(() => [localStorage.length, sessionStorage.length, document.cookie])).toEqual([0,0,''])
  await expect(page.getByRole('link',{name:'Open Instagram',exact:false})).toHaveAttribute('href','https://www.instagram.com/its_hayamakeupartist/')
  await page.getByLabel('Full name').fill('Changed Name')
  await expect(page.getByLabel('Prepared enquiry message')).toHaveCount(0)
  await page.getByRole('button',{name:'Clear all details'}).click()
  await expect(page.getByLabel('Full name')).toHaveValue('')
  await page.reload()
  await expect(page.getByLabel('Full name')).toHaveValue('')
})

test('base paths, credits, external destinations and refresh', async ({ page, request }) => {
  await page.goto('./#services')
  await page.reload()
  await expect(page.locator('#services')).toBeVisible()
  const external=await page.locator('a[href^="https:"]').evaluateAll(a=>a.map(x=>(x as HTMLAnchorElement).href))
  expect(external.every(x=>x==='https://www.instagram.com/its_hayamakeupartist/'||x==='https://www.tiktok.com/@hayamakeupartist0')).toBe(true)
  const credits=await request.get('./image-credits.html')
  expect(credits.status()).toBe(200)
  expect(await credits.text()).toContain('Pexels License')
  expect(await page.locator('meta[name="robots"]').getAttribute('content')).toBe('noindex, nofollow')
})
