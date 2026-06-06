import type { Arc, Quest, Challenge, ShopItem } from '../types';

export const arcs: Arc[] = [
  {
    id: 'html-kingdom',
    name: 'The Broken Beginning',
    theme: 'HTML Kingdom',
    description: 'The world has lost its structure. HTML elements are the building blocks that will restore reality.',
    bossName: 'Corrupted Page Entity',
    unlocks: 'css-city',
    totalQuests: 9,
    icon: 'Scroll'
  },
  {
    id: 'css-city',
    name: 'The Shaping Realm',
    theme: 'CSS City',
    description: 'The world exists but has no visual harmony. CSS brings form, design, and visual order.',
    bossName: 'The Broken Style Engine',
    unlocks: 'js-laboratory',
    totalQuests: 10,
    icon: 'Palette'
  },
  {
    id: 'js-laboratory',
    name: 'The Logic Awakening',
    theme: 'JavaScript Laboratory',
    description: 'The world is unstable and lacks logic. JavaScript restores behavior and interaction.',
    bossName: 'The Glitch Mind Machine',
    unlocks: 'fullstack-citadel',
    totalQuests: 11,
    icon: 'Cpu'
  },
  {
    id: 'fullstack-citadel',
    name: 'The Full Stack Ascension',
    theme: 'Full Stack Citadel',
    description: 'All systems must be unified. Master the integration of all technologies.',
    bossName: 'The Core Compiler',
    unlocks: null,
    totalQuests: 5,
    icon: 'Castle'
  }
];

