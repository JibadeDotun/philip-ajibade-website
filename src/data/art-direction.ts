export type ArtVisual = { src: string; alt: string; caption?: string; width: number; height: number; wide?: boolean };

export type ArtProject = {
  slug: string;
  name: string;
  title: string;
  summary: string;
  year: string;
  format: string;
  role: string;
  studio: string;
  studioLabel?: string;
  briefTitle?: string;
  contributionTitle?: string;
  recognition: string[];
  brief: string[];
  contribution: string[];
  credits: { role: string; name: string }[];
  film?: { title: string; embedUrl: string; watchUrl: string };
  cover?: ArtVisual;
  visuals: ArtVisual[];
  /** Keep false until real visuals and Philip's own account of his role are in place. */
  published: boolean;
};

export const artProjects: ArtProject[] = [{
  slug: "the-song-maiden",
  name: "The Song Maiden",
  title: "Art direction for an award-winning animated short",
  summary: "A hand-drawn 2D animated short about child marriage, produced at Disrupt DNA Studios. Best Animation at the 2022 AFRIFF Globe Awards.",
  year: "2022",
  format: "2D animated short film",
  role: "Art Director & Graphic Designer",
  studio: "Disrupt DNA Studios",
  briefTitle: "The film",
  recognition: [
    "Best Animation, AFRIFF Globe Awards 2022",
    "Nominee, Best Short Film, AMVCA 2023",
  ],
  brief: [
    "The Song Maiden is a traditional frame-by-frame 2D animated short about child marriage and the value of the girl child. In the fictional village of Song, a girl is promised in marriage at birth, marked by a red ribbon on each wrist. She grows up curious and independent, hunting lizards with her friends and climbing the mountain where she feels free, until she is married as a teenager and decides to escape her fate.",
    "Producer and creative director Nkem Nwaturuocha drew the story from a visit to Sukur, the UNESCO World Heritage cultural landscape in Adamawa State, Nigeria. Song is fictional, but it draws a deliberate parallel with that place.",
  ],
  contribution: [
    "I was the art director and graphic designer on the film, working with a team of illustrators, animators and video editors.",
    "With the illustrators, I shaped the characters, starting with the Maiden. Her expressions had to carry defiance and curiosity, and follow her change from an outsider in her own village to someone who fights for her freedom.",
    "I treated the village, the mountains and the woods as part of the story rather than as backdrops. The village holds both the warmth of tradition and the weight of expectation; the mountain is where the Maiden feels free.",
    "With the animators, I worked on movement and on a shift in animation style when the Maiden's world turns dark. With the video editors, I shaped the transitions so that her flight to the mountain reads as an emotional climb as well as a physical one.",
  ],
  credits: [
    { role: "Writer, Director & Producer", name: "Nkem Nwaturuocha" },
    { role: "Art Director & Graphic Designer", name: "Philip Ajibade" },
    { role: "Studio", name: "Disrupt DNA Studios" },
    { role: "Images", name: "The Song Maiden art book, Disrupt DNA Studios" },
  ],
  film: { title: "The Song Maiden, full short film on YouTube", embedUrl: "https://www.youtube-nocookie.com/embed/Q3UsmRP-u8g?rel=0", watchUrl: "https://www.youtube.com/watch?v=Q3UsmRP-u8g" },
  cover: { src: "/art-direction/the-song-maiden/village-of-song.jpg", alt: "Greyscale painting of the village of Song at night, beneath a full moon and three flat-topped mountains, framed by trees and rocks.", width: 2000, height: 855 },
  visuals: [
    { src: "/art-direction/the-song-maiden/maiden-key-art.jpg", alt: "Key art of the Maiden holding a glowing light, with The Song Maiden title and the line freedom or nothing.", caption: "Key art · The Maiden and the film's title mark.", width: 880, height: 855 },
    { src: "/art-direction/the-song-maiden/maiden-on-the-clifftop.jpg", alt: "The Maiden standing on a clifftop with her arms spread wide against a pale sky.", caption: "The mountain · Where the Maiden feels free.", width: 1180, height: 855 },
    { src: "/art-direction/the-song-maiden/expressions-and-title.jpg", alt: "Pencil expression sheet of the Maiden beside the hand-lettered Song Maiden title with a red ribbon.", caption: "Expression studies and title lettering.", width: 2000, height: 855, wide: true },
    { src: "/art-direction/the-song-maiden/character-lineup.jpg", alt: "Line-up of the film's characters in greyscale, from the Maiden's betrothed to her parents, friends and villagers.", caption: "Character line-up · The people of Song.", width: 1400, height: 855, wide: true },
    { src: "/art-direction/the-song-maiden/maiden-hair-and-pov.jpg", alt: "Studies of the Maiden's hair and frames shown from her point of view.", caption: "The Maiden's hair, and the village seen through her eyes.", width: 2000, height: 855, wide: true },
    { src: "/art-direction/the-song-maiden/colour-keys-and-hut.jpg", alt: "Character colour studies of a villager and the betrothed, alongside paintings of a thatched hut inside and out.", caption: "Character colour and the village interiors.", width: 2000, height: 855, wide: true },
    { src: "/art-direction/the-song-maiden/storyboards.jpg", alt: "Storyboard strips and rough sketches for the film's opening birth sequence.", caption: "Storyboards and rough sketches.", width: 2000, height: 855, wide: true },
    { src: "/art-direction/the-song-maiden/red-ribbon-colour-moments.jpg", alt: "Frames where colour breaks into the greyscale world: a red ribbon against blue sky, red ribbons on a wrist and a glowing amber light.", caption: "Colour in a greyscale world · The red ribbon of the betrothal, and an amber light.", width: 2000, height: 855, wide: true },
    { src: "/art-direction/the-song-maiden/mountain-woods.jpg", alt: "Greyscale painting of tall grass and plants at the foot of a rock face.", caption: "Environment · The woods at the foot of the mountain.", width: 2000, height: 855, wide: true },
    { src: "/art-direction/the-song-maiden/environments-and-cave.jpg", alt: "Landscape studies of the plains and a great tree, with a cave scene of a woman and two children.", caption: "Landscape studies and a cave scene.", width: 2000, height: 855, wide: true },
    { src: "/art-direction/the-song-maiden/cliffs.jpg", alt: "Studies of steep cliffs and mist, with the Maiden small on a ledge.", caption: "Environment · The cliffs the Maiden climbs.", width: 2000, height: 855, wide: true },
  ],
  published: true,
}, {
  slug: "breezepay",
  name: "BreezePay",
  title: "A brand identity for cardless, cashless payments",
  summary: "Corporate identity and style guide for BreezePay, a cardless payment platform integrated with Access Bank, created at Disrupt DNA.",
  year: "",
  format: "Brand identity & style guide",
  role: "Art Director",
  studio: "Disrupt DNA for Access Bank",
  studioLabel: "Agency & client",
  recognition: [],
  brief: [
    "BreezePay is a cardless digital payment platform integrated with Access Bank through the AccessMore mobile app and USSD channels. It lets people pay at POS terminals, in online stores and at participating merchants without a physical debit card.",
    "As a new product in a crowded payments market, it needed an identity that would stand apart from competitors, hold a consistent visual language across every touchpoint, and be able to grow with the product.",
  ],
  contribution: [
    "I worked on BreezePay as art director at Disrupt DNA. I began with market research to find the product's distinguishing strengths and its target audience, then developed the corporate identity and style guide, working with product managers, the marketing team and executives so the brand matched the company's direction.",
    "The mark joins two ideas: swapping arrows for a swift transaction, and a tick for success, efficiency, trust and reliability. Its two halves stand for a successful outgoing payment and an equally successful incoming one.",
    "I explored several directions before settling on the final mark, including a monogram of a lowercase b and p. The system pairs the Mont typeface with a turquoise palette, lime and yellow accents, and bright, people-first photography.",
    "The style guide carries the identity into advertising templates, signage, merchandise, print and out-of-home, so it can be extended as the product grows.",
  ],
  credits: [
    { role: "Art Director", name: "Philip Ajibade" },
    { role: "Agency", name: "Disrupt DNA" },
    { role: "Client", name: "Access Bank" },
  ],
  cover: { src: "/art-direction/breezepay/logo-on-colour.jpg", alt: "The BreezePay logo on black, turquoise, yellow and lime colour blocks.", width: 2000, height: 1334 },
  visuals: [
    { src: "/art-direction/breezepay/brand-intro.jpg", alt: "BreezePay brand identity title board with a smiling man holding a phone, in greyscale.", caption: "Identity overview.", width: 2000, height: 1334, wide: true },
    { src: "/art-direction/breezepay/logo-construction.jpg", alt: "Logo construction diagram: two swapping arrows plus a tick combine to form the BreezePay mark.", caption: "Logo construction · A swift transaction plus a tick for success, efficiency, trust and reliability.", width: 2000, height: 1334, wide: true },
    { src: "/art-direction/breezepay/logo-clearspace.jpg", alt: "The BreezePay logo shown with its clear-space guides.", caption: "Clear space.", width: 2000, height: 1334 },
    { src: "/art-direction/breezepay/logo-stacked.jpg", alt: "The stacked version of the BreezePay logo.", caption: "Stacked lockup.", width: 2000, height: 1334 },
    { src: "/art-direction/breezepay/exploration-1.jpg", alt: "Two alternative logo explorations: an orange and green mark, and a red chevron b and p.", caption: "Alternative directions · A paired-transaction mark, and a monogram of a lowercase b and p.", width: 2000, height: 1334 },
    { src: "/art-direction/breezepay/exploration-2.jpg", alt: "Two further logo explorations in red and blue script.", caption: "Further explorations.", width: 2000, height: 1334 },
    { src: "/art-direction/breezepay/exploration-3.jpg", alt: "Two more logo explorations, including a mark built from two overlapping semicircles.", caption: "Exploration · Marks built from the letter forms of the name.", width: 2000, height: 1334 },
    { src: "/art-direction/breezepay/typography-mont.jpg", alt: "Typography board showing the Mont typeface in several weights.", caption: "Typography · Mont.", width: 2000, height: 1334 },
    { src: "/art-direction/breezepay/colour-palette.jpg", alt: "Colour palette of turquoise, pale blues and white, with lime green, yellow, black and grey as secondary colours.", caption: "Colour palette · Turquoise primaries with lime, yellow and neutral secondaries.", width: 2000, height: 1334 },
    { src: "/art-direction/breezepay/photography-style.jpg", alt: "Grid of bright lifestyle photographs of people using their phones.", caption: "Photography style · Bright, people-first and phone in hand.", width: 2000, height: 1333 },
    { src: "/art-direction/breezepay/advert-payment-experience.jpg", alt: "Turquoise advert of a woman in a yellow hoodie with the line live a new payment experience.", caption: "Advert · Live a new payment experience.", width: 2000, height: 1333 },
    { src: "/art-direction/breezepay/advertising-templates.jpg", alt: "Three portrait advertising templates for BreezePay.", caption: "Advertising templates.", width: 2000, height: 1333 },
    { src: "/art-direction/breezepay/advert-dont-waste-time.jpg", alt: "Lime advert of a hand holding a phone with the line don\'t waste any more time on transactions, beside app icons.", caption: "Advert and app icon variations.", width: 2000, height: 1333, wide: true },
    { src: "/art-direction/breezepay/signage-and-merchandise.jpg", alt: "Mockups of a BreezePay accepted here sign, a black T-shirt and a lanyard.", caption: "Signage and merchandise mockups.", width: 2000, height: 1333 },
    { src: "/art-direction/breezepay/flyers.jpg", alt: "Mockup of two BreezePay flyers.", caption: "Flyer mockups.", width: 2000, height: 1333 },
    { src: "/art-direction/breezepay/business-cards.jpg", alt: "Mockup of BreezePay business cards on a dark surface.", caption: "Business card mockup.", width: 2000, height: 1333 },
    { src: "/art-direction/breezepay/stationery.jpg", alt: "Mockup of BreezePay letterhead, envelope and stationery.", caption: "Stationery mockup.", width: 2000, height: 1333 },
    { src: "/art-direction/breezepay/building-billboard.jpg", alt: "Mockup of a BreezePay advert on the side of an office building.", caption: "Out-of-home mockup.", width: 2000, height: 1333 },
    { src: "/art-direction/breezepay/roadside-billboard.jpg", alt: "Mockup of a roadside billboard reading cardless and cashless payment.", caption: "Billboard mockup.", width: 2000, height: 1333 },
  ],
  published: true,
}, {
  slug: "premiumtrust-bank-up",
  name: "PremiumTrust Bank",
  title: "Bank Up: strategy and campaign pitch for a new bank",
  summary: "A Disrupt DNA pitch to PremiumTrust Bank: the content strategy and the Bank Up campaign, built on the upward arrow in the bank's logo.",
  year: "",
  format: "Campaign pitch & strategy",
  role: "Art Director & strategy",
  studio: "Disrupt DNA",
  studioLabel: "Agency",
  briefTitle: "The brief",
  contributionTitle: "Strategy and creative",
  recognition: [],
  brief: [
    "PremiumTrust is a new financial institution that set out to solve banking problems through innovation and speed of execution. Its brief was to position itself as a premium bank, in or above the league of the industry leaders, as it worked towards becoming the bank of choice on the continent.",
    "This was a pitch. I left the agency shortly afterwards, so I can't say whether the campaign ran. The billboards, vehicles and screens shown here are mockups of the proposed creative.",
  ],
  contribution: [
    "I was the art director on the pitch and wrote the strategy document behind it, Disrupt DNA's content marketing proposal for PremiumTrust Bank.",
    "The strategy started from a SWOT analysis and a map of the audience, from first-time account holders to people banking elsewhere and the unbanked. It defined the brand's personality as half Caregiver and half Creator: assuring and empathetic on one side, innovative and inspiring on the other.",
    "The lead idea, Bank Up, came from the PremiumTrust logo, whose arrowhead points up and to the right. Bank Up stands for banking that moves upwards: progressive, innovative and liberating. It ran through three message lines: Go for Better, On to the Next Level and Dare for Better. A second idea, Premium Means Premium, set out what premium should mean in service, technology and people.",
    "Beyond the print and outdoor work, the proposal included concepts for two TV commercials, radio scripts and a six-month plan across TV, radio, digital and social. One commercial, The Way Up, follows people at a turning point, from a hiker facing a steep climb to a patient learning to walk again.",
  ],
  credits: [
    { role: "Art Director & strategy", name: "Philip Ajibade" },
    { role: "Agency", name: "Disrupt DNA" },
    { role: "Client (pitch)", name: "PremiumTrust Bank" },
  ],
  cover: { src: "/art-direction/premiumtrust-bank-up/next-level-billboard.jpg", alt: "Billboard mockup of a red PremiumTrust advert reading on to the next level, with a man on a scooter.", width: 2000, height: 1309 },
  visuals: [
    { src: "/art-direction/premiumtrust-bank-up/next-level-posters.jpg", alt: "Two posters reading on to the next level, with a woman leaping and a man on a scooter.", caption: "On to the Next Level · Posters.", width: 1633, height: 1142 },
    { src: "/art-direction/premiumtrust-bank-up/next-level-print.jpg", alt: "Mockup of two on to the next level posters.", caption: "On to the Next Level · Print mockup.", width: 2000, height: 1500 },
    { src: "/art-direction/premiumtrust-bank-up/next-level-building.jpg", alt: "Mockup of an on to the next level banner on a building.", caption: "On to the Next Level · Building banner mockup.", width: 1367, height: 2048 },
    { src: "/art-direction/premiumtrust-bank-up/dare-for-better-social.jpg", alt: "Phone mockup showing a dare for better post on Instagram.", caption: "Dare for Better · Social post mockup.", width: 1416, height: 1392 },
    { src: "/art-direction/premiumtrust-bank-up/dare-for-better-posters.jpg", alt: "Two dare for better posters with portraits cut through by the upward arrow.", caption: "Dare for Better · Posters built around the logo\'s upward arrow.", width: 1633, height: 1142 },
    { src: "/art-direction/premiumtrust-bank-up/dare-for-better-print.jpg", alt: "Mockup of two dare for better posters.", caption: "Dare for Better · Print mockup.", width: 2000, height: 1333 },
    { src: "/art-direction/premiumtrust-bank-up/dare-for-better-billboard.jpg", alt: "Mockup of a dare for better billboard.", caption: "Dare for Better · Billboard mockup.", width: 1444, height: 942 },
    { src: "/art-direction/premiumtrust-bank-up/dare-for-better-street-banner.jpg", alt: "Mockup of a dare for better street banner on a lamp post.", caption: "Dare for Better · Street banner mockup.", width: 1346, height: 940 },
    { src: "/art-direction/premiumtrust-bank-up/dare-for-better-bus.jpg", alt: "Mockup of a white coach wrapped with the dare for better campaign.", caption: "Dare for Better · Vehicle mockup.", width: 1796, height: 1002, wide: true },
    { src: "/art-direction/premiumtrust-bank-up/go-for-better-posters.jpg", alt: "Two go for better posters with hand-lettered orange type and people jumping.", caption: "Go for Better · Posters.", width: 1633, height: 1142, wide: true },
    { src: "/art-direction/premiumtrust-bank-up/premium-tech-and-service.jpg", alt: "Two dark posters reading premium means premium tech and premium means premium service.", caption: "Premium Means Premium · Tech and Service.", width: 1633, height: 1142 },
    { src: "/art-direction/premiumtrust-bank-up/premium-people-and-trust.jpg", alt: "Two dark posters reading premium means premium people and premium means premium trust.", caption: "Premium Means Premium · People and Trust.", width: 1633, height: 1142 },
  ],
  published: true,
}];

/** Unpublished projects are previewable in development but hidden in production. */
export const visibleArtProjects = artProjects.filter(project => project.published || process.env.NODE_ENV !== "production");
