# RIK: The Guardian

RIK — Website Design & Development Brief

Project Overview

RIK is a pre-launch automotive safety hardware product currently in R&D. The website's sole purpose is to communicate the problem RIK solves, build desire, and capture early interest leads — not to sell or explain deep technical specs. The audience is Indian personal drivers, fleet owners, and automotive enthusiasts. The tone is cinematic, intelligent, and premium — think Apple meets automotive defense tech.

Brand Identity

Name: RIK Tagline: The Road Has Never Had a Guardian. Accent Color: #00D4FF (electric cyan) Secondary Accent: #7C3AED (deep violet) Background: Near-black #020408 Surface: #0A0E14 Body Text: #E8F0FE Muted Text: #6B7A8D Warning/Highlight: #FF6B2B Typography Direction: Pair a heavy geometric display font (Syne, Monument Extended, or equivalent) with a clean sans-serif body (Space Grotesk, DM Sans). All headings uppercase or mixed-case — no system fonts, no Inter.

Visual Language

Aesthetic: Dark cinematic glassmorphism. Think: frosted glass panels floating over deep space or a carbon-fiber cockpit. Every UI element should feel like it belongs in a military-grade dashboard or a Tesla interface — but more visceral and human.

Glassmorphic Treatment: All content cards, stat blocks, and form panels use frosted glass: background: rgba(255,255,255,0.04), backdrop-filter: blur(20px), border: 0.5px solid rgba(255,255,255,0.08), subtle inner glow on hover. Never white or solid backgrounds on content panels.

Motion Philosophy: Purposeful, not decorative. Every animation has a reason. Scroll drives the experience — the user is the director.

Lighting: Subtle cyan glow halos behind key UI elements. Thin animated scan lines. A faint perspective grid overlay on full-bleed sections (opacity: 0.04).

Video Assets & Scroll Behavior

Two provided video files:

Video 1 — Hero (rik_hero.mp4): A car driving on a highway, brief visual demonstration of RIK activating and detecting hazards. Short, cinematic, high production.

Video 2 — Exploded Product (rik_explode.mp4): The RIK hardware unit exploding into its component layers — camera, NPU board, radio array, chassis — floating apart and reassembling. This is the hero asset for the "Technology" section.

Scroll Scrubbing Implementation: Both videos must be scroll-scrubbed, not autoplay. Use GSAP ScrollTrigger (or equivalent) to map video.currentTime to scroll position. The user literally controls the video frame by frame with their scroll wheel.

Hero Section: Video 1 is full-bleed background. As the user scrolls down, the car drive plays forward. When the user reaches ~40% scroll of the hero, the car slows, RIK activates on-screen, and the first headline animates in over the video.

Technology Section: Video 2 sits centered, large format (80% viewport width). Scrolling forward explodes the hardware layers apart. Scrolling back reassembles them. Each layer pause point (camera layer, NPU layer, antenna layer) triggers a floating glassmorphic label to appear beside the corresponding component with a brief descriptor.

Performance Note: Compress both videos to WebM + MP4 fallback. Preload metadata only. Lazy-load Video 2 after hero is in view.

Page Structure & Section-by-Section Brief

Section 1 — Hero (Full Viewport)

Full-bleed scroll-scrubbed Video 1 beneath everything.

Minimal overlay: RIK logo top-left (circular dot + wordmark), a pill badge top-center reading R&D · Early Access, nothing else in the nav initially.

As the video scrubs to its midpoint, headline text slams in from below: THE ROAD HAS NEVER HAD A GUARDIAN. — massive, uppercase, display font.

Subhead fades in below: one sentence about offline V2V protection.

Two CTA buttons appear last (staggered): Register Interest (filled cyan) and See How It Works (ghost border).

A thin animated scroll indicator at the bottom (↓ Scroll to explore).

Section 2 — The Problem (Dark, Tight)

No video. Deep dark surface section.

Section label: THE PROBLEM in cyan, 11px, tracked out.

Headline: Roads shouldn't be a gamble. — 3rem display font.

Four glassmorphic problem cards in a 2×2 grid. Each card: icon (Tabler outline), bold problem title, 1-sentence description. Cards animate in staggered on scroll entry.

Problems: Blind curve pile-ups / Highway fatigue & micro-sleep / Unmapped hazards (cattle, tractors, potholes) / Dark breakdowns on state highways.

Stat bar below the grid — 3 numbers in a frosted row: 1.5km hazard radius · <20ms response time · 100% offline.

