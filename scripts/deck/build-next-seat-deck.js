const path = require("path");
const fs = require("fs");
const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const Fa = require("react-icons/fa");

const CHARCOAL = "2B2B2B";
const CREAM = "F7F3EA";
const WHITE = "FFFFFF";
const GOLD = "B08D57";
const GOLD_DARK = "8A6D3B";
const INK = "2B2B2B";
const MUTED = "6B6B6B";
const GREEN = "3D6B47";
const RED = "8A2E22";

const FONT_HEAD = "Cambria";
const FONT_BODY = "Calibri";

const OUTPUT_DIR = path.join(__dirname, "output");
const OUTPUT_FILE = path.join(OUTPUT_DIR, "Next_Seat_Deck.pptx");

// ---------- Icon generation (react-icons -> SVG -> PNG data URI) ----------
async function iconUri(Comp, colorHex, px = 256) {
  const svg = ReactDOMServer.renderToStaticMarkup(React.createElement(Comp, { color: "#" + colorHex, size: px }));
  const buf = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + buf.toString("base64");
}

async function buildIconSet() {
  const specs = {
    chairGold: [Fa.FaChair, GOLD, 256],
    chairWhite: [Fa.FaChair, WHITE, 256],
    fingerprintWhite: [Fa.FaFingerprint, WHITE, 256],
    exchangeWhite: [Fa.FaExchangeAlt, WHITE, 256],
    clipboardWhite: [Fa.FaClipboardList, WHITE, 256],
    layersWhite: [Fa.FaLayerGroup, WHITE, 256],
    shieldWhite: [Fa.FaShieldAlt, WHITE, 200],
    cogsWhite: [Fa.FaCogs, WHITE, 200],
    syncWhite: [Fa.FaSyncAlt, WHITE, 200],
    handsWhite: [Fa.FaHandsHelping, WHITE, 200],
    chartGold: [Fa.FaChartLine, GOLD_DARK, 160],
    fingerprintGold: [Fa.FaFingerprint, GOLD_DARK, 160],
    usersGold: [Fa.FaUsers, GOLD_DARK, 160],
    eyeGold: [Fa.FaEye, GOLD_DARK, 160],
    checkGold: [Fa.FaCheckCircle, GOLD_DARK, 160],
    arrowUpGreen: [Fa.FaArrowCircleUp, GREEN, 200],
    arrowDownRed: [Fa.FaArrowCircleDown, RED, 200],
    questionGold: [Fa.FaQuestionCircle, GOLD_DARK, 200],
    seedlingGold: [Fa.FaSeedling, GOLD_DARK, 200],
    warningGold: [Fa.FaExclamationTriangle, GOLD_DARK, 200],
    routeGold: [Fa.FaRoute, GOLD_DARK, 200],
    balanceGold: [Fa.FaBalanceScale, WHITE, 200],
    friendsGold: [Fa.FaUserFriends, WHITE, 200],
  };
  const out = {};
  for (const [key, [Comp, color, px]] of Object.entries(specs)) {
    out[key] = await iconUri(Comp, color, px);
  }
  return out;
}

function newPres() {
  const p = new pptxgen();
  p.defineLayout({ name: "LAYOUT_WIDE", width: 13.3, height: 7.5 });
  p.layout = "LAYOUT_WIDE";
  return p;
}

function addMotif(slide, ICON) {
  slide.addImage({ data: ICON.chairGold, x: 12.55, y: 0.38, w: 0.34, h: 0.34, transparency: 15 });
}

function sectionNumber(slide, n) {
  slide.addText(n, { x: 0.6, y: 0.35, w: 1, h: 0.4, fontFace: FONT_BODY, fontSize: 11, color: GOLD, bold: true, charSpacing: 2, align: "left" });
}

function timeTag(slide, text) {
  slide.addText(text, { x: 11.1, y: 7.05, w: 1.8, h: 0.32, fontFace: FONT_BODY, fontSize: 10, bold: true, color: GOLD_DARK, align: "right" });
}

