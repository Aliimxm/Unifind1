const path = require("path");
const pptxgen = require(path.join(
  process.env.TEMP || process.env.TMP,
  "unifind-ppt-tools",
  "node_modules",
  "pptxgenjs"
));

const pptx = new pptxgen();
pptx.layout = "LAYOUT_WIDE";
pptx.author = "uniFind team";
pptx.subject = "Campus lost-and-found platform overview";
pptx.title = "uniFind | Project Overview";
pptx.company = "uniFind";
pptx.lang = "en-US";
pptx.theme = {
  headFontFace: "Silkscreen",
  bodyFontFace: "Aptos",
  lang: "en-US",
};
pptx.defineSlideMaster({
  title: "RETRO",
  background: { color: "111311" },
  objects: [
    { rect: { x: 0, y: 0, w: 13.333, h: 0.08, line: { color: "A8FF78", transparency: 100 }, fill: { color: "A8FF78" } } },
    { line: { x: 0.55, y: 7.08, w: 12.23, h: 0, line: { color: "34412F", width: 1 } } },
    { text: { text: "UNIFIND  /  CAMPUS LOST + FOUND", options: { x: 0.58, y: 7.12, w: 8, h: 0.18, fontFace: "Aptos", fontSize: 8, color: "A0AA98", charSpacing: 1.2, margin: 0 } } },
    { text: { text: "PROJECT OVERVIEW", options: { x: 10.7, y: 7.12, w: 2.05, h: 0.18, fontFace: "Aptos", fontSize: 8, color: "A0AA98", charSpacing: 1, align: "right", margin: 0 } } },
  ],
  slideNumber: { x: 12.87, y: 7.1, color: "A8FF78", fontFace: "Aptos", fontSize: 9 },
  masterObjects: [],
});

const C = {
  bg: "111311",
  panel: "202420",
  panel2: "171B17",
  lime: "A8FF78",
  limeSoft: "D5FFBE",
  white: "EFF5E9",
  muted: "A0AA98",
  red: "FF6B6B",
  blue: "77C8E8",
  yellow: "FFD166",
  line: "354033",
};
const F = { display: "Silkscreen", body: "Aptos", mono: "Consolas" };
const W = 13.333;
const H = 7.5;
const ST = pptx.ShapeType;

function rect(slide, x, y, w, h, fill = C.panel, line = C.line, radius = false) {
  slide.addShape(radius ? ST.roundRect : ST.rect, {
    x, y, w, h,
    rectRadius: 0.04,
    line: { color: line, width: 1 },
    fill: { color: fill },
  });
}

function text(slide, value, x, y, w, h, options = {}) {
  slide.addText(value, {
    x, y, w, h,
    fontFace: F.body,
    fontSize: 16,
    color: C.white,
    breakLine: false,
    margin: 0,
    valign: "mid",
    fit: "shrink",
    ...options,
  });
}

function heading(slide, title, kicker, subtitle = "") {
  text(slide, kicker.toUpperCase(), 0.72, 0.48, 4.2, 0.22, {
    fontFace: F.mono, fontSize: 10, bold: true, color: C.lime, charSpacing: 1.8,
  });
  text(slide, title, 0.7, 0.82, 11.9, 0.65, {
    fontFace: F.display, fontSize: 25, bold: true, color: C.white,
  });
  if (subtitle) text(slide, subtitle, 0.73, 1.52, 11.6, 0.38, { fontSize: 14, color: C.muted });
}