export const quests: Quest[] = [
  // ARC 1: HTML KINGDOM
  {
    id: 'html-1',
    arcId: 'html-kingdom',
    order: 1,
    title: 'The First Structure',
    storyContext: 'The world lies in chaos, fragments of reality scattered across the void. You must learn to create the foundational container that will hold all existence together.',
    learningObjective: 'Learn the basic HTML document structure and the DOCTYPE declaration.',
    conceptExplanation: 'Every HTML document begins with a declaration that tells the browser this is an HTML5 document. The html element wraps all content and represents the root of the page.',
    syntaxPreview: '<!DOCTYPE html>\n<html>\n  <!-- content here -->\n</html>',
    taskInstruction: 'Create the basic HTML document structure with the proper DOCTYPE declaration and root html element.',
    successCriteria: [
      'Must include DOCTYPE html declaration',
      'Must have an html element',
      'Proper nesting structure'
    ],
    xpReward: 50,
    goldReward: 10,
    bossQuest: false
  },
  {
    id: 'html-2',
    arcId: 'html-kingdom',
    order: 2,
    title: 'Head and Heart',
    storyContext: 'The document exists but lacks identity. The head section holds metadata - the memory and identity of the page. The body holds the visible world.',
    learningObjective: 'Learn to separate document metadata (head) from visible content (body).',
    conceptExplanation: 'The head element contains machine-readable information about the document: title, scripts, styles. The body element contains all visible content that users see.',
    syntaxPreview: '<head>\n  <title>Page Title</title>\n</head>\n<body>\n  <!-- visible content -->\n</body>',
    taskInstruction: 'Create a head section with a title and a body section within your HTML structure.',
    successCriteria: [
      'Must have a head element',
      'Must have a title element inside head',
      'Must have a body element',
      'Head and body must be siblings'
    ],
    xpReward: 60,
    goldReward: 15,
    bossQuest: false
  },
  {
    id: 'html-3',
    arcId: 'html-kingdom',
    order: 3,
    title: 'Words of Power',
    storyContext: 'Reality speaks through text. Headings organize thoughts into hierarchies, paragraphs flow like ancient rivers of knowledge. You must learn to write the words that will shape the world.',
    learningObjective: 'Learn heading elements (h1-h6) and paragraph elements.',
    conceptExplanation: 'Headings create hierarchical organization. H1 is the most important, H6 the least. Paragraphs (p) contain blocks of text. Proper structure improves both meaning and accessibility.',
    syntaxPreview: '<h1>Main Title</h1>\n<h2>Subtitle</h2>\n<p>Paragraph text here.</p>',
    taskInstruction: 'Create a heading hierarchy with an h1, an h2, and a paragraph of text about your quest.',
    successCriteria: [
      'Must include an h1 element',
      'Must include an h2 element',
      'Must include a p element',
      'All elements must have text content'
    ],
    xpReward: 70,
    goldReward: 20,
    bossQuest: false
  },
  {
    id: 'html-4',
    arcId: 'html-kingdom',
    order: 4,
    title: 'The Formatting Runes',
    storyContext: 'Not all words carry equal weight. Some must be emphasized, others made strong. Formatting runes shape the presentation of text to convey deeper meaning.',
    learningObjective: 'Learn text formatting elements: strong, em, br, hr.',
    conceptExplanation: 'Strong indicates important text (bold by default). Em emphasizes text (italic by default). Br creates line breaks. Hr creates thematic breaks between content sections.',
    syntaxPreview: '<strong>Important</strong>\n<em>Emphasized</em>\n<br>\n<hr>',
    taskInstruction: 'Use formatting elements to create a paragraph with strong emphasis, italicized whisper, and a horizontal rule dividing sections.',
    successCriteria: [
      'Must use strong element',
      'Must use em element',
      'Must use hr element',
      'Must have meaningful text content'
    ],
    xpReward: 80,
    goldReward: 25,
    bossQuest: false
  },
  {
    id: 'html-5',
    arcId: 'html-kingdom',
    order: 5,
    title: 'Pathways Between Realms',
    storyContext: 'The fractured world needs connection. Links are the portals that bind one part of reality to another, allowing travelers to navigate between realms.',
    learningObjective: 'Learn anchor (a) elements and the href attribute.',
    conceptExplanation: 'The anchor element creates hyperlinks. The href attribute specifies the destination URL. Link text should be descriptive. Target attribute can control where the link opens.',
    syntaxPreview: '<a href="https://example.com">Visit Example</a>',
    taskInstruction: 'Create three links: one to an external world, one to another page, and one that opens in a new tab.',
    successCriteria: [
      'Must have at least two anchor elements',
      'Must use href attribute',
      'Must have descriptive link text',
      'At least one link with target="_blank"'
    ],
    xpReward: 90,
    goldReward: 30,
    bossQuest: false
  },
  {
    id: 'html-6',
    arcId: 'html-kingdom',
    order: 6,
    title: 'Visual Memory Fragments',
    storyContext: 'The world has lost its visual memory. Images must be restored to bring color and form back to reality. Each image is a captured moment of existence.',
    learningObjective: 'Learn the img element, src, and alt attributes.',
    conceptExplanation: 'Images display visual content. The src attribute provides the image path (URL). The alt attribute provides alternative text for accessibility and when images fail to load. Both are essential.',
    syntaxPreview: '<img src="image.jpg" alt="Description of image">',
    taskInstruction: 'Create image elements to restore visual memory. Include proper source references and meaningful descriptions.',
    successCriteria: [
      'Must use img element',
      'Must include src attribute',
      'Must include alt attribute',
      'Alt text must be descriptive'
    ],
    xpReward: 100,
    goldReward: 35,
    bossQuest: false
  },
  {
    id: 'html-7',
    arcId: 'html-kingdom',
    order: 7,
    title: 'The Order Scrolls',
    storyContext: 'Information must be organized. Lists bring order to chaos - ordered lists create numbered sequences, unordered lists group related items, definition lists explain concepts.',
    learningObjective: 'Learn ordered (ol), unordered (ul), and list (li) elements.',
    conceptExplanation: 'Unordered lists (ul) show items with bullet points. Ordered lists (ol) number items. Both use li elements for individual items. Lists can be nested within each other.',
    syntaxPreview: '<ul>\n  <li>Item One</li>\n  <li>Item Two</li>\n</ul>\n<ol>\n  <li>First</li>\n  <li>Second</li>\n</ol>',
    taskInstruction: 'Create an ordered list of quest steps and an unordered list of reward items.',
    successCriteria: [
      'Must include an ol element',
      'Must include a ul element',
      'Each list must have at least two li elements',
      'Lists must have text content'
    ],
    xpReward: 110,
    goldReward: 40,
    bossQuest: false
  },
  {
    id: 'html-8',
    arcId: 'html-kingdom',
    order: 8,
    title: 'The Data Tablets',
    storyContext: 'Ancient knowledge is stored in tablets of data. Tables organize information into rows and columns, creating structured records of existence.',
    learningObjective: 'Learn table structure: table, tr, th, td elements.',
    conceptExplanation: 'Tables display data in rows and columns. Tr defines table rows. Th defines header cells (bold, centered). Td defines data cells. Tables can include thead, tbody, tfoot for structure.',
    syntaxPreview: '<table>\n  <tr>\n    <th>Header</th>\n  </tr>\n  <tr>\n    <td>Data</td>\n  </tr>\n</table>',
    taskInstruction: 'Create a data tablet (table) with headers for Name and Level, and two rows of coded creature data.',
    successCriteria: [
      'Must use table element',
      'Must have at least one tr element',
      'Must use th for headers',
      'Must use td for data cells',
      'Table must have meaningful data'
    ],
    xpReward: 120,
    goldReward: 45,
    bossQuest: false
  },
  {
    id: 'html-9',
    arcId: 'html-kingdom',
    order: 9,
    title: 'Input Rituals',
    storyContext: 'The world needs to receive input from its inhabitants. Forms are the sacred containers that gather offerings and transmit them to the great database beyond.',
    learningObjective: 'Learn form elements, input types, labels, and buttons.',
    conceptExplanation: 'Forms collect user input. Input elements have types: text, password, email, number, checkbox, radio, etc. Labels improve accessibility. Buttons can submit or reset forms.',
    syntaxPreview: '<form>\n  <label for="name">Name:</label>\n  <input type="text" id="name">\n  <button type="submit">Submit</button>\n</form>',
    taskInstruction: 'Create a form ritual with text input for name, email input, and a submit button. Use labels for accessibility.',
    successCriteria: [
      'Must have form element',
      'Must have at least two input elements',
      'Must use different input types',
      'Must have label elements',
      'Must have a submit button'
    ],
    xpReward: 150,
    goldReward: 60,
    bossQuest: true
  }
];

