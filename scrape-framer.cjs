const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  console.log("Navigating to Framer site...");
  await page.goto('https://many-orca-477841-3ecc334da.framer.app/', { waitUntil: 'networkidle' });
  
  // Wait a bit extra for Framer animations to settle
  await page.waitForTimeout(3000);
  
  console.log("Extracting content...");
  
  // Extract all text nodes with their basic styles
  const content = await page.evaluate(() => {
    const elements = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, p, span, a, button, div'));
    
    // Filter for visible elements with text
    const visibleTextElements = elements.filter(el => {
      const style = window.getComputedStyle(el);
      return style.display !== 'none' && 
             style.visibility !== 'hidden' && 
             style.opacity !== '0' &&
             el.innerText && 
             el.innerText.trim().length > 0 &&
             // Avoid duplicating text from children if this is just a wrapper
             Array.from(el.children).every(child => !child.innerText || child.innerText.trim() === '');
    });
    
    return visibleTextElements.map(el => {
      const style = window.getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      return {
        tag: el.tagName.toLowerCase(),
        text: el.innerText.trim(),
        color: style.color,
        bgColor: style.backgroundColor,
        fontSize: style.fontSize,
        fontWeight: style.fontWeight,
        fontFamily: style.fontFamily,
        y: Math.round(rect.top)
      };
    }).sort((a, b) => a.y - b.y); // Sort roughly top to bottom
  });
  
  // Deduplicate consecutive identical texts
  const uniqueContent = content.filter((item, index, arr) => 
    index === 0 || item.text !== arr[index-1].text
  );
  
  fs.writeFileSync('framer-content.json', JSON.stringify(uniqueContent, null, 2));
  console.log(`Saved ${uniqueContent.length} unique text elements to framer-content.json`);
  
  await browser.close();
})();