function pixelLogo(slide, x, y, unit = 0.12) {
  const blocks = [
    [2, 0], [3, 0], [4, 0], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1],
    [0, 2], [1, 2], [2, 2], [4, 2], [5, 2], [6, 2], [0, 3], [1, 3],
    [5, 3], [6, 3], [1, 4], [2, 4], [4, 4], [5, 4], [2, 5], [4, 5],
    [3, 6], [4, 6], [5, 7], [6, 8], [7, 9],
  ];
  blocks.forEach(([col, row]) => slide.addShape(ST.rect, {
    x: x + col * unit,
    y: y + row * unit,
    w: unit,
    h: unit,
    line: { color: C.lime, transparency: 100 },
    fill: { color: C.lime },
  }));
  slide.addShape(ST.ellipse, {
    x: x + 2 * unit,
    y: y + 2 * unit,
    w: 3 * unit,
    h: 2 * unit,
    line: { color: C.bg, width: 1 },
    fill: { color: C.bg },
  });
}

function tag(slide, label, x, y, color = C.lime) {
  const width = Math.max(0.7, label.length * 0.08 + 0.28);
  rect(slide, x, y, width, 0.29, C.panel2, color);
  text(slide, label.toUpperCase(), x + 0.08, y + 0.02, width - 0.16, 0.22, {
    fontFace: F.mono, fontSize: 8, bold: true, color,
  });
}

function bullet(slide, label, description, x, y, w, color = C.lime) {
  slide.addShape(ST.rect, {
    x, y: y + 0.05, w: 0.11, h: 0.11,
    line: { color, transparency: 100 }, fill: { color },
  });
  text(slide, label, x + 0.25, y, w - 0.25, 0.27, { fontSize: 16, bold: true, color: C.white });
  text(slide, description, x + 0.25, y + 0.34, w - 0.3, 0.54, { fontSize: 12, color: C.muted, valign: "top", breakLine: false });
}

function newSlide() {
  return pptx.addSlide("RETRO");
}

// 1. Cover
{
  const slide = newSlide();
  slide.background = { color: C.bg };
  for (let row = 0; row < 12; row++) {
    for (let col = 0; col < 20; col++) {
      if ((row + col) % 4 === 0) slide.addShape(ST.rect, {
        x: 9.2 + col * 0.18, y: 0.55 + row * 0.18, w: 0.055, h: 0.055,
        line: { color: C.line, transparency: 100 }, fill: { color: C.line },
      });
    }
  }
  pixelLogo(slide, 1.0, 1.4, 0.24);
  text(slide, "uniFind", 0.86, 4.0, 5.7, 0.83, {
    fontFace: F.display, fontSize: 34, bold: true, color: C.lime,
  });
  text(slide, "Snap. Match. Recover.", 0.9, 4.94, 6.8, 0.52, {
    fontFace: F.display, fontSize: 19, bold: true, color: C.white,
  });
  text(slide, "A campus lost-and-found platform that brings item reports, possible matches, claims, and verified handoffs into one place.", 0.92, 5.62, 6.2, 0.85, {
    fontSize: 17, color: C.muted, valign: "top", breakLine: false,
  });
  rect(slide, 8.0, 1.2, 4.25, 4.85, C.panel2, C.line);
  text(slide, "LOST ITEM", 8.36, 1.58, 2.0, 0.28, { fontFace: F.mono, fontSize: 10, bold: true, color: C.red, charSpacing: 1.1 });
  rect(slide, 8.36, 2.05, 3.52, 1.65, "282F29", C.line);
  // Pixel-art backpack icon
  [[3,0],[4,0],[2,1],[3,1],[4,1],[5,1],[1,2],[2,2],[3,2],[4,2],[5,2],[6,2],[1,3],[2,3],[3,3],[4,3],[5,3],[6,3],[2,4],[3,4],[4,4],[5,4],[2,5],[5,5]].forEach(([c,r]) => {
    slide.addShape(ST.rect,{x:9.12+c*0.25,y:2.22+r*0.22,w:0.25,h:0.22,line:{color:C.blue,transparency:100},fill:{color:C.blue}});
  });
  tag(slide, "BACKPACK", 8.38, 3.91, C.blue);
  tag(slide, "CHARCOAL", 9.45, 3.91, C.muted);
  text(slide, "Charcoal pack · North Library", 8.38, 4.42, 3.45, 0.32, { fontSize: 14, bold: true });
  text(slide, "Orange zip pulls and mountain patch", 8.38, 4.84, 3.45, 0.48, { fontSize: 11, color: C.muted });
  rect(slide, 8.36, 5.45, 3.52, 0.42, C.lime, C.lime);
  text(slide, "VIEW POSSIBLE MATCHES  →", 8.53, 5.55, 3.15, 0.2, { fontFace: F.mono, fontSize: 9, bold: true, color: C.bg, align: "center" });
  text(slide, "PROJECT OVERVIEW  /  OCTOBER 2026", 0.92, 6.62, 5, 0.25, { fontFace: F.mono, fontSize: 9, color: C.muted, charSpacing: 1.2 });
}