export const challenges: Challenge[] = [
  // Quest 1: Basic Structure
  {
    id: 'html-1-challenge-1',
    questId: 'html-1',
    order: 1,
    title: 'Foundation Stone',
    description: 'Create a basic HTML5 document structure from scratch.',
    initialCode: '',
    targetOutput: 'A valid HTML5 document structure.',
    validationRules: [
      { type: 'contains', value: '<!DOCTYPE html>', message: 'Missing DOCTYPE declaration' },
      { type: 'contains', value: '<html>', message: 'Missing html opening tag' },
      { type: 'contains', value: '</html>', message: 'Missing html closing tag' }
    ],
    xpReward: 50,
    attempts: 3,
    maxAttempts: 3
  },
  // Quest 2: Head and Body
  {
    id: 'html-2-challenge-1',
    questId: 'html-2',
    order: 1,
    title: 'Memory Core',
    description: 'Create a complete HTML document with head and body sections.',
    initialCode: '<!DOCTYPE html>\n<html>\n\n</html>',
    targetOutput: 'Complete document with titled head and body.',
    validationRules: [
      { type: 'contains', value: '<head>', message: 'Missing head element' },
      { type: 'contains', value: '<title>', message: 'Missing title element in head' },
      { type: 'contains', value: '</title>', message: 'Title element not closed properly' },
      { type: 'contains', value: '<body>', message: 'Missing body element' },
      { type: 'contains', value: '</body>', message: 'Body element not closed properly' }
    ],
    xpReward: 60,
    attempts: 3,
    maxAttempts: 3
  },
  // Quest 3: Text Elements
  {
    id: 'html-3-challenge-1',
    questId: 'html-3',
    order: 1,
    title: 'Scribe Training',
    description: 'Write content with proper heading hierarchy and paragraphs.',
    initialCode: '<!DOCTYPE html>\n<html>\n<head>\n  <title>Code Quest Chronicle</title>\n</head>\n<body>\n\n</body>\n</html>',
    targetOutput: 'Content with h1, h2, and paragraph.',
    validationRules: [
      { type: 'contains', value: '<h1>', message: 'Missing h1 element' },
      { type: 'contains', value: '<h2>', message: 'Missing h2 element' },
      { type: 'contains', value: '<p>', message: 'Missing paragraph element' }
    ],
    xpReward: 70,
    attempts: 3,
    maxAttempts: 3
  },
  // Quest 4: Formatting
  {
    id: 'html-4-challenge-1',
    questId: 'html-4',
    order: 1,
    title: 'Rune Inscription',
    description: 'Apply formatting runes to enhance text presentation.',
    initialCode: '<body>\n  <h1>The Ancient Text</h1>\n  <p>This is important knowledge. Listen carefully. This whispers ancient secrets.</p>\n  <p>The old world ends. The new world begins.</p>\n</body>',
    targetOutput: 'Formatted text with strong, em, and hr.',
    validationRules: [
      { type: 'contains', value: '<strong>', message: 'Missing strong element' },
      { type: 'contains', value: '<em>', message: 'Missing em element' },
      { type: 'contains', value: '<hr', message: 'Missing hr element' }
    ],
    xpReward: 80,
    attempts: 3,
    maxAttempts: 3
  },
  // Quest 5: Links
  {
    id: 'html-5-challenge-1',
    questId: 'html-5',
    order: 1,
    title: 'Portal Creation',
    description: 'Create navigation portals between realms.',
    initialCode: '<body>\n  <h1>Navigate Realms</h1>\n  <p>Explore the connected worlds:</p>\n  \n</body>',
    targetOutput: 'Three links with different purposes.',
    validationRules: [
      { type: 'contains', value: '<a ', message: 'Missing anchor element' },
      { type: 'contains', value: 'href=', message: 'Missing href attribute' },
      { type: 'attribute_present', value: 'target="_blank"', message: 'Missing target="_blank" attribute' },
      { type: 'element_count', value: 'a:3', message: 'Need three links for three realms' }
    ],
    xpReward: 90,
    attempts: 3,
    maxAttempts: 3
  },
  // Quest 6: Images
  {
    id: 'html-6-challenge-1',
    questId: 'html-6',
    order: 1,
    title: 'Memory Restoration',
    description: 'Restore visual memory fragments with proper images.',
    initialCode: '<body>\n  <h1>Visual Archives</h1>\n  <p>These images were lost to the void:</p>\n  \n</body>',
    targetOutput: 'Images with src and alt attributes.',
    validationRules: [
      { type: 'contains', value: '<img', message: 'Missing img element' },
      { type: 'attribute_present', value: 'src=', message: 'Missing src attribute' },
      { type: 'attribute_present', value: 'alt=', message: 'Missing alt attribute' },
      { type: 'element_count', value: 'img:2', message: 'Restore two memory fragments' }
    ],
    xpReward: 100,
    attempts: 3,
    maxAttempts: 3
  },
  // Quest 7: Lists
  {
    id: 'html-7-challenge-1',
    questId: 'html-7',
    order: 1,
    title: 'Scroll Organization',
    description: 'Organize knowledge into structured lists.',
    initialCode: '<body>\n  <h2>Quest Log</h2>\n  \n  <h2>Inventory</h2>\n  \n</body>',
    targetOutput: 'Ordered and unordered lists.',
    validationRules: [
      { type: 'contains', value: '<ol>', message: 'Missing ordered list' },
      { type: 'contains', value: '<ul>', message: 'Missing unordered list' },
      { type: 'element_count', value: 'li:4', message: 'Need at least 4 list items total' }
    ],
    xpReward: 110,
    attempts: 3,
    maxAttempts: 3
  },
  // Quest 8: Tables
  {
    id: 'html-8-challenge-1',
    questId: 'html-8',
    order: 1,
    title: 'Tablet Inscription',
    description: 'Record data in structured tablets.',
    initialCode: '<body>\n  <h1>Creature Database</h1>\n  \n</body>',
    targetOutput: 'Table with headers and data.',
    validationRules: [
      { type: 'contains', value: '<table>', message: 'Missing table element' },
      { type: 'contains', value: '<th', message: 'Missing table header cell' },
      { type: 'contains', value: '<td', message: 'Missing table data cell' },
      { type: 'element_count', value: 'tr:3', message: 'Need at least 3 rows' }
    ],
    xpReward: 120,
    attempts: 3,
    maxAttempts: 3
  },
  // Quest 9: Forms (Boss)
  {
    id: 'html-9-challenge-1',
    questId: 'html-9',
    order: 1,
    title: 'Ritual Portal',
    description: 'Create a form to receive offerings from users.',
    initialCode: '<body>\n  <h1>Applicant Registry</h1>\n  \n</body>',
    targetOutput: 'Complete form with labels and inputs.',
    validationRules: [
      { type: 'contains', value: '<form', message: 'Missing form element' },
      { type: 'attribute_present', value: 'type="text"', message: 'Missing text input' },
      { type: 'attribute_present', value: 'type="email"', message: 'Missing email input' },
      { type: 'contains', value: '<label', message: 'Missing label element' },
      { type: 'contains', value: '<button', message: 'Missing button element' }
    ],
    xpReward: 150,
    attempts: 3,
    maxAttempts: 3
  }
];

