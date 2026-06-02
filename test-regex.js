const html = `    <meta
      property="og:description"
      content="Expert IPO consultancy for SME IPO, Mainline IPO, FPO, Pre-IPO funding."
    />`;
const replaced = html.replace(/<meta[^>]*property=["']og:[^>]*>/gi, '');
console.log("Replaced:", replaced);