// 2. Problem and solution
{
  const slide = newSlide();
  heading(slide, "Lost items. Scattered process.", "01 / The opportunity", "Campus recovery often depends on luck, fragmented posts, and trust between strangers.");
  const cards = [
    { n: "01", title: "Scattered reports", body: "Posts get buried in chats, noticeboards, and word of mouth.", accent: C.blue },
    { n: "02", title: "Weak discovery", body: "A finder and an owner may describe the same item in different ways.", accent: C.yellow },
    { n: "03", title: "Uncertain handoff", body: "A claim needs a safer way to establish that an item is really yours.", accent: C.red },
  ];
  cards.forEach((card, i) => {
    const x = 0.78 + i * 4.15;
    rect(slide, x, 2.45, 3.72, 2.44, C.panel, card.accent);
    text(slide, card.n, x + 0.27, 2.74, 0.8, 0.42, { fontFace: F.mono, fontSize: 20, bold: true, color: card.accent });
    text(slide, card.title, x + 0.27, 3.36, 3.12, 0.52, { fontFace: F.display, fontSize: 14, bold: true, color: C.white });
    text(slide, card.body, x + 0.27, 4.03, 3.12, 0.56, { fontSize: 13, color: C.muted, valign: "top" });
  });
  rect(slide, 0.78, 5.45, 11.98, 0.88, C.lime, C.lime);
  text(slide, "uniFind turns the recovery journey into one campus workflow.", 1.05, 5.69, 11.4, 0.35, {
    fontFace: F.display, fontSize: 15, bold: true, color: C.bg, align: "center",
  });
}

// 3. Core workflow
{
  const slide = newSlide();
  heading(slide, "One clear path from report to return", "02 / How it works", "Each item page connects discovery, communication, and handoff in context.");
  const steps = [
    ["01", "REPORT", "Upload a photo and describe a lost or found item."],
    ["02", "TAG", "Vision analysis suggests category, color, brand, and features."],
    ["03", "MATCH", "Compare against opposite-type reports and show candidates."],
    ["04", "CLAIM", "Send an ownership or finder request to the reporter."],
    ["05", "VERIFY", "Meet and confirm the return with a six-digit code."],
  ];
  steps.forEach((step, i) => {
    const x = 0.72 + i * 2.52;
    rect(slide, x, 2.45, 2.22, 2.68, C.panel, i === 0 ? C.lime : C.line);
    text(slide, step[0], x + 0.2, 2.7, 0.8, 0.38, { fontFace: F.mono, fontSize: 19, bold: true, color: C.lime });
    text(slide, step[1], x + 0.2, 3.3, 1.8, 0.35, { fontFace: F.display, fontSize: 11, bold: true, color: C.white });
    text(slide, step[2], x + 0.2, 3.88, 1.8, 0.95, { fontSize: 12, color: C.muted, valign: "top" });
    if (i < steps.length - 1) text(slide, "→", x + 2.22, 3.36, 0.3, 0.35, { fontFace: F.mono, fontSize: 20, bold: true, color: C.lime, align: "center" });
  });
  text(slide, "SNAP", 0.78, 5.78, 1.2, 0.3, { fontFace: F.display, fontSize: 12, bold: true, color: C.lime });
  text(slide, "MATCH", 3.3, 5.78, 1.2, 0.3, { fontFace: F.display, fontSize: 12, bold: true, color: C.lime });
  text(slide, "CLAIM", 5.82, 5.78, 1.2, 0.3, { fontFace: F.display, fontSize: 12, bold: true, color: C.lime });
  text(slide, "VERIFY", 8.34, 5.78, 1.2, 0.3, { fontFace: F.display, fontSize: 12, bold: true, color: C.lime });
  text(slide, "RECOVER", 10.86, 5.78, 1.7, 0.3, { fontFace: F.display, fontSize: 12, bold: true, color: C.lime });
}

