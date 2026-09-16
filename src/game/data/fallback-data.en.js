export const GAME_VERSION_EN = "1.0.0";
export const QUESTION_VERSION_EN = "2026.09.15";

const instinct = [
  {
    id: "instinct-outage",
    eyebrow: "Campus signal 01",
    question: "The campus website suddenly won’t open. What makes you most curious?",
    options: [
      { id: "repair", label: "Take it apart and fix it", detail: "I want to make it work again.", icon: "build", feedback: "You immediately see something that can be rebuilt.", weights: { builder: 5, problemSolver: 2 }, primary: "builder" },
      { id: "trace", label: "Find out what caused it", detail: "I want to follow the trail of the problem.", icon: "debug", feedback: "You’re drawn to the story behind the problem.", weights: { problemSolver: 5, analyst: 2 }, primary: "problemSolver" },
      { id: "experience", label: "Make it clearer to use", detail: "I want the experience to stay comfortable.", icon: "design", feedback: "You notice how technology feels for other people.", weights: { designer: 5, builder: 1 }, primary: "designer" },
      { id: "secure", label: "Make sure there’s no gap", detail: "I want to know the system stays safe.", icon: "shield", feedback: "You think about what needs protecting.", weights: { guardian: 5, problemSolver: 1 }, primary: "guardian" },
    ],
  },
  {
    id: "instinct-crowd",
    eyebrow: "Campus signal 02",
    question: "The campus event app is suddenly used by thousands of people. Which part do you most want to own?",
    options: [
      { id: "scale", label: "Keep the system strong", detail: "So the service stays up when it’s busy.", icon: "cloud", feedback: "You think about foundations ready for many users.", weights: { builder: 4, guardian: 2 }, primary: "builder" },
      { id: "bottleneck", label: "Find what makes it slow", detail: "I want to find the bottleneck.", icon: "search", feedback: "You choose to read the symptoms before acting.", weights: { problemSolver: 4, analyst: 3 }, primary: "problemSolver" },
      { id: "flow", label: "Simplify the user flow", detail: "So people quickly find what they need.", icon: "flow", feedback: "You see the system from the user’s point of view.", weights: { designer: 5, analyst: 1 }, primary: "designer" },
      { id: "experiment", label: "Try an auto-queue feature", detail: "I’m curious whether new tech could help.", icon: "spark", feedback: "You’re keen to test a new possibility.", weights: { explorer: 5, builder: 1 }, primary: "explorer" },
    ],
  },
  {
    id: "instinct-admin",
    eyebrow: "Campus signal 03",
    question: "Campus admin work feels repetitive and slow. What do you want to do first?",
    options: [
      { id: "automate", label: "Build a simple automation", detail: "I want to cut repetitive work.", icon: "automation", feedback: "You see a chance to make technology work smarter.", weights: { explorer: 5, builder: 2 }, primary: "explorer" },
      { id: "map", label: "Map the process end to end", detail: "I want to know where the time goes.", icon: "map", feedback: "You choose to understand the pattern before changing it.", weights: { analyst: 5, problemSolver: 2 }, primary: "analyst" },
      { id: "redesign", label: "Tidy up the forms and flow", detail: "I want the process to feel light.", icon: "layout", feedback: "You notice details users feel directly.", weights: { designer: 5, builder: 1 }, primary: "designer" },
      { id: "validate", label: "Keep the data accurate", detail: "I want to stop errors from spreading.", icon: "check", feedback: "You keep the system trustworthy.", weights: { guardian: 4, analyst: 3 }, primary: "guardian" },
    ],
  },
];

const buildComponents = [
  { id: "frontend", label: "Frontend", description: "Pages used directly by applicants.", icon: "frontend", weights: { builder: 5, designer: 3 } },
  { id: "backend", label: "Backend", description: "The logic behind registration.", icon: "backend", weights: { builder: 5, problemSolver: 2 } },
  { id: "database", label: "Database", description: "Where applicant data stays structured.", icon: "database", weights: { analyst: 5, builder: 2 } },
  { id: "cloud", label: "Cloud", description: "Resources that scale with the system.", icon: "cloud", weights: { explorer: 4, builder: 3 } },
  { id: "network", label: "Network", description: "The path connecting users and services.", icon: "network", weights: { guardian: 4, problemSolver: 3 } },
  { id: "security", label: "Security", description: "Protection for applicant access and data.", icon: "shield", weights: { guardian: 5, problemSolver: 2 } },
  { id: "ai", label: "AI", description: "Smart help for questions or data checks.", icon: "spark", weights: { explorer: 5, analyst: 2 } },
  { id: "uiux", label: "UI/UX", description: "Flows that make registration easy to follow.", icon: "design", weights: { designer: 5, analyst: 1 } },
];