function dividerSlide(pres, ICON, iconKey, kicker, title, sub) {
  const s = pres.addSlide();
  s.background = { color: CHARCOAL };
  s.addImage({ data: ICON[iconKey], x: 0.9, y: 1.55, w: 0.75, h: 0.75 });
  s.addShape("line", { x: 0.9, y: 2.65, w: 0.6, h: 0, line: { color: GOLD, width: 2.5 } });
  s.addText(kicker.toUpperCase(), { x: 0.9, y: 2.8, w: 11, h: 0.4, fontFace: FONT_BODY, fontSize: 13, color: GOLD, bold: true, charSpacing: 3 });
  s.addText(title, { x: 0.9, y: 3.2, w: 11.5, h: 1.3, fontFace: FONT_HEAD, fontSize: 34, bold: true, color: WHITE });
  if (sub) {
    s.addText(sub, { x: 0.9, y: 4.45, w: 10.8, h: 0.8, fontFace: FONT_BODY, fontSize: 15, italic: true, color: "D8CBB0" });
  }
  return s;
}

function contentSlide(pres, ICON, num, kicker, title) {
  const s = pres.addSlide();
  s.background = { color: WHITE };
  sectionNumber(s, num);
  addMotif(s, ICON);
  s.addText(kicker.toUpperCase(), { x: 0.6, y: 0.62, w: 10, h: 0.35, fontFace: FONT_BODY, fontSize: 12, color: GOLD_DARK, bold: true, charSpacing: 2.5 });
  s.addText(title, { x: 0.6, y: 0.95, w: 11.5, h: 0.85, fontFace: FONT_HEAD, fontSize: 30, bold: true, color: INK });
  return s;
}

function promptBanner(slide, text, y) {
  slide.addShape("rect", { x: 0.6, y: y, w: 12.1, h: 0.85, fill: { color: CREAM }, line: { color: GOLD, width: 0.75 }, rectRadius: 0.06 });
  slide.addText(text, { x: 0.9, y: y, w: 11.5, h: 0.85, fontFace: FONT_HEAD, fontSize: 16, italic: true, color: GOLD_DARK, valign: "middle" });
}

function bulletBlock(slide, items, opts) {
  const o = Object.assign({ x: 0.6, y: 2.0, w: 5.7, fontSize: 14 }, opts);
  slide.addText(
    items.map((t, i) => ({ text: t, options: { bullet: { code: "2013" }, color: INK, fontSize: o.fontSize, breakLine: i !== items.length - 1, paraSpaceAfter: 10, fontFace: FONT_BODY } })),
    { x: o.x, y: o.y, w: o.w, h: o.h || 3.8, valign: "top" }
  );
}

function iconCircle(slide, x, y, iconUriData, color) {
  slide.addShape("ellipse", { x, y, w: 0.7, h: 0.7, fill: { color: color || CHARCOAL }, line: { type: "none" } });
  slide.addImage({ data: iconUriData, x: x + 0.17, y: y + 0.17, w: 0.36, h: 0.36 });
}