// 4. Product surface
{
  const slide = newSlide();
  heading(slide, "A campus feed with useful context", "03 / The product", "Browse reports, narrow by type or category, then open an item to review its details.");
  const screenshot = path.resolve(__dirname, "../README-assets/image_1.png");
  slide.addImage({ path: screenshot, x: 0.72, y: 2.12, w: 7.55, h: 4.25 });
  rect(slide, 8.68, 2.16, 3.9, 0.96, C.panel, C.line);
  bullet(slide, "Campus activity", "One browsable feed for lost and found reports.", 8.98, 2.36, 3.25, C.lime);
  rect(slide, 8.68, 3.42, 3.9, 0.96, C.panel, C.line);
  bullet(slide, "Fast filtering", "Search and category/type filters help narrow the list.", 8.98, 3.62, 3.25, C.blue);
  rect(slide, 8.68, 4.68, 3.9, 0.96, C.panel, C.line);
  bullet(slide, "Item detail", "Photos, location, tags, reporter, and actions live together.", 8.98, 4.88, 3.25, C.yellow);
  text(slide, "Earlier MVP screen capture", 0.74, 6.53, 4.5, 0.2, { fontSize: 9, color: C.muted, italic: true });
}

// 5. AI and matching
{
  const slide = newSlide();
  heading(slide, "AI helps structure reports; matching stays explainable", "04 / Smart assistance", "The current matcher is a practical text-and-tag baseline, not visual image-to-image recognition.");
  rect(slide, 0.78, 2.18, 5.72, 3.82, C.panel, C.line);
  text(slide, "VISION TAGGING", 1.12, 2.5, 3.7, 0.35, { fontFace: F.display, fontSize: 13, bold: true, color: C.lime });
  text(slide, "GPT-4o-mini", 1.12, 3.02, 2.4, 0.28, { fontFace: F.mono, fontSize: 12, bold: true, color: C.blue });
  text(slide, "Photo → category · color · visible brand · distinctive features", 1.12, 3.5, 4.85, 0.65, { fontSize: 17, bold: true, color: C.white });
  text(slide, "These tags make item reports easier to scan and search.", 1.12, 4.35, 4.75, 0.6, { fontSize: 13, color: C.muted, valign: "top" });
  tag(slide, "PHONE", 1.12, 5.23, C.lime);
  tag(slide, "BLACK", 2.1, 5.23, C.blue);
  tag(slide, "CLEAR CASE", 3.0, 5.23, C.yellow);

  rect(slide, 6.82, 2.18, 5.72, 3.82, C.panel, C.line);
  text(slide, "POSSIBLE MATCHES", 7.16, 2.5, 4.7, 0.35, { fontFace: F.display, fontSize: 13, bold: true, color: C.lime });
  bullet(slide, "Opposite report type", "Lost records are checked against found records, and vice versa.", 7.2, 3.05, 4.8, C.blue);
  bullet(slide, "Terms + synonyms", "Tags, distinctive details, and normalized text contribute to a confidence score.", 7.2, 4.05, 4.8, C.yellow);
  bullet(slide, "Shortlist", "The item page shows the strongest available candidates with reasoning.", 7.2, 5.05, 4.8, C.lime);
  text(slide, "Current implementation: no image embeddings are used to rank item-to-item visual similarity.", 0.82, 6.45, 11.4, 0.27, { fontSize: 11, color: C.muted, italic: true });
}