const crisis = [
  {
    id: "crisis-server",
    eyebrow: "Server outage",
    headline: "SERVER DOWN",
    question: "The campus website is unreachable. Which first move interests you most?",
    icon: "alert",
    options: [
      { id: "logs", label: "Read logs and find error patterns", detail: "Follow the clues the system left behind.", icon: "debug", feedback: "You choose to read the trail before changing anything.", weights: { problemSolver: 5, analyst: 2 }, primary: "problemSolver" },
      { id: "network", label: "Check the network path", detail: "Make sure requests can still reach the server.", icon: "network", feedback: "You check the vital path keeping the system connected.", weights: { guardian: 4, problemSolver: 3 }, primary: "guardian" },
      { id: "deploy", label: "Review the latest changes", detail: "Find out what changed before the outage.", icon: "history", feedback: "You connect the present incident to earlier changes.", weights: { analyst: 4, problemSolver: 3 }, primary: "analyst" },
      { id: "fallback", label: "Build a temporary status page", detail: "Give clear info while the team fixes the system.", icon: "frontend", feedback: "You protect the user experience while the main fix is prepared.", weights: { builder: 3, designer: 3 }, primary: "builder" },
    ],
  },
  {
    id: "crisis-login",
    eyebrow: "Security signal",
    headline: "SUSPICIOUS LOGIN",
    question: "There’s an unusual login pattern on campus accounts. What do you check first?",
    icon: "shield",
    options: [
      { id: "protect", label: "Secure the affected sessions", detail: "Limit the risk while checking.", icon: "lock", feedback: "You prioritize protection while info is incomplete.", weights: { guardian: 5, builder: 1 }, primary: "guardian" },
      { id: "pattern", label: "Compare the timing patterns", detail: "Look for anomalies in the activity chain.", icon: "chart", feedback: "You look for patterns that explain the event.", weights: { analyst: 5, guardian: 1 }, primary: "analyst" },
      { id: "trace", label: "Trace the auth flow", detail: "Understand how that access could happen.", icon: "debug", feedback: "You’re keen to unpack how the problem works.", weights: { problemSolver: 5, guardian: 2 }, primary: "problemSolver" },
      { id: "detect", label: "Try automatic detection", detail: "Experiment with alerts for similar patterns.", icon: "spark", feedback: "You see a chance to test new protection.", weights: { explorer: 5, guardian: 2 }, primary: "explorer" },
    ],
  },
  {
    id: "crisis-ui",
    eyebrow: "Experience issue",
    headline: "BROKEN UI",
    question: "The registration form looks broken on some screens. Where do you start?",
    icon: "layout",
    options: [
      { id: "reproduce", label: "Reproduce it on several screens", detail: "Find the condition triggering the broken view.", icon: "search", feedback: "You choose to make the problem clearly observable.", weights: { problemSolver: 5, designer: 2 }, primary: "problemSolver" },
      { id: "journey", label: "See which flow suffers most", detail: "Prioritize the impact on users.", icon: "flow", feedback: "You judge the issue by the experience felt most.", weights: { designer: 5, analyst: 1 }, primary: "designer" },
      { id: "component", label: "Rebuild the broken component", detail: "Make that part stable and reusable.", icon: "build", feedback: "You want to turn findings into working components.", weights: { builder: 5, designer: 1 }, primary: "builder" },
      { id: "device-data", label: "Group the device data", detail: "See if there’s a pattern in sizes or browsers.", icon: "chart", feedback: "You look for structure behind scattered reports.", weights: { analyst: 5, problemSolver: 1 }, primary: "analyst" },
    ],
  },
  {
    id: "crisis-database",
    eyebrow: "Performance issue",
    headline: "SLOW DATABASE",
    question: "Student data search keeps getting slower. Which investigation excites you most?",
    icon: "database",
    options: [
      { id: "query", label: "Look at the heaviest queries", detail: "Find the operations costing the most time.", icon: "chart", feedback: "You choose to measure before deciding.", weights: { analyst: 5, problemSolver: 2 }, primary: "analyst" },
      { id: "trace", label: "Follow the request from the start", detail: "Find where the flow starts slowing down.", icon: "debug", feedback: "You want to understand the whole path.", weights: { problemSolver: 5, analyst: 1 }, primary: "problemSolver" },
      { id: "cache", label: "Try a simple cache layer", detail: "Test a new way to speed up frequent reads.", icon: "spark", feedback: "You’re keen to test a fix users can feel.", weights: { explorer: 4, builder: 3 }, primary: "explorer" },
      { id: "capacity", label: "Check the infrastructure capacity", detail: "Make sure the foundation is still strong enough.", icon: "cloud", feedback: "You think about the system’s overall resilience.", weights: { guardian: 4, builder: 2 }, primary: "guardian" },
    ],
  },
  {
    id: "crisis-dataset",
    eyebrow: "Data issue",
    headline: "MESSY DATASET",
    question: "Student activity data comes from many messy sources. What do you do first?",
    icon: "chart",
    options: [
      { id: "sample", label: "Clean one small sample", detail: "Find rules that can be reused.", icon: "check", feedback: "You turn a big problem into testable steps.", weights: { analyst: 5, problemSolver: 2 }, primary: "analyst" },
      { id: "pipeline", label: "Build a consistent import flow", detail: "Create a system that tidies data on entry.", icon: "build", feedback: "You’re drawn to building repeatable processes.", weights: { builder: 5, analyst: 1 }, primary: "builder" },
      { id: "visual", label: "Visualize the mess", detail: "Use visuals so problem patterns are readable.", icon: "design", feedback: "You make complex info easier to grasp.", weights: { designer: 4, analyst: 3 }, primary: "designer" },
      { id: "model", label: "Experiment with auto-grouping", detail: "See whether new tech can find the structure.", icon: "spark", feedback: "You’re keen to find patterns by experimenting.", weights: { explorer: 5, analyst: 2 }, primary: "explorer" },
    ],
  },
];

