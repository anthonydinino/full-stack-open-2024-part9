import Part from "./Part";
import { CoursePart } from "../../data/courseparts";

interface ContentProps {
  courseParts: CoursePart[];
}

const Content = ({ courseParts }: ContentProps) => {
  return courseParts.map((coursePart: CoursePart) => (
    <Part key={coursePart.name} coursePart={coursePart} />
  ));
};

export default Content;