export const shopItems: ShopItem[] = [
  {
    id: 'hint-token',
    name: 'Hint Token',
    description: 'Reveals a direction hint for the current challenge.',
    type: 'hint',
    price: 25,
    effect: 'Show Level 1 hint',
    icon: 'Lightbulb'
  },
  {
    id: 'insight-scroll',
    name: 'Insight Scroll',
    description: 'Provides a detailed concept explanation for the challenge.',
    type: 'insight',
    price: 50,
    effect: 'Show Level 2 hint',
    icon: 'ScrollText'
  },
  {
    id: 'debug-crystal',
    name: 'Debug Crystal',
    description: 'Highlights potential errors in your code.',
    type: 'debug',
    price: 75,
    effect: 'Show error locations',
    icon: 'Sparkles'
  },
  {
    id: 'retry-charm',
    name: 'Retry Charm',
    description: 'Restores all attempts and removes stall state.',
    type: 'retry',
    price: 100,
    effect: 'Reset attempts',
    icon: 'RefreshCw'
  },
  {
    id: 'skip-rune',
    name: 'Skip Rune',
    description: 'Skip the current challenge (cannot use on boss fights).',
    type: 'skip',
    price: 200,
    effect: 'Skip to next challenge',
    icon: 'SkipForward'
  },
  {
    id: 'arcane-aura',
    name: 'Arcane Aura',
    description: 'A mystical cosmetic aura surrounding your avatar.',
    type: 'cosmetic',
    price: 150,
    effect: 'Unlock cosmetic',
    icon: 'Sparkles'
  },
  {
    id: 'coder-crown',
    name: 'Coder Crown',
    description: 'A golden crown marking you as a true Code Master.',
    type: 'cosmetic',
    price: 500,
    effect: 'Unlock cosmetic',
    icon: 'Crown'
  }
];