// 6. Claims and verification
{
  const slide = newSlide();
  heading(slide, "A claim is a conversation, not an instant transfer", "05 / Trust and handoff", "The reporter stays in control; the return is explicitly confirmed before a listing is closed.");
  const nodes = [
    { x: 0.9, title: "REQUEST", body: "Claimant sends a message with ownership details.", c: C.blue },
    { x: 3.35, title: "REVIEW", body: "Reporter accepts or rejects; acceptance sets a meeting.", c: C.yellow },
    { x: 5.8, title: "MEET", body: "Both people arrange an in-person return.", c: C.lime },
    { x: 8.25, title: "VERIFY", body: "Reporter checks the six-digit code at handoff.", c: C.blue },
    { x: 10.7, title: "CLOSE", body: "Item is marked recovered and trust points are awarded.", c: C.lime },
  ];
  nodes.forEach((node, index) => {
    rect(slide, node.x, 2.5, 1.95, 2.26, C.panel, node.c);
    text(slide, `0${index + 1}`, node.x + 0.18, 2.76, 0.6, 0.3, { fontFace: F.mono, fontSize: 16, bold: true, color: node.c });
    text(slide, node.title, node.x + 0.18, 3.28, 1.6, 0.35, { fontFace: F.display, fontSize: 10, bold: true, color: C.white });
    text(slide, node.body, node.x + 0.18, 3.82, 1.58, 0.72, { fontSize: 11, color: C.muted, valign: "top" });
    if (index < nodes.length - 1) text(slide, "→", node.x + 1.98, 3.42, 0.42, 0.3, { fontFace: F.mono, fontSize: 20, color: C.lime, align: "center" });
  });
  rect(slide, 1.0, 5.42, 11.28, 0.76, C.panel2, C.line);
  text(slide, "No claim request is approved automatically. The code is revealed only after the reporter accepts.", 1.28, 5.63, 10.75, 0.34, { fontSize: 14, color: C.limeSoft, align: "center" });
}

// 7. Activity and community
{
  const slide = newSlide();
  heading(slide, "Recovery contributes to campus trust", "06 / Community impact", "Profiles, activity history, stats, and a leaderboard make participation visible.");
  const screenshot = path.resolve(__dirname, "../README-assets/image_2.png");
  slide.addImage({ path: screenshot, x: 0.72, y: 2.12, w: 7.55, h: 4.25 });
  bullet(slide, "Personal activity", "Track reports, pending claims, and completed returns.", 8.78, 2.38, 3.8, C.lime);
  bullet(slide, "Trust score", "Helpful recoveries can earn points after a verified handoff.", 8.78, 3.48, 3.8, C.blue);
  bullet(slide, "Campus insights", "Aggregate views summarize reports and recovery activity.", 8.78, 4.58, 3.8, C.yellow);
  text(slide, "Earlier MVP screen capture", 0.74, 6.53, 4.5, 0.2, { fontSize: 9, color: C.muted, italic: true });
}

