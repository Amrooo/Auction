import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        await page.goto("https://testing-sp.evg.ae/Portal/Home", wait_until="networkidle")
        
        # Get video elements
        videos = await page.query_selector_all("video source, video")
        for v in videos:
            src = await v.get_attribute("src")
            if src:
                print("VIDEO SRC:", src)
        
        # Get background videos (often custom elements in angular)
        html = await page.content()
        with open("rendered_page.html", "w") as f:
            f.write(html)
        
        await browser.close()

asyncio.run(main())