const decisions = [
  {
    id: "decision-website",
    eyebrow: "Quick decision 01",
    question: "You have one day to improve the campus website. Where do you focus?",
    options: [
      { id: "feature", label: "Features that really work", detail: "Turn ideas into usable functions.", icon: "build", feedback: "You choose progress people can use right away.", weights: { builder: 5, problemSolver: 1 }, primary: "builder" },
      { id: "speed", label: "What makes it slow", detail: "Find and remove the biggest blocker.", icon: "debug", feedback: "You choose to fix the root disruption.", weights: { problemSolver: 5, analyst: 1 }, primary: "problemSolver" },
      { id: "clarity", label: "Flows that are easier to follow", detail: "Make every step feel clear.", icon: "design", feedback: "You prioritize a humane experience.", weights: { designer: 5, analyst: 1 }, primary: "designer" },
      { id: "prototype", label: "A smart new feature prototype", detail: "Test a possibility never tried before.", icon: "spark", feedback: "You choose to open new possibilities.", weights: { explorer: 5, builder: 1 }, primary: "explorer" },
    ],
  },
  {
    id: "decision-data",
    eyebrow: "Quick decision 02",
    question: "You receive a messy dataset. What do you most want to find?",
    options: [
      { id: "pattern", label: "Hidden patterns", detail: "Arrange the data until its story shows.", icon: "chart", feedback: "You’re drawn to structures not yet visible.", weights: { analyst: 5, explorer: 1 }, primary: "analyst" },
      { id: "cause", label: "The source of errors", detail: "Trace why the data became inconsistent.", icon: "search", feedback: "You want the cause before fixing the output.", weights: { problemSolver: 5, analyst: 2 }, primary: "problemSolver" },
      { id: "tool", label: "A tool to tidy it automatically", detail: "Build a process that can be reused.", icon: "automation", feedback: "You see a chance to build repeatable solutions.", weights: { builder: 4, explorer: 3 }, primary: "builder" },
      { id: "privacy", label: "Sensitive data to protect", detail: "Make sure important info doesn’t leak.", icon: "shield", feedback: "You mind the responsibility behind data.", weights: { guardian: 5, analyst: 1 }, primary: "guardian" },
    ],
  },
  {
    id: "decision-login",
    eyebrow: "Quick decision 03",
    question: "One suspicious login appears. Which detail catches you first?",
    options: [
      { id: "protect", label: "Accounts and access to protect", detail: "Reduce the risk before it grows.", icon: "shield", feedback: "You immediately see what must be guarded.", weights: { guardian: 5, problemSolver: 1 }, primary: "guardian" },
      { id: "timeline", label: "The activity timeline", detail: "Piece events together to read the pattern.", icon: "history", feedback: "You arrange facts into a clear picture.", weights: { analyst: 5, problemSolver: 2 }, primary: "analyst" },
      { id: "mechanism", label: "How that access could happen", detail: "Take the mechanism apart until it makes sense.", icon: "debug", feedback: "You’re drawn to how things work behind the symptom.", weights: { problemSolver: 5, guardian: 2 }, primary: "problemSolver" },
      { id: "detector", label: "How to detect similar patterns", detail: "Experiment so the system learns to warn.", icon: "spark", feedback: "You turn the incident into an exploration idea.", weights: { explorer: 5, guardian: 2 }, primary: "explorer" },
    ],
  },
];

export const fallbackDataEn = Object.freeze({
  gameVersion: GAME_VERSION_EN,
  questionVersion: QUESTION_VERSION_EN,
  config: {
    communityCtaUrl: "",
    resultIdleSeconds: 90,
    activeIdleSeconds: 180,
  },
  instinct,
  buildComponents,
  crisis,
  decisions,
});