Section 3 — How RIK Works (Scroll-Scrubbed Video 2)

Section label: THE TECHNOLOGY

Headline left-aligned: One device. Six shields.

Video 2 (exploded hardware) is the centrepiece — large, centered, scroll-scrubbed.

As each hardware layer freezes mid-explosion, a floating glassmorphic label animates in beside it with the component name and one-line role. Labels use backdrop-filter: blur, cyan left-border accent, soft glow.

Components to label: Road Camera / Cabin NIR Camera / Edge NPU / C-V2X Radio / NavIC + 4G Modem / OBD-II Harness.

Below the video: a horizontal tag strip listing all specs as frosted pills.

Section 4 — What RIK Does (6 Feature Cards)

Section label: SIX SHIELDS

Headline: Always watching. Always offline.

3-column card grid (2-column on tablet, 1-column on mobile). Each card is glassmorphic with a large number 01–06 in low-opacity display font behind the content.

Card hover state: thin cyan top-border glow appears, card lifts 4px, label brightens.

Features (title + 2-line description + small tech tag):

V2V Hazard Mesh — Broadcasts hazard alerts up to 1.5km, zero internet. C-V2X · Offline

India-First Road AI — Trained on stray cattle, tractors, unmarked roads. Edge NPU · Local

Fatigue Coach — Detects micro-sleep before it happens. Voice + LED alert. NIR Camera · AI

Dead Vehicle Beacon — Supercapacitor keeps broadcasting even if your car dies. Supercap · V2X

Auto Crash eCall — IMU detects crash, calls emergency contacts, speaks your NavIC coordinates. IMU · NavIC

Smart Cabin Hub — Offline voice control, auto-mutes audio on alerts. Voice UI · BT/AUX

Section 5 — Interest Capture Form

Full-width dark section. Frosted glass form panel centered, max-width 680px.

Section label + heading: EARLY ACCESS — Get Notified First

Subtext: RIK is in active R&D. Register now to shape what we build and be first in line.

Form fields (2-column grid on desktop, 1-column mobile):

Full Name

Email Address

Phone Number

City

Vehicle Type (dropdown: Personal Car/SUV / Motorcycle / Commercial Truck / Fleet Owner / Other)

Which feature excites you most? (dropdown: all 6 features)

Are you a fleet owner or personal driver? (dropdown: Personal / Small Fleet 2–10 / Large Fleet 10+ / Logistics Business / Just Exploring)

Submit button: full-width, filled cyan, REGISTER MY INTEREST →

On success: form fades out, success state appears — large cyan text You're In. + confirmation line.

Fine print: We'll never spam. This helps us understand who needs RIK most.

Form Backend: Submit via fetch() POST (JSON, mode: no-cors) to a Google Apps Script webhook URL (to be provided by client). Payload must include all fields + ISO timestamp. No third-party form services.

Section 6 — Footer

Minimal. One line: RIK · Making Every Road Safer · Early R&D Phase · India

No social links yet.

Responsive Behavior

Mobile: Single column throughout. Videos still scroll-scrubbed but smaller viewport — ensure touch scroll triggers video scrubbing (touchmove event). Form goes single column. Hero headline scales down via clamp().

Tablet: 2-column feature grid, 2-column form.

Desktop: Full layout as described above.

Interactions & Micro-animations

Navbar appears on downscroll (hidden initially, fades in after 100px scroll).

Glassmorphic cards: hover lifts translateY(-4px) + cyan top-border glow.

Form inputs: focus state border-color: rgba(0,212,255,0.4) + faint cyan background tint.

CTA button: hover adds faint glow box-shadow: 0 0 20px rgba(0,212,255,0.3).

Stat numbers: count-up animation on scroll entry.

Section labels: slide in from left on scroll entry.

Deliverables Expected

Fully responsive single-page website (HTML/CSS/JS or React — dev's choice)

Both videos integrated with GSAP ScrollTrigger scrubbing

Google Sheets webhook integration (client provides URL before handoff)

Cross-browser tested (Chrome, Safari, Firefox)

Optimised for performance (Lighthouse score >85)

Video assets compressed and served as WebM + MP4 fallback

Assets Provided by Client

rik_hero.mp4 — car driving / product activation sequence

rik_explode.mp4 — hardware exploded-view animation

Google Apps Script webhook URL (provided before dev handoff)

Brand colors and copy (this document)

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://rikvision.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/22e60785-02a9-4be9-8775-1318443ddb99).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