// ============ BUILD DECK ============
(async () => {
  const ICON = await buildIconSet();
  const pres = newPres();

  // 1. Title
  {
    const s = pres.addSlide();
    s.background = { color: CHARCOAL };
    s.addShape("line", { x: 1.0, y: 5.35, w: 11.3, h: 0, line: { color: GOLD, width: 1.5 } });
    s.addText("SESSION TITLE APPROVED — 47TH ANNUAL ACLAIMH CONFERENCE", { x: 1.0, y: 1.15, w: 11.3, h: 0.4, fontFace: FONT_BODY, fontSize: 12, color: GOLD, charSpacing: 3, bold: true });
    s.addText("The Next Seat at the Table", { x: 1.0, y: 1.75, w: 11.3, h: 1.3, fontFace: FONT_HEAD, fontSize: 44, bold: true, color: WHITE });
    s.addText("Leading Before You Have the Title", { x: 1.0, y: 2.95, w: 11.3, h: 0.7, fontFace: FONT_HEAD, fontSize: 22, italic: true, color: GOLD });
    s.addText("Coach Bernadette L. Reed, M.A.", { x: 1.0, y: 5.6, w: 8, h: 0.4, fontFace: FONT_BODY, fontSize: 15, color: WHITE, bold: true });
    s.addText("Program Director, Travelers Safe Haven & Travelers Inn Stabilization | Urban Pathways", { x: 1.0, y: 5.98, w: 10, h: 0.4, fontFace: FONT_BODY, fontSize: 12, color: "C9BFA5" });
    s.addImage({ data: ICON.chairGold, x: 11.5, y: 5.55, w: 1.0, h: 1.0, transparency: 25 });
  }

  // 2. Opening Hook
  {
    const s = contentSlide(pres, ICON, "01", "Opening", "Picture Your Next Seat");
    promptBanner(s, "Supervisor. Director. Vice President. Whatever your next seat is — picture it now.", 2.05);
    bulletBlock(s, ["Hold that seat in your mind for a moment.", "Now ask yourself one honest question:"], { y: 3.15, w: 11.8, fontSize: 16 });
    s.addText("What are you doing TODAY that gives evidence you're ready for it?", { x: 0.6, y: 4.15, w: 12.1, h: 1, fontFace: FONT_HEAD, fontSize: 24, bold: true, color: GOLD_DARK });
    s.addText("AUDIENCE PARTICIPATES: 30 seconds, silent reflection — no sharing yet", { x: 0.6, y: 6.5, w: 11, h: 0.35, fontFace: FONT_BODY, fontSize: 11, italic: true, color: MUTED });
    timeTag(s, "3 MIN");
  }

  // 3. Leadership Before the Title
  {
    const s = contentSlide(pres, ICON, "02", "Framing", "Leadership Does Not Begin With a Title");
    bulletBlock(s, ["It begins in the quiet, unwitnessed decisions.", "The accountability you hold yourself to.", "The trust you build without being asked.", "The presence you carry into rooms before you've earned a seat."], { y: 2.1, fontSize: 16, w: 6.3 });
    s.addShape("rect", { x: 7.1, y: 2.1, w: 5.6, h: 3.6, fill: { color: CHARCOAL } });
    s.addText("“This session is grounded in lived experience, tested in real conditions and not theorized in a classroom.”", { x: 7.5, y: 2.5, w: 4.8, h: 2.8, fontFace: FONT_HEAD, fontSize: 17, italic: true, color: WHITE, valign: "middle" });
    s.addNotes("PRESENTER STORY CUE: a time you demonstrated leadership before you had formal authority. Lesson to reinforce: readiness shows up in behavior long before a title catches up to it.");
    timeTag(s, "3 MIN");
  }

  // 4. What Readiness Actually Looks Like (story cue moved to notes, banner removed)
  {
    const s = contentSlide(pres, ICON, "03", "Readiness", "What Readiness Actually Looks Like");
    bulletBlock(s, ["Flagging a problem before it becomes a crisis", "Covering a gap without making it a whole thing", "Giving honest feedback directly, not around someone", "Asking “what do you need from me” before being told"], { y: 2.1, w: 11.8, fontSize: 17 });
    s.addShape("rect", { x: 0.6, y: 4.7, w: 12.1, h: 1.6, fill: { color: CREAM }, line: { color: GOLD, width: 0.75 }, rectRadius: 0.06 });
    s.addImage({ data: ICON.checkGold, x: 0.9, y: 5.05, w: 0.7, h: 0.7 });
    s.addText("A case manager notices a client's housing paperwork is about to lapse because a teammate dropped the ball. Quietly fixing it hides the problem. Fixing it AND flagging the pattern is the leadership move.", { x: 1.8, y: 4.7, w: 10.7, h: 1.6, valign: "middle", fontFace: FONT_BODY, fontSize: 14, italic: true, color: INK });
    timeTag(s, "4 MIN");
  }

  // 5. Readiness Leaves Evidence (one-liner)
  {
    const s = pres.addSlide();
    s.background = { color: CHARCOAL };
    addMotif(s, ICON);
    s.addText("READINESS LEAVES EVIDENCE.", { x: 0.9, y: 3.0, w: 11.5, h: 1.3, fontFace: FONT_HEAD, fontSize: 40, bold: true, color: WHITE });
    s.addText("Nobody should have to imagine what kind of leader you'll become.\nThey should already be seeing pieces of that leader in how you operate today.", { x: 0.9, y: 4.25, w: 10.8, h: 1.1, fontFace: FONT_BODY, fontSize: 16, italic: true, color: "D8CBB0" });
    timeTag(s, "2 MIN");
  }

  // 6. Name Equity divider
  dividerSlide(pres, ICON, "fingerprintWhite", "New Concept", "Name Equity™", "Sometimes your name enters the room before you do.");

  // 7. Name Equity definition
  {
    const s = contentSlide(pres, ICON, "05", "Name Equity™", "The Professional Value Attached to Your Name");
    s.addText("Name Equity is the professional value attached to your name based on people's repeated experiences with your character, competence, consistency, and contribution.", { x: 0.6, y: 1.95, w: 11.8, h: 1.3, fontFace: FONT_BODY, fontSize: 17, color: INK });
    promptBanner(s, "A title gives you authority when you're in the room. A reputation gives you influence when you're not.", 3.5);
    bulletBlock(s, ["Executive meetings", "Succession-planning conversations", "Hiring discussions", "Strategic planning and partnership conversations"], { y: 4.75, w: 11.8, fontSize: 14 });
    s.addText("Rooms you don't have access to yet — where your reputation may already be representing you.", { x: 0.6, y: 6.35, w: 11.8, h: 0.4, fontFace: FONT_BODY, fontSize: 12, italic: true, color: MUTED });
    timeTag(s, "3 MIN");
  }

  // 8. When Your Name Enters the Room — activity setup
  {
    const s = contentSlide(pres, ICON, "06", "Interactive Activity", "When Your Name Enters the Room");
    promptBanner(s, "There's a leadership meeting tomorrow at your organization. You're not invited. Your name comes up.", 1.95);
    bulletBlock(s, ["What three words would you HOPE are used to describe you?", "What have you done in the last 90 days to earn those words?", "Where's the gap between the reputation you want and the evidence you're giving?"], { y: 3.1, w: 11.8, fontSize: 16 });
    s.addText("3–5 minutes individual reflection, then optional pair-share", { x: 0.6, y: 5.7, w: 11, h: 0.4, fontFace: FONT_BODY, fontSize: 12, italic: true, color: MUTED });
    timeTag(s, "5 MIN");
  }

  // 9. Four Dimensions
  {
    const s = contentSlide(pres, ICON, "07", "Name Equity™ Framework", "Character, Competence, Consistency, Contribution");
    const items = [
      { icon: ICON.shieldWhite, t: "Character", q: "Can I trust you?" },
      { icon: ICON.cogsWhite, t: "Competence", q: "Can you handle it?" },
      { icon: ICON.syncWhite, t: "Consistency", q: "Can I depend on you?" },
      { icon: ICON.handsWhite, t: "Contribution", q: "Is this team better because you're here?" },
    ];
    const positions = [[0.6, 2.05], [6.75, 2.05], [0.6, 4.35], [6.75, 4.35]];
    items.forEach((it, i) => {
      const [x, y] = positions[i];
      s.addShape("rect", { x, y, w: 5.9, h: 1.95, fill: { color: CREAM }, line: { color: GOLD, width: 0.75 }, rectRadius: 0.06 });
      iconCircle(s, x + 0.3, y + 0.3, it.icon, GOLD_DARK);
      s.addText(it.t, { x: x + 1.25, y: y + 0.25, w: 4.2, h: 0.5, fontFace: FONT_HEAD, fontSize: 19, bold: true, color: INK });
      s.addText(it.q, { x: x + 1.25, y: y + 0.8, w: 4.4, h: 0.9, fontFace: FONT_BODY, fontSize: 14, italic: true, color: GOLD_DARK });
    });
    timeTag(s, "4 MIN");
  }

  // 10. Deposits and Withdrawals
  {
    const s = contentSlide(pres, ICON, "08", "Professional Currency", "Deposits and Withdrawals");
    s.addShape("rect", { x: 0.6, y: 2.0, w: 5.8, h: 4.3, fill: { color: "EEF4EE" }, line: { color: "6B9E78", width: 0.75 }, rectRadius: 0.06 });
    s.addImage({ data: ICON.arrowUpGreen, x: 0.9, y: 2.2, w: 0.45, h: 0.45 });
    s.addText("DEPOSITS", { x: 1.45, y: 2.22, w: 4, h: 0.4, fontFace: FONT_HEAD, fontSize: 16, bold: true, color: GREEN });
    bulletBlock(s, ["Keeping commitments", "Bringing solutions, not just problems", "Sharing credit", "Being coachable", "Protecting confidentiality"], { x: 0.9, y: 2.85, w: 5.3, fontSize: 13 });
    s.addShape("rect", { x: 6.85, y: 2.0, w: 5.8, h: 4.3, fill: { color: "F7E9E8" }, line: { color: "B85042", width: 0.75 }, rectRadius: 0.06 });
    s.addImage({ data: ICON.arrowDownRed, x: 7.15, y: 2.2, w: 0.45, h: 0.45 });
    s.addText("WITHDRAWALS", { x: 7.7, y: 2.22, w: 4, h: 0.4, fontFace: FONT_HEAD, fontSize: 16, bold: true, color: RED });
    bulletBlock(s, ["Chronic unreliability", "Gossip", "Blaming others", "Overpromising, underdelivering", "Taking credit for others' work"], { x: 7.15, y: 2.85, w: 5.3, fontSize: 13 });
    timeTag(s, "4 MIN");
  }

  // 11. Likable vs Recommendable
  {
    const s = pres.addSlide();
    s.background = { color: CHARCOAL };
    addMotif(s, ICON);
    s.addImage({ data: ICON.balanceGold, x: 0.9, y: 1.55, w: 0.8, h: 0.8 });
    s.addText("Being liked is not the same as being recommendable.", { x: 0.9, y: 2.9, w: 11.5, h: 1.2, fontFace: FONT_HEAD, fontSize: 32, bold: true, color: WHITE });
    s.addText("When someone recommends you, they attach their own credibility to your name.", { x: 0.9, y: 4.15, w: 10.8, h: 0.7, fontFace: FONT_BODY, fontSize: 15, italic: true, color: "D8CBB0" });
    timeTag(s, "2 MIN");
  }

  // 12. Influence Without Authority
  {
    const s = contentSlide(pres, ICON, "09", "Objective 2", "Build Influence That Outlasts a Title");
    bulletBlock(s, ["People come to you for advice, though they don't report to you", "Your name comes up when leadership thinks about who could take on more", "You can disagree without damaging the relationship", "Small follow-through earns the right to be trusted with big things"], { y: 2.05, w: 11.8, fontSize: 16 });
    s.addNotes("PRESENTER STORY CUE: being recommended for an opportunity because someone had already experienced your work. Lesson to reinforce: influence often travels through other people's direct experience of you, not your own self-promotion.");
    timeTag(s, "3 MIN");
  }

  // 13. Opportunity Positioning formula
  {
    const s = contentSlide(pres, ICON, "10", "Positioning, Not a Guarantee", "Opportunity Positioning");
    const terms = [
      { t: "Performance", icon: ICON.chartGold },
      { t: "Reputation", icon: ICON.fingerprintGold },
      { t: "Relationships", icon: ICON.usersGold },
      { t: "Visibility", icon: ICON.eyeGold },
      { t: "Readiness", icon: ICON.checkGold },
    ];
    let x = 0.6;
    const w = 2.0, gap = 0.25;
    terms.forEach((term, i) => {
      s.addShape("rect", { x, y: 2.1, w, h: 1.5, fill: { color: CREAM }, line: { color: GOLD, width: 0.75 }, rectRadius: 0.06 });
      s.addImage({ data: term.icon, x: x + (w - 0.5) / 2, y: 2.25, w: 0.5, h: 0.5 });
      s.addText(term.t, { x, y: 2.8, w, h: 0.7, align: "center", valign: "top", fontFace: FONT_BODY, fontSize: 13, bold: true, color: INK });
      x += w + gap;
      if (i < terms.length - 1) {
        s.addText("+", { x: x - gap, y: 2.1, w: gap, h: 1.5, align: "center", valign: "middle", fontFace: FONT_BODY, fontSize: 18, bold: true, color: GOLD_DARK });
      }
    });
    s.addText("=", { x: 12.1, y: 2.1, w: 0.4, h: 1.5, align: "center", valign: "middle", fontFace: FONT_BODY, fontSize: 20, bold: true, color: GOLD_DARK });
    s.addShape("rect", { x: 0.6, y: 3.95, w: 11.9, h: 1.0, fill: { color: CHARCOAL }, rectRadius: 0.06 });
    s.addText("OPPORTUNITY POSITIONING", { x: 0.6, y: 3.95, w: 11.9, h: 1.0, align: "center", valign: "middle", fontFace: FONT_HEAD, fontSize: 22, bold: true, color: GOLD });
    s.addText("This creates positioning for opportunity. It is not a guarantee of promotion. Politics, bias, access, sponsorship, and timing all matter too.", { x: 0.6, y: 5.25, w: 11.8, h: 0.9, fontFace: FONT_BODY, fontSize: 14, italic: true, color: MUTED });
    timeTag(s, "4 MIN");
  }

  // 14. Succession Planning
  {
    const s = contentSlide(pres, ICON, "11", "For Every Level in the Room", "Don't Wait for the Vacancy");
    s.addShape("rect", { x: 0.6, y: 2.0, w: 5.8, h: 2.3, fill: { color: CREAM }, line: { color: GOLD, width: 0.75 }, rectRadius: 0.06 });
    s.addText("FOR EMERGING LEADERS", { x: 0.9, y: 2.2, w: 5.2, h: 0.4, fontFace: FONT_BODY, fontSize: 12, bold: true, color: GOLD_DARK, charSpacing: 1.5 });
    s.addText("“Don't wait for the vacancy to start preparing for the position.”", { x: 0.9, y: 2.65, w: 5.2, h: 1.4, fontFace: FONT_HEAD, fontSize: 16, italic: true, color: INK });
    s.addShape("rect", { x: 6.85, y: 2.0, w: 5.8, h: 2.3, fill: { color: CREAM }, line: { color: GOLD, width: 0.75 }, rectRadius: 0.06 });
    s.addText("FOR ORGANIZATIONAL LEADERS", { x: 7.15, y: 2.2, w: 5.2, h: 0.4, fontFace: FONT_BODY, fontSize: 12, bold: true, color: GOLD_DARK, charSpacing: 1.5 });
    s.addText("“Don't wait for the vacancy to start developing your successor.”", { x: 7.15, y: 2.65, w: 5.2, h: 1.4, fontFace: FONT_HEAD, fontSize: 16, italic: true, color: INK });
    s.addText("Succession planning is an ongoing leadership responsibility, not something that starts after someone resigns.", { x: 0.6, y: 4.6, w: 11.8, h: 0.7, fontFace: FONT_BODY, fontSize: 14, color: MUTED, italic: true });
    timeTag(s, "3 MIN");
  }

  // 15. Ready or Not Yet? instructions
  {
    const s = contentSlide(pres, ICON, "12", "Interactive Activity", "Ready or Not Yet?");
    s.addImage({ data: ICON.questionGold, x: 0.6, y: 2.05, w: 0.85, h: 0.85 });
    bulletBlock(s, ["You'll see a short employee scenario.", "Decide: is this person demonstrating leadership readiness, or not yet?", "Some are obvious. Most are not."], { x: 1.7, y: 2.1, w: 10.7, fontSize: 17 });
    timeTag(s, "1 MIN");
  }

  // Core scenarios 16-18
  const coreScenarios = [
    { n: "13", title: "Scenario: The Quiet Fixer", text: "A dependable employee consistently solves problems and develops coworkers, but receives little visibility for it." },
    { n: "14", title: "Scenario: The Charismatic Idea Machine", text: "A charismatic employee generates great ideas constantly, but rarely follows through on execution." },
    { n: "15", title: "Scenario: The Technically Excellent Gossip", text: "A technically excellent employee delivers strong results but consistently gossips about coworkers." },
  ];
  coreScenarios.forEach((sc) => {
    const s = contentSlide(pres, ICON, sc.n, "Ready or Not Yet?", sc.title);
    s.addShape("rect", { x: 0.6, y: 2.1, w: 12.1, h: 1.5, fill: { color: CREAM }, line: { color: GOLD, width: 0.75 }, rectRadius: 0.06 });
    s.addText(sc.text, { x: 0.95, y: 2.1, w: 11.4, h: 1.5, valign: "middle", fontFace: FONT_BODY, fontSize: 17, italic: true, color: INK });
    s.addShape("rect", { x: 0.6, y: 3.9, w: 5.85, h: 0.9, fill: { color: "EEF4EE" }, rectRadius: 0.06 });
    s.addText("READY", { x: 0.6, y: 3.9, w: 5.85, h: 0.9, align: "center", valign: "middle", fontFace: FONT_HEAD, fontSize: 20, bold: true, color: GREEN });
    s.addShape("rect", { x: 6.65, y: 3.9, w: 5.85, h: 0.9, fill: { color: "F7E9E8" }, rectRadius: 0.06 });
    s.addText("NOT YET", { x: 6.65, y: 3.9, w: 5.85, h: 0.9, align: "center", valign: "middle", fontFace: FONT_HEAD, fontSize: 20, bold: true, color: RED });
    s.addText("Facilitator: reveal talking points after the room votes (see guide)", { x: 0.6, y: 5.1, w: 11, h: 0.4, fontFace: FONT_BODY, fontSize: 11, italic: true, color: MUTED });
    timeTag(s, "3 MIN");
  });

  // 19. Peer-to-Leader divider
  dividerSlide(pres, ICON, "exchangeWhite", "Objective 3", "The Peer-to-Leader Transition", "Your title can change overnight. Your reputation doesn't.");

  // 20. Your Title Changed Now What
  {
    const s = contentSlide(pres, ICON, "17", "The Transition", "Your Title Changed. Now What?");
    bulletBlock(s, ["Establish new boundaries without pretending nothing changed", "Address favoritism risk directly and early", "Have the difficult conversation instead of avoiding it", "Hold former peers accountable, with respect"], { y: 2.0, w: 5.8, fontSize: 14 });
    bulletBlock(s, ["Protect confidentiality that comes with the role", "Use supervisory authority without overcompensating into authoritarian", "Separate friendship from supervisory responsibility", "Set expectations early, don't let silence set them for you"], { x: 6.75, y: 2.0, w: 5.8, fontSize: 14 });
    s.addImage({ data: ICON.friendsGold, x: 5.9, y: 5.75, w: 1.5, h: 1.5, transparency: 82 });
    s.addNotes("PRESENTER STORY CUE: transitioning from peer relationships into supervisory responsibility. Lesson to reinforce: the relationship doesn't have to end, but it does have to change.");
    timeTag(s, "4 MIN");
  }

  // 21. Common New-Leader Mistakes
  {
    const s = contentSlide(pres, ICON, "18", "What Trips New Leaders Up", "Common New-Leader Mistakes");
    s.addImage({ data: ICON.warningGold, x: 0.6, y: 2.05, w: 0.75, h: 0.75 });
    bulletBlock(s, ["Avoiding the hard conversation because “we used to be friends”", "Doing everything yourself instead of developing others", "Overcorrecting into unnecessary authority to prove the title is earned", "Managing resentment by disappearing instead of addressing it"], { x: 1.6, y: 2.1, w: 10.8, fontSize: 16 });
    s.addNotes("PRESENTER STORY CUE: a mistake you made as a developing leader and what it taught you. Lesson to reinforce: even experienced leaders made these mistakes on the way up.");
    timeTag(s, "3 MIN");
  }

  // 22. Developing Others
  {
    const s = contentSlide(pres, ICON, "19", "The Real Shift", "Developing Others, Not Doing Everything Yourself");
    s.addImage({ data: ICON.seedlingGold, x: 0.6, y: 2.05, w: 0.75, h: 0.75 });
    bulletBlock(s, ["Delegation is a leadership skill, not a loss of control", "Your job changes from doing the work to multiplying the work", "Sometimes leadership means making a decision people won't like"], { x: 1.6, y: 2.1, w: 10.8, fontSize: 16 });
    s.addNotes("PRESENTER STORY CUE: recognizing leadership potential in an employee before that person received a promotion. Lesson to reinforce: part of your own leadership evidence is spotting readiness in others.");
    timeTag(s, "3 MIN");
  }

  // 23. Action Plan divider
  dividerSlide(pres, ICON, "clipboardWhite", "Objective 4", "Your Personal Leadership Action Plan", "Leave with a plan, not just a lesson.");

  // 24. Action Plan worksheet overview
  {
    const s = contentSlide(pres, ICON, "21", "Leadership Action Plan", "Nine Prompts, One Plan");
    const prompts = ["My Next Seat", "My Name Equity", "My Evidence", "My Gap", "My Next Deposit", "My Development Gap", "My Visibility Plan", "My Relationship Plan", "My Accountability"];
    let col = 0, row = 0;
    const cw = 3.9, ch = 1.15, startX = 0.6, startY = 2.0;
    prompts.forEach((p) => {
      const x = startX + col * (cw + 0.15);
      const y = startY + row * (ch + 0.15);
      s.addShape("rect", { x, y, w: cw, h: ch, fill: { color: CREAM }, line: { color: GOLD, width: 0.6 }, rectRadius: 0.05 });
      s.addText(p, { x, y, w: cw, h: ch, align: "center", valign: "middle", fontFace: FONT_BODY, fontSize: 13, bold: true, color: GOLD_DARK });
      col++;
      if (col === 3) { col = 0; row++; }
    });
    s.addText("Full worksheet distributed as a handout — walk through it live, prompt by prompt", { x: 0.6, y: 6.35, w: 11.8, h: 0.4, fontFace: FONT_BODY, fontSize: 12, italic: true, color: MUTED });
    timeTag(s, "6 MIN");
  }

  // 25. Closing Reflection
  {
    const s = pres.addSlide();
    s.background = { color: CHARCOAL };
    addMotif(s, ICON);
    s.addText("Back to your next seat.", { x: 0.9, y: 2.2, w: 11, h: 0.9, fontFace: FONT_HEAD, fontSize: 30, bold: true, color: WHITE });
    s.addText("Are you currently giving your organization evidence that you're ready for it?", { x: 0.9, y: 3.15, w: 10.8, h: 0.9, fontFace: FONT_BODY, fontSize: 18, italic: true, color: "D8CBB0" });
    timeTag(s, "2 MIN");
  }

  // 26. Signature Message
  {
    const s = pres.addSlide();
    s.background = { color: CHARCOAL };
    s.addText("“Your next seat at the table isn't earned the day you're promoted. It's earned by the way you show up long before anyone offers you the chair.”", { x: 1.3, y: 2.4, w: 10.7, h: 2.6, fontFace: FONT_HEAD, fontSize: 28, italic: true, bold: true, color: WHITE, align: "center", valign: "middle" });
    timeTag(s, "1 MIN");
  }

  // 27. Closing Name Equity callback
  {
    const s = pres.addSlide();
    s.background = { color: CHARCOAL };
    addMotif(s, ICON);
    s.addText("Sometimes the first thing that reaches your next table won't be your résumé.", { x: 0.9, y: 2.0, w: 11.2, h: 0.8, fontFace: FONT_BODY, fontSize: 18, color: "D8CBB0" });
    s.addText("It may be your name.", { x: 0.9, y: 2.85, w: 11.2, h: 0.8, fontFace: FONT_HEAD, fontSize: 26, bold: true, color: GOLD });
    s.addText("Build a reputation that reaches the room before you do.", { x: 0.9, y: 3.9, w: 11.2, h: 0.8, fontFace: FONT_HEAD, fontSize: 22, italic: true, color: WHITE });
    s.addText("Thank you.", { x: 0.9, y: 5.6, w: 6, h: 0.6, fontFace: FONT_BODY, fontSize: 16, color: "9A9A9A" });
    timeTag(s, "1 MIN");
  }

  // -------- Appendix --------
  dividerSlide(pres, ICON, "layersWhite", "If Time Allows", "Optional Content", "Use only if the core session is running ahead of schedule.");

  const optionalScenarios = [
    { n: "A1", title: "Scenario: The Dependable Avoider", text: "A dependable employee never misses a deadline, but consistently avoids difficult conversations with peers." },
    { n: "A2", title: "Scenario: The Overloaded High Performer", text: "A high performer delivers excellent individual results but struggles to delegate any part of their work." },
    { n: "A3", title: "Scenario: The Respectful Challenger", text: "An employee challenges leadership decisions openly, but always does so professionally and privately first." },
    { n: "A4", title: "Scenario: The Boundary Crosser", text: "An employee takes initiative constantly, but routinely steps outside their role's appropriate boundaries to do it." },
  ];
  optionalScenarios.forEach((sc) => {
    const s = contentSlide(pres, ICON, sc.n, "Ready or Not Yet? (Optional)", sc.title);
    s.addShape("rect", { x: 0.6, y: 2.1, w: 12.1, h: 1.5, fill: { color: CREAM }, line: { color: GOLD, width: 0.75 }, rectRadius: 0.06 });
    s.addText(sc.text, { x: 0.95, y: 2.1, w: 11.4, h: 1.5, valign: "middle", fontFace: FONT_BODY, fontSize: 17, italic: true, color: INK });
    s.addShape("rect", { x: 0.6, y: 3.9, w: 5.85, h: 0.9, fill: { color: "EEF4EE" }, rectRadius: 0.06 });
    s.addText("READY", { x: 0.6, y: 3.9, w: 5.85, h: 0.9, align: "center", valign: "middle", fontFace: FONT_HEAD, fontSize: 20, bold: true, color: GREEN });
    s.addShape("rect", { x: 6.65, y: 3.9, w: 5.85, h: 0.9, fill: { color: "F7E9E8" }, rectRadius: 0.06 });
    s.addText("NOT YET", { x: 6.65, y: 3.9, w: 5.85, h: 0.9, align: "center", valign: "middle", fontFace: FONT_HEAD, fontSize: 20, bold: true, color: RED });
    timeTag(s, "OPTIONAL");
  });

  {
    const s = contentSlide(pres, ICON, "A5", "Optional Deep Dive", "What Also Shapes Advancement");
    s.addImage({ data: ICON.routeGold, x: 0.6, y: 2.05, w: 0.75, h: 0.75 });
    bulletBlock(s, ["Organizational politics and unconscious bias", "Unequal access to sponsorship and visibility", "Relationships, timing, and opportunity", "Readiness positions you. It does not guarantee the outcome by itself."], { x: 1.6, y: 2.1, w: 10.8, fontSize: 16 });
    timeTag(s, "OPTIONAL");
  }

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  await pres.writeFile({ fileName: OUTPUT_FILE });
  console.log(`Deck written to ${OUTPUT_FILE}`);
})();