// 8. Architecture
{
  const slide = newSlide();
  heading(slide, "A web app with clear service boundaries", "07 / Under the hood", "React client, authenticated API, relational data, and optional third-party services.");
  const boxes = [
    { x: 0.86, title: "WEB CLIENT", tech: "React · Vite · Tailwind", c: C.lime },
    { x: 4.5, title: "API SERVER", tech: "Node.js · Express · JWT", c: C.blue },
    { x: 8.14, title: "DATA + SERVICES", tech: "Postgres · Sequelize · AI · Images", c: C.yellow },
  ];
  boxes.forEach((box) => {
    rect(slide, box.x, 2.62, 3.2, 1.74, C.panel, box.c);
    text(slide, box.title, box.x + 0.25, 2.95, 2.7, 0.34, { fontFace: F.display, fontSize: 11, bold: true, color: box.c, align: "center" });
    text(slide, box.tech, box.x + 0.28, 3.57, 2.64, 0.45, { fontFace: F.mono, fontSize: 11, color: C.white, align: "center" });
  });
  text(slide, "HTTPS / JSON", 3.76, 3.24, 0.7, 0.25, { fontFace: F.mono, fontSize: 8, color: C.muted, align: "center" });
  text(slide, "→", 4.04, 3.62, 0.4, 0.35, { fontFace: F.mono, fontSize: 19, bold: true, color: C.lime, align: "center" });
  text(slide, "SQL + API calls", 7.4, 3.24, 0.7, 0.25, { fontFace: F.mono, fontSize: 8, color: C.muted, align: "center" });
  text(slide, "→", 7.68, 3.62, 0.4, 0.35, { fontFace: F.mono, fontSize: 19, bold: true, color: C.lime, align: "center" });
  rect(slide, 1.2, 5.05, 10.9, 0.88, C.panel2, C.line);
  text(slide, "Firebase Auth / Google sign-in  ·  Cloudinary image storage  ·  OpenAI vision + embeddings", 1.5, 5.32, 10.3, 0.3, { fontFace: F.mono, fontSize: 11, color: C.muted, align: "center" });
  text(slide, "Some integrations require deployment credentials; email/password login and local development work independently.", 1.3, 6.22, 10.7, 0.35, { fontSize: 11, color: C.muted, align: "center" });
}

// 9. Demo and next steps
{
  const slide = newSlide();
  heading(slide, "See the recovery loop in action", "08 / Demo plan", "A focused walkthrough makes the product value visible in a few minutes.");
  const demo = [
    ["01", "Browse", "Scan the feed and filter lost vs. found reports."],
    ["02", "Inspect", "Open an item and review its photo, tags, and reporter."],
    ["03", "Claim", "Switch to another account and send proof context."],
    ["04", "Return", "Accept, arrange a meeting, and verify the handoff code."],
  ];
  demo.forEach((entry, i) => {
    const y = 2.25 + i * 0.88;
    text(slide, entry[0], 0.95, y, 0.65, 0.32, { fontFace: F.mono, fontSize: 17, bold: true, color: C.lime });
    text(slide, entry[1], 1.75, y, 1.7, 0.3, { fontFace: F.display, fontSize: 11, bold: true, color: C.white });
    text(slide, entry[2], 3.55, y, 5.6, 0.35, { fontSize: 14, color: C.muted });
  });
  rect(slide, 9.55, 2.18, 2.7, 3.65, C.lime, C.lime);
  text(slide, "uniFind", 9.82, 2.58, 2.15, 0.44, { fontFace: F.display, fontSize: 16, bold: true, color: C.bg, align: "center" });
  text(slide, "SNAP\nMATCH\nRECOVER", 9.82, 3.37, 2.15, 1.15, { fontFace: F.display, fontSize: 18, bold: true, color: C.bg, align: "center", breakLine: false, valign: "mid" });
  text(slide, "Questions?", 9.82, 5.04, 2.15, 0.35, { fontFace: F.mono, fontSize: 12, bold: true, color: C.bg, align: "center" });
  text(slide, "NEXT ITERATIONS", 0.98, 6.1, 2.7, 0.23, { fontFace: F.mono, fontSize: 9, bold: true, color: C.lime, charSpacing: 1.2 });
  text(slide, "Visual embeddings for matching · stronger moderation · campus-specific deployment and notification setup", 0.98, 6.43, 11.3, 0.35, { fontSize: 12, color: C.muted });
}

const output = path.resolve(__dirname, "../uniFind-Project-Overview.pptx");
pptx.writeFile({ fileName: output });