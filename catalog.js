/**
 * MyAnatomy Candidate Career Hub · Catalog Data
 * Contains 18 Platform Features & 6 Skill Dimensions
 */

window.CandidateCatalog = {
  features: [
    {
      id: 'profile',
      group: 'identity',
      title: 'Profile',
      eyebrow: 'Your foundation',
      headline: 'Put your strengths in one clear place',
      summary: 'Create a trustworthy candidate profile that keeps your education, skills, and achievements ready for every opportunity.',
      details: [
        'Add education, skills, projects, and achievements once.',
        'Keep contact and preference details current.',
        'Review what recruiters and programs can see.'
      ],
      outcome: 'A profile ready to move with you.',
      icon: 'user'
    },
    {
      id: 'resume',
      group: 'identity',
      title: 'Resume',
      eyebrow: 'Profile to resume',
      headline: 'Turn your profile into a sharper resume',
      summary: 'Build a clean, ATS-friendly resume from your profile details, then refine it for the roles you want.',
      details: [
        'Generate a first draft from your profile.',
        'Edit experience and project language for clarity.',
        'Export a clean version for applications.'
      ],
      outcome: 'A resume that starts strong.',
      icon: 'file'
    },
    {
      id: 'matching',
      group: 'identity',
      title: 'JD-CV Matching',
      eyebrow: 'Fit with intent',
      headline: 'See where your resume fits best',
      summary: 'Compare your resume with job descriptions to spot aligned strengths and practical gaps before applying.',
      details: [
        'Paste or select a target job description.',
        'Review matching skills and missing keywords.',
        'Prioritize edits before your next application.'
      ],
      outcome: 'More focused applications.',
      icon: 'match'
    },
    {
      id: 'portfolio',
      group: 'identity',
      title: 'Portfolio',
      eyebrow: 'Show your work',
      headline: 'Keep a living record of proof',
      summary: 'Use the portfolio builder to present projects, outcomes, and work samples beyond a one-page resume.',
      details: [
        'Add projects with your role and contribution.',
        'Include project links, skills, and education.',
        'Choose a style and export your own portfolio website.'
      ],
      outcome: 'Proof that makes skills tangible.',
      icon: 'grid'
    },
    {
      id: 'events',
      group: 'community',
      title: 'Events',
      eyebrow: 'Stay in motion',
      headline: 'Never miss your next useful event',
      summary: 'Track hiring drives, webinars, assessments, and community moments from one candidate calendar.',
      details: [
        'Browse events relevant to your profile.',
        'Save dates and registration details.',
        'Prepare questions before you join.'
      ],
      outcome: 'Better timing, less chasing.',
      icon: 'calendar'
    },
    {
      id: 'courses',
      group: 'growth',
      title: 'Courses',
      eyebrow: 'Build capability',
      headline: 'Learn the skills your next role needs',
      summary: 'Follow structured learning paths that turn identified gaps into practical, job-ready capability.',
      details: [
        'Choose a course aligned to your goal.',
        'Work through lessons at your pace.',
        'Apply learning in practice activities.'
      ],
      outcome: 'Progress you can put to work.',
      icon: 'book'
    },
    {
      id: 'ncet',
      group: 'growth',
      title: 'NCET',
      eyebrow: 'Benchmark your readiness',
      headline: 'Understand your current employability skills',
      summary: 'Take the NCET assessment when available to receive a multidimensional view of your readiness.',
      details: [
        'Check the current eligibility and format.',
        'Complete the available assessment sections.',
        'Review your report and suggested next steps.'
      ],
      outcome: 'A clearer starting point.',
      icon: 'target'
    },
    {
      id: 'ncetplus',
      group: 'growth',
      title: 'NCET+',
      eyebrow: 'Go deeper',
      headline: 'Extend your assessment journey',
      summary: 'Explore NCET+ when eligible for broader or advanced assessment and development pathways on the platform.',
      details: [
        'Confirm program scope and eligibility first.',
        'Choose the pathway that fits your goals.',
        'Use the resulting insights to plan growth.'
      ],
      outcome: 'A deeper view of your next move.',
      icon: 'graduation'
    },
    {
      id: 'assessments',
      group: 'growth',
      title: 'Assessments',
      eyebrow: 'See skills clearly',
      headline: 'Show how you think and work',
      summary: 'Explore role-relevant assessments across technical, cognitive, aptitude, emotional intelligence, and communication skills.',
      details: [
        'Select an assessment matching your target role.',
        'Read instructions before starting.',
        'Use feedback to choose your next practice step.'
      ],
      outcome: 'Evidence for better decisions.',
      icon: 'radar'
    },
    {
      id: 'sandbox',
      group: 'growth',
      title: 'Sandbox',
      eyebrow: 'Practice safely',
      headline: 'Try ideas before they count',
      summary: 'Use a live coding workspace to experiment, solve problems, and build confidence without application pressure.',
      details: [
        'Open a problem or start a small experiment.',
        'Run, revise, and compare your approach.',
        'Save useful work for your portfolio.'
      ],
      outcome: 'Confidence earned through practice.',
      icon: 'code'
    },
    {
      id: 'hackathons',
      group: 'community',
      title: 'Hackathons',
      eyebrow: 'Build in public',
      headline: 'Solve real challenges with other builders',
      summary: 'Join hackathons to practice collaboration, tackle realistic briefs, and create work worth showing.',
      details: [
        'Find a challenge that fits your interests.',
        'Form a team and define your contribution.',
        'Document the result for your portfolio.'
      ],
      outcome: 'Experience, visibility, and new connections.',
      icon: 'trophy'
    },
    {
      id: 'recommendation',
      group: 'career',
      title: 'Career Recommendation',
      eyebrow: 'Choose your direction',
      headline: 'Turn signals into a practical next step',
      summary: 'Use your profile, interests, and assessment insights to explore roles and development paths that fit.',
      details: [
        'Review suggested roles and skill themes.',
        'Compare each path with your current evidence.',
        'Pick one next action to test the fit.'
      ],
      outcome: 'A direction you can act on.',
      icon: 'compass'
    },
    {
      id: 'leaderboard',
      group: 'community',
      title: 'Leaderboard',
      eyebrow: 'Track your progress',
      headline: 'See momentum without making it a verdict',
      summary: 'Use leaderboard movement as a progress signal, never as a qualification or promise of selection.',
      details: [
        'Check your position when a challenge supports it.',
        'Compare progress with your own previous activity.',
        'Keep improving rather than chasing a rank.'
      ],
      outcome: 'Motivation grounded in progress.',
      icon: 'chart'
    },
    {
      id: 'campus',
      group: 'career',
      title: 'Campus Opportunities',
      eyebrow: 'Start close to home',
      headline: 'Find opportunities through your campus',
      summary: 'Discover campus-connected hiring drives and events when your college or program makes them available.',
      details: [
        'Check opportunities shared with your campus.',
        'Confirm requirements and timelines carefully.',
        'Register through the listed process.'
      ],
      outcome: 'A clearer campus route to apply.',
      icon: 'campus'
    },
    {
      id: 'offcampus',
      group: 'career',
      title: 'Off-campus Opportunities',
      eyebrow: 'Look further',
      headline: 'Explore roles beyond your campus',
      summary: 'Browse broader hiring opportunities and campaigns matched to your profile and current readiness.',
      details: [
        'Filter roles by skills and location.',
        'Tailor your resume to the opportunity.',
        'Track each application and follow-up.'
      ],
      outcome: 'More relevant paths to explore.',
      icon: 'globe'
    },
    {
      id: 'jobready',
      group: 'career',
      title: 'Job Ready Program',
      eyebrow: 'Close the gap',
      headline: 'Prepare deliberately for your target role',
      summary: 'Use a structured development path to strengthen weak areas before you apply or interview.',
      details: [
        'Review the skills your target role expects.',
        'Practice the areas needing more evidence.',
        'Recheck your readiness before applying.'
      ],
      outcome: 'A more prepared application.',
      icon: 'briefcase'
    },
    {
      id: 'badges',
      group: 'recognition',
      title: 'Badges',
      eyebrow: 'Mark each milestone',
      headline: 'Make progress visible as you build',
      summary: 'Collect lightweight badges for platform milestones, participation, and completed learning or practice activities.',
      details: [
        'Complete an activity that offers a badge.',
        'Review what each badge represents.',
        'Share progress selectively with your network.'
      ],
      outcome: 'Small wins you can see.',
      icon: 'badge'
    },
    {
      id: 'certificates',
      group: 'recognition',
      title: 'Certificates',
      eyebrow: 'Formal proof',
      headline: 'Keep verified completion within reach',
      summary: 'Access formal certificates when you complete an eligible assessment or program and meet its requirements.',
      details: [
        'Check the completion criteria before starting.',
        'Finish the eligible assessment or program.',
        'Download or share the issued certificate.'
      ],
      outcome: 'Portable proof of completion.',
      icon: 'certificate'
    }
  ],

  dimensions: [
    {
      id: 'coding',
      title: 'Coding',
      tagline: 'Build, test, improve',
      description: 'Illustrative coding questions explore how you translate a requirement into a working, testable solution.',
      measures: ['Problem decomposition', 'Implementation accuracy', 'Edge-case thinking'],
      question: 'Which approach best finds a pair of numbers adding to a target in one pass?',
      options: [
        'Sort first, then scan adjacent values',
        'Use a set or hash map of previously seen complements',
        'Compare every pair with nested loops',
        'Return the first two numbers in the array'
      ],
      answer: 1,
      explanation: 'A complement hash map or set can find the needed earlier value in O(n) single pass, saving time over O(n²) nested loops.'
    },
    {
      id: 'domain',
      title: 'Domain',
      tagline: 'Apply role knowledge',
      description: 'Illustrative domain questions check how you apply concepts from a chosen field; content adapts to your career focus.',
      measures: ['Concept application', 'Role context', 'Technical vocabulary'],
      question: 'In a relational database, what does a primary key identify?',
      options: [
        'A row uniquely',
        'A table’s visual layout',
        'A database backup server',
        'An arbitrary column comment'
      ],
      answer: 0,
      explanation: 'A primary key enforces entity integrity by uniquely identifying each record/row in the database table.'
    },
    {
      id: 'aptitude',
      title: 'Aptitude',
      tagline: 'Reason with confidence',
      description: 'Illustrative aptitude questions sample numerical and verbal reasoning used in everyday workplace problem-solving.',
      measures: ['Numerical reasoning', 'Pattern recognition', 'Verbal logic'],
      question: 'A product price rises from 80 to 100. What is the percentage increase?',
      options: ['20%', '25%', '30%', '80%'],
      answer: 1,
      explanation: 'The difference is 20. Dividing 20 by the baseline 80 yields 0.25, which corresponds to exactly a 25% increase.'
    },
    {
      id: 'cognitive',
      title: 'Cognitive',
      tagline: 'Think through complexity',
      description: 'Illustrative cognitive questions explore structured reasoning, attention, and problem-solving without clinical diagnosis.',
      measures: ['Logical deduction', 'Pattern synthesis', 'Decision structure'],
      question: 'All blue cards are numbered. This card is blue. What follows with certainty?',
      options: [
        'It is numbered',
        'It is the highest number',
        'It is the only blue card',
        'It cannot be played this round'
      ],
      answer: 0,
      explanation: 'By direct syllogistic deduction: if all members of group A possess quality B, then any specific member of A possesses quality B.'
    },
    {
      id: 'eq',
      title: 'Emotional Intelligence',
      tagline: 'Work with awareness',
      description: 'Illustrative EQ questions explore workplace self-awareness, empathy, and collaborative conflict resolution.',
      measures: ['Self-awareness', 'Perspective taking', 'Constructive communication'],
      question: 'A teammate seems frustrated after receiving code review feedback. What is the most constructive first response?',
      options: [
        'Check in with them privately and ask how they are doing',
        'Tell them to ignore the feedback and move on',
        'Discuss their reaction openly in the team group chat',
        'Rewrite their pull request yourself immediately'
      ],
      answer: 0,
      explanation: 'A private, empathetic check-in creates psychological safety and helps clarify feedback constructively without escalating tension.'
    },
    {
      id: 'communication',
      title: 'Communication',
      tagline: 'Make meaning clear',
      description: 'Illustrative communication questions explore clarity, active listening, and audience-aware articulation in professional environments.',
      measures: ['Clarity', 'Audience awareness', 'Conciseness'],
      question: 'Which message is clearest when communicating a schedule adjustment to your team?',
      options: [
        'Need the deliverables ASAP',
        'Please submit your draft review by Thursday at 3:00 PM EST',
        'The timing situation has evolved somewhat',
        'Do the usual tasks, just slightly earlier'
      ],
      answer: 1,
      explanation: 'Actionable communication states the exact task, stakeholder, date, and deadline time, eliminating ambiguity.'
    }
  ]
};
