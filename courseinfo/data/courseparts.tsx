interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBaseDesc extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartBaseDesc {
  kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartSpecial extends CoursePartBaseDesc {
  requirements: string[];
  kind: "special";
}

interface CoursePartBackground extends CoursePartBaseDesc {
  backgroundMaterial: string;
  kind: "background";
}

export type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartSpecial;

export const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is an awesome course part",
    kind: "basic",
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3,
    kind: "group",
  },
  {
    name: "Basics of type Narrowing",
    exerciseCount: 7,
    description: "How to go from unknown to string",
    kind: "basic",
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    backgroundMaterial:
      "https://type-level-typescript.com/template-literal-types",
    kind: "background",
  },
  {
    name: "TypeScript in frontend",
    exerciseCount: 10,
    description: "a hard part",
    kind: "basic",
  },
  {
    name: "Backend development",
    exerciseCount: 21,
    description: "Typing the backend",
    requirements: ["nodejs", "jest"],
    kind: "special",
  },
];
