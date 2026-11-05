export type ArtVisual = { src: string; alt: string; caption?: string; width: number; height: number; wide?: boolean };

export type ArtChapter = { id: string; title: string; paragraphs: string[]; visuals: ArtVisual[] };

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
  chapters?: ArtChapter[];
  outcome?: string[];
  /** Keep false until real visuals and Philip's own account of his role are in place. */
  published: boolean;
};

export const artProjects: ArtProject[] = [{
  slug: "access-pensions",
  name: "Access Pensions",
  title: "Launching a new pension brand after a merger",
  summary: "The integrated campaign that introduced Access Pensions, formed from the merger of Sigma Pensions and First Guarantee Pensions. New customer sign-ups rose by 35%.",
  year: "2022",
  format: "Integrated campaign",
  role: "Art Director",
  studio: "Disrupt DNA",
  studioLabel: "Agency",
  contributionTitle: "My role",
  recognition: [
    "35% rise in new customer sign-ups",
  ],
  brief: [
    "In December 2022, Sigma Pensions and First Guarantee Pensions came together as Access Pensions, making it one of Nigeria's largest pension fund administrators. The new brand set out to give every generation the knowledge, advice and tools to create their future.",
    "The campaign had two jobs. Outside, it had to introduce a name nobody yet knew and convince existing and new customers that they would get more from their pensions. Inside, it had to bring staff from the merging businesses behind one story.",
  ],
  contribution: [
    "I was the art director on the campaign, and I was heavily involved in the strategy, research and creative direction behind it.",
    "The research and strategy, including the customer-first view and the brand language, set the direction for three big ideas. I then art directed the creative across print, outdoor, digital and film, working with illustrator Tobi Sanni on the illustrated work and storyboards.",
    "I was also a photographer on the campaign. The portraits combine my own photography with some stock images.",
  ],
  credits: [
    { role: "Art Director", name: "Philip Ajibade" },
    { role: "Photography", name: "Philip Ajibade, with some stock images" },
    { role: "Illustration", name: "Tobi Sanni" },
    { role: "Agency", name: "Disrupt DNA" },
    { role: "Client", name: "Access Pensions" },
  ],
  cover: { src: "/art-direction/access-pensions/shape-your-future-portraits-1.jpg", alt: "Shape your future portraits: a nurse, a woman in a hijab and a young man, each framed in a green border", width: 1974, height: 921 },
  visuals: [],
  chapters: [
    {
      id: "customer",
      title: "Starting with the customer",
      paragraphs: [
        "Before any campaign, we mapped who a merged pension fund administrator actually serves. The customer-first view runs from high-net-worth individuals through the mass affluent and the employed and self-employed mass market to young people starting out.",
        "At one end the relationship is low volume, high value and high human touch; at the other it is high volume, lower value and mostly digital. Micro-pensions and alternative retirement savings run across the whole range. That spread is why the work had to speak to a senior executive and a market trader with equal conviction.",
        "From the map came a brand language built on progress, hope, togetherness and giving more: words the campaigns could draw on whatever the audience.",
      ],
      visuals: [
        { src: "/art-direction/access-pensions/customer-first-view.jpg", alt: "Customer-first view: a spectrum from high-net-worth individuals to youth, from high human touch to high digital touch, with micro-pensions across the range", caption: "The customer-first view", width: 2000, height: 1125, wide: true },
        { src: "/art-direction/access-pensions/brand-language.jpg", alt: "Brand language word cloud with phrases such as Progress, Moving forward, Give MORE, Give hope and Connected community", caption: "The brand language", width: 2000, height: 1125, wide: true },
      ],
    },
    {
      id: "future-shapers",
      title: "Big idea: Future Shapers",
      paragraphs: [
        "The first idea put the customer in charge: whatever your age or work, your future is yours to shape. It became the campaign that ran, through three of its four lines: Age doesn't matter, No reduce your age and Shape your future.",
        "Age doesn't matter used everyday humour, people relaxing with popcorn or a face mask, to say it is never too early or too late to plan. No reduce your age took a Pidgin line about people understating their age and turned it into a nudge to start planning now, with a comic skit to carry it. Shape your future put real faces from across the customer map, from nurses to traders to retirees, at the centre. A fourth line, Your future. Shape it your way, used line illustrations of people raised up on a plinth; it was developed but did not run.",
      ],
      visuals: [
        { src: "/art-direction/access-pensions/age-doesnt-matter-men.jpg", alt: "Age doesn't matter: two men laughing over popcorn, with the line Shape your future your way", width: 1510, height: 1105 },
        { src: "/art-direction/access-pensions/age-doesnt-matter-women.jpg", alt: "Age doesn't matter: two women with cucumber slices over their eyes", width: 1510, height: 1105 },
        { src: "/art-direction/access-pensions/age-doesnt-matter-outdoor.jpg", alt: "Age doesn't matter billboard and street pole mockups", caption: "Outdoor mockups", width: 1962, height: 809, wide: true },
        { src: "/art-direction/access-pensions/no-reduce-your-age-posters.jpg", alt: "No reduce your age posters with oversized caricature heads on small bodies", width: 1554, height: 1083, wide: true },
        { src: "/art-direction/access-pensions/no-reduce-your-age-bus.jpg", alt: "No reduce your age livery on a coach", caption: "Vehicle mockup", width: 1930, height: 1097, wide: true },
        { src: "/art-direction/access-pensions/shape-your-future-portraits-2.jpg", alt: "Shape your future portraits: a farmer, a man in a flat cap, a woman in a gele", width: 1995, height: 933, wide: true },
        { src: "/art-direction/access-pensions/shape-your-future-portraits-3.jpg", alt: "Shape your future portraits of two older Nigerians", width: 1554, height: 1083 },
        { src: "/art-direction/access-pensions/shape-your-future-station.jpg", alt: "Shape your future posters on a station wall", caption: "Station mockup", width: 1586, height: 1097 },
        { src: "/art-direction/access-pensions/shape-your-future-social.jpg", alt: "Shape your future on Instagram and on an airport digital screen", caption: "Social and digital mockups", width: 1908, height: 996, wide: true },
        { src: "/art-direction/access-pensions/shape-it-your-way-posters.jpg", alt: "Your future. Shape it your way posters: a line-drawn figure standing on a green plinth", caption: "Shape it your way, developed but not run", width: 1971, height: 1017, wide: true },
        { src: "/art-direction/access-pensions/shape-it-your-way-print.jpg", alt: "Shape it your way print layout with a line-drawn chef carrying a tray", width: 1522, height: 1083 },
        { src: "/art-direction/access-pensions/shape-it-your-way-bus.jpg", alt: "Shape it your way livery on a city bus", caption: "Vehicle mockup", width: 1562, height: 1101 },
      ],
    },
    {
      id: "films",
      title: "Film concepts: The Power in Your Hands",
      paragraphs: [
        "Two TV commercial concepts took Future Shapers onto screen. The first opens at dawn on a fishing village. A boy and his friends make paper boats; as they grow up, the paper boats become real ones and then a larger, better-equipped fishing boat, while the voiceover moves from birth dreams to giving more to customers. It closes on the line: now, the future is in your hands.",
        "The second follows a father, a mother and a son who saves towards a speed boat, ending on the promise that we put the power in your hands. A radio script built around a young woman's first job carried the same idea to listeners. These were developed as concepts and storyboards, and were not produced.",
      ],
      visuals: [
        { src: "/art-direction/access-pensions/storyboard-dawn.jpg", alt: "Storyboard: at dawn, the bow of a boat heads towards a village", caption: "Storyboard for The Power in Your Hands, a concept that was not produced", width: 1544, height: 1022, wide: true },
        { src: "/art-direction/access-pensions/storyboard-homecoming.jpg", alt: "Storyboard: women and children welcome the fishermen as they reach the river bank", width: 1902, height: 1046, wide: true },
        { src: "/art-direction/access-pensions/storyboard-market.jpg", alt: "Storyboard: women roast fish and carry it to the market", width: 1844, height: 1043, wide: true },
        { src: "/art-direction/access-pensions/storyboard-paper-boats.jpg", alt: "Storyboard: kids in class, then a boy and his friends making paper boats", width: 1917, height: 1041, wide: true },
        { src: "/art-direction/access-pensions/storyboard-new-boat.jpg", alt: "Storyboard: a life-size boat appears, then three young men admire their new fishing boat", width: 1939, height: 1043, wide: true },
        { src: "/art-direction/access-pensions/storyboard-sunset.jpg", alt: "Storyboard: the young men set out in bigger boats as their fathers watch from the shore at sunset", width: 1925, height: 1043, wide: true },
      ],
    },
    {
      id: "fueling-hope",
      title: "Big idea: Fueling Hope",
      paragraphs: [
        "Alongside Future Shapers, we developed two further big ideas that did not run. The second idea was about the drive to imagine something better and the help needed to build it. Its centrepiece, Vantage Pointe, is an illustrated film told in reverse: a young ballerina, then the studio where she trained, then the moment her father hands her her first pair of pointe shoes. The line: if we can imagine it, we can create a world where everyone is inspired and empowered to shape the future, but not alone.",
        "The same illustrated world became the Imagine it, Create it key visuals. Two photographic lines sat alongside: Enjoy your life, take control of your future now, for traders and retirees, and Control your future, for working professionals.",
      ],
      visuals: [
        { src: "/art-direction/access-pensions/vantage-pointe-first-shoes.jpg", alt: "Vantage Pointe frame: a father presents his daughter with her first pair of pointe shoes", caption: "Vantage Pointe film frames, illustrated by Tobi Sanni", width: 1897, height: 1070, wide: true },
        { src: "/art-direction/access-pensions/vantage-pointe-twirl.jpg", alt: "Vantage Pointe frames: close-up of pointe shoes, then the girl as a teenager dancing on a car", width: 1958, height: 1014, wide: true },
        { src: "/art-direction/access-pensions/vantage-pointe-studio.jpg", alt: "Vantage Pointe frame: an instructor helps a young girl in a busy ballet studio", width: 1640, height: 1045 },
        { src: "/art-direction/access-pensions/shape-the-future-ballet.jpg", alt: "Shape the future: an instructor guides the young ballerina", width: 1546, height: 1099 },
        { src: "/art-direction/access-pensions/future-shapers-key-visual.jpg", alt: "Illustrated key visual: a father gives his daughter pointe shoes, with the line Future shapers", width: 1526, height: 1087 },
        { src: "/art-direction/access-pensions/imagine-it-create-it.jpg", alt: "Imagine it, create it: the ballerina mid-leap in front of her family", width: 1522, height: 1083 },
        { src: "/art-direction/access-pensions/create-your-future.jpg", alt: "Create your future: the ballerina dancing in a spotlight on stage", width: 1522, height: 1083 },
        { src: "/art-direction/access-pensions/imagine-create-shape.jpg", alt: "Imagine it, Create it, Shape it: four illustrated frames in one layout", width: 1522, height: 1083 },
        { src: "/art-direction/access-pensions/enjoy-your-life-market.jpg", alt: "Enjoy your life: a woman laughing as she roasts plantain at a market stall", width: 1520, height: 1083, wide: true },
        { src: "/art-direction/access-pensions/enjoy-your-life-trader.jpg", alt: "Enjoy your life: an older market trader smiling in a headwrap", width: 1549, height: 1103 },
        { src: "/art-direction/access-pensions/enjoy-your-life-portrait.jpg", alt: "Enjoy your life: a grey-bearded man in a blazer", width: 1546, height: 1100 },
        { src: "/art-direction/access-pensions/control-your-future.jpg", alt: "Control your future posters: an engineer, a businesswoman and a senior executive", width: 1955, height: 918, wide: true },
      ],
    },
    {
      id: "bright-future",
      title: "Big idea: A Bright Future",
      paragraphs: [
        "The third idea, also developed but not run, was the most direct: the future is bright. Each execution paired the line with one of three promises, More security, More possibilities and More wealth, and with a person for whom that promise matters most: a retiree, an engineer and a student.",
      ],
      visuals: [
        { src: "/art-direction/access-pensions/bright-future-elder.jpg", alt: "The future is bright: a smiling older man, with More security", width: 1550, height: 1103, wide: true },
        { src: "/art-direction/access-pensions/bright-future-engineer.jpg", alt: "The future is bright: an engineer in a hard hat, with More possibilities", width: 1546, height: 1099 },
        { src: "/art-direction/access-pensions/bright-future-student.jpg", alt: "The future is bright: a student reading, with More wealth", width: 1549, height: 1102 },
        { src: "/art-direction/access-pensions/bright-future-outdoor-and-press.jpg", alt: "The future is bright on a billboard and in The Punch newspaper", caption: "Outdoor and press mockups", width: 1967, height: 857, wide: true },
      ],
    },
    {
      id: "internal",
      title: "Inside the merger: Together for More",
      paragraphs: [
        "A merger is also a change for the people inside it. The internal campaign, Big Picture, gave staff from the merging businesses one story to tell: choose security, choose stability, choose Access Pensions.",
        "The visuals turned the new company's strengths into a single arc: industry experts to help with retirement plans, more ways to access and contribute to your funds, over 530 staff, over 790,000 people who trust us, and Nigeria's fourth largest pension fund administrator, under a 33 years mark. Together for More messages carried the benefits staff could talk about: more liquidity, access to 25% pension withdrawal and an ecosystem of pension, banking and loans.",
      ],
      visuals: [
        { src: "/art-direction/access-pensions/choose-security-arc.jpg", alt: "Choose security, Choose Access Pensions: an arc of five icons with the company's key facts and a 33 years badge", width: 1552, height: 1105 },
        { src: "/art-direction/access-pensions/choose-stability-arc.jpg", alt: "Choose stability, Choose Access Pensions: the same arc layout", width: 1534, height: 1093 },
        { src: "/art-direction/access-pensions/choose-security-blocks.jpg", alt: "Choose security: the key facts set as five coloured blocks", width: 1540, height: 1097, wide: true },
      ],
    },
  ],
  outcome: [
    "The client approved the work without difficulty, and three Future Shapers lines went to market: Age doesn't matter, No reduce your age and Shape your future.",
    "After the launch, sign-ups from new customers rose by 35%.",
  ],
  published: true,
}, {
  slug: "oxygen",
  name: "Oxygen",
  title: "Power to Move: launching a digital bank",
  summary: "Disrupt DNA's integrated brand and marketing proposal for Oxygen, the digital bank launched by Grow Microfinance Bank, part of Access Corporation.",
  year: "2022",
  format: "Brand launch proposal",
  role: "Art Director & Photographer",
  studio: "Disrupt DNA",
  studioLabel: "Agency",
  contributionTitle: "My role",
  recognition: [
    "Won the pitch for Disrupt DNA",
  ],
  brief: [
    "Grow Microfinance Bank, a subsidiary of Access Corporation, was launching a full-service digital bank under the name Oxygen, starting with digital loans for individuals and businesses and growing into full digital banking.",
    "The brief asked for an integrated marketing and communications strategy covering the brand and corporate launch, products, promotions, sponsorships and corporate initiatives. Our aim was a disruptive entry into digital lending: to build awareness and trust, position Oxygen as a leader, and drive sign-ups, app downloads and loans.",
    "We presented the proposal in December 2022, and Disrupt DNA won the work. The posters and mockups shown are the creative from that proposal.",
  ],
  contribution: [
    "I was the art director on the proposal, shaping how the strategy and all three big ideas looked across posters, outdoor, social and film.",
    "I also did the photography for the campaign creative.",
  ],
  credits: [
    { role: "Art Director & Photographer", name: "Philip Ajibade" },
    { role: "Agency", name: "Disrupt DNA" },
    { role: "Client", name: "Grow Microfinance Bank (Oxygen)" },
  ],
  cover: { src: "/art-direction/oxygen/power-up-tailor-full.jpg", alt: "Power Up poster: a woman in an orange suit beside an orange 3D sewing machine, with the line Boost your business with Oxygen", width: 1080, height: 605 },
  visuals: [],
  chapters: [
    {
      id: "strategy",
      title: "Strategy: who Oxygen is for",
      paragraphs: [
        "The strategy started with a SWOT analysis and a look at the digital lenders Oxygen would be up against, from Kuda and Carbon to FairMoney. Oxygen's advantages were speed, ease of use and little or no collateral; its risks were patchy internet access, a short product list and the trust any new lender has to earn.",
        "We gave the brand a personality built on two archetypes. The Creator was the core, in line with the belief that if it can be imagined, it can be created. The Hero sat beneath it, about rising above challenges and pushing people to be the best they can be. The voice was experienced, compassionate and guiding; the tone empowering, reassuring and inspiring.",
        "The audience ran from medium-sized businesses down to individual traders, and from the mass affluent to students and low-income workers. Personas made them real: Taofiq, a neighbourhood barber saving for a bigger shop; Eric, a salary earner funding bigger investments; and Sam, an office assistant whose salary runs out mid-month.",
        "The launch was planned in three phases: a pre-launch tease on social media, a digital launch to drive sign-ups and app downloads, then an on-ground and traditional launch with events, outdoor and radio. A twelve-month calendar of seasonal campaigns and a media plan across TV, radio, outdoor, print and digital carried it beyond launch.",
      ],
      visuals: [
        { src: "/art-direction/oxygen/logo-reveal-orange.jpg", alt: "Frame from the logo reveal animation: the Oxygen logo in teal on orange", caption: "Logo reveal animation", width: 1880, height: 848 },
        { src: "/art-direction/oxygen/logo-reveal-black.jpg", alt: "Frame from the logo reveal animation: the glowing Oxygen logo on black", width: 1730, height: 780 },
        { src: "/art-direction/oxygen/oxygen-logo-mark.jpg", alt: "The Oxygen logo: a teal ring looped through a smaller ring, above the word OXYGEN", width: 1400, height: 1982 },
        { src: "/art-direction/oxygen/oxygen-is-coming-full.jpg", alt: "Teaser poster: a 3D teal Oxygen mark with the line Oxygen is coming", caption: "Pre-launch teaser", width: 763, height: 1080 },
        { src: "/art-direction/oxygen/launch-road-map.jpg", alt: "Launch road map in three phases: pre-launch, digital launch and on-ground launch, with objectives, tactics and channels for each", caption: "The launch road map", width: 1803, height: 1040, wide: true },
      ],
    },
    {
      id: "power-to-move",
      title: "Big idea: Power to Move",
      paragraphs: [
        "Nobody wants to feel static in life. Power to Move was about the lift people need to get their personal and business plans off the ground, with Oxygen as the power that gets them going. It ran through three messages: Your power to move, Power Up and Powered by Oxygen.",
        "Around it we proposed #YourPowerToMove, a YouTube series following influencers who run side businesses and everyday Nigerians who run their own, documenting their challenges and showing Oxygen as a tool for growth. The #OxygenPowerUp challenge took the idea into activations: a social challenge for small business owners and social media vendors, and Project Power 1000, a market activation for traders, artisans and neighbourhood stores.",
      ],
      visuals: [
        { src: "/art-direction/oxygen/your-power-to-move-woman.jpg", alt: "Your power to move poster: a smiling young person rising out of a teal Oxygen ring, surrounded by floating clothes and tools", width: 763, height: 1080 },
        { src: "/art-direction/oxygen/your-power-to-move-man.jpg", alt: "Your power to move poster: a man in a yellow jacket rising out of a teal Oxygen ring, surrounded by a laptop and gadgets", width: 763, height: 1080 },
        { src: "/art-direction/oxygen/power-up-chef-full.jpg", alt: "Power Up poster: a chef beside an orange 3D kitchen, with the line Boost your business with Oxygen", width: 1080, height: 605, wide: true },
        { src: "/art-direction/oxygen/power-up-artisan-full.jpg", alt: "Power Up poster: an artisan with a tool belt beside an orange 3D jigsaw", width: 1080, height: 605, wide: true },
        { src: "/art-direction/oxygen/power-up-teacher-full.jpg", alt: "Power Up poster: a woman in a classroom", width: 1280, height: 853 },
        { src: "/art-direction/oxygen/power-up-baker-full.jpg", alt: "Power Up poster: a man in a bakery", width: 1280, height: 853 },
        { src: "/art-direction/oxygen/power-up-professional-full.jpg", alt: "Power Up poster: a woman in a modern office", width: 1280, height: 853 },
        { src: "/art-direction/oxygen/power-up-cook-full.jpg", alt: "Power Up poster: a woman in a professional kitchen", width: 1280, height: 853 },
        { src: "/art-direction/oxygen/powered-by-oxygen-full.png", alt: "Powered by Oxygen posters: a roadside mechanic and a car on a lift, a driver and his car, a farmer and a tractor", caption: "Powered by Oxygen", width: 2400, height: 1057, wide: true },
      ],
    },
    {
      id: "breathe",
      title: "Big idea: Breathe, Oxygen Will Help You",
      paragraphs: [
        "Getting finance for personal and business plans is stressful; the second idea told people they could relax, because Oxygen is with them every step of the way. Its messages were Don't think about it, just breathe; We dey breathe; and Breathe, Oxygen will help you get that.",
        "The TV script followed four people at the moment they run out of air: a new father facing a hospital bill, a woman being evicted, Ada watching the electricity men climb the pole outside her salon, and Mama Kamiso as her food kiosk is closed. Each scene then flips to the outcome, with the bill paid, a new home, the lights back on and a new restaurant full of customers. A radio script between two friends, Setemi and Tope, played the same joke for listeners.",
      ],
      visuals: [
        { src: "/art-direction/oxygen/dont-think-just-breathe-full.png", alt: "Don't think about it, just breathe: three portraits with eyes closed against orange and teal", width: 2400, height: 965, wide: true },
        { src: "/art-direction/oxygen/we-dey-breathe-full.png", alt: "We dey breathe: three small business owners smiling, holding We Dey Breathe signs", width: 2400, height: 965, wide: true },
        { src: "/art-direction/oxygen/breathe-oxygen-will-help-you-full.png", alt: "Breathe, Oxygen will help you: a tech worker, an entrepreneur and a graduate clutching their throats", width: 2371, height: 1080, wide: true },
      ],
    },
    {
      id: "no-oxygen-no-life",
      title: "Big idea: No Oxygen, No Life",
      paragraphs: [
        "Can life exist without oxygen? The third idea positioned Oxygen as the financial partner that gives life to things, through four messages: give life to your business, your dreams, your passion and your hustle. Orange line drawings sketched each dream around the person who holds it.",
        "Its TV script, Rise with Oxygen, followed young Africans in Nigeria, Senegal, Rwanda and DR Congo, a new graduate employee, a fashion student, a young woman in tech and an aspiring musician, as each gets their chance to prove themselves. It ends by rewinding to show every one of them opening the Oxygen app, with the line: we are Africa's life force. A Pidgin radio spot about a shop with nothing left to sell closed on the promise that a business with Oxygen cannot die.",
      ],
      visuals: [
        { src: "/art-direction/oxygen/give-life-to-your-business-full.jpg", alt: "Give life to your business: a seamstress with fabric, outlined by an orange sewing machine drawing", width: 1080, height: 766 },
        { src: "/art-direction/oxygen/give-life-to-your-dreams-family-full.jpg", alt: "Give life to your dreams: a young family framed by an orange house drawing", width: 1080, height: 766 },
        { src: "/art-direction/oxygen/give-life-laptop.jpg", alt: "Give life to your dreams poster with an orange 3D laptop", width: 1240, height: 1748 },
        { src: "/art-direction/oxygen/give-life-cap.jpg", alt: "Give life to your dreams poster with an orange 3D graduation cap", width: 1240, height: 1748 },
        { src: "/art-direction/oxygen/give-life-ship.jpg", alt: "Give life to your dreams poster with an orange 3D ship", width: 1240, height: 1748 },
        { src: "/art-direction/oxygen/give-life-house.jpg", alt: "Give life to your dreams poster with an orange 3D house", width: 1240, height: 1748 },
      ],
    },
  ],
  outcome: [
    "All three big ideas went to the client, and Disrupt DNA won the work.",
  ],
  published: true,
}, {
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
    { src: "/art-direction/the-song-maiden/key-art-and-clifftop.png", alt: "Left: key art of the Maiden holding a glowing light, with The Song Maiden title and the line freedom or nothing. Right: the Maiden on a clifftop with her arms spread wide against a pale sky.", caption: "Key art, with the film's title mark · The mountain, where the Maiden feels free.", width: 2000, height: 813, wide: true },
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
    { src: "/art-direction/premiumtrust-bank-up/building-and-social.png", alt: "Left: mockup of an On to the Next Level banner on a building. Right: phone mockup showing a Dare for Better post on Instagram.", caption: "On to the Next Level building banner mockup · Dare for Better social post mockup.", width: 2000, height: 1163, wide: true },
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
