import { CoursePart } from "../../data/courseparts";

interface PartInterface {
  coursePart: CoursePart;
}

const Part = ({ coursePart }: PartInterface) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (coursePart.kind) {
    case "basic":
      return (
        <>
          <b>
            {coursePart.name} {coursePart.exerciseCount}
          </b>
          <br />
          <p style={{ margin: 0 }}>
            <i>{coursePart.description}</i>
          </p>
          <br />
        </>
      );
    case "group":
      return (
        <>
          <b>
            {coursePart.name} {coursePart.exerciseCount}
          </b>
          <p style={{ margin: 0 }}>
            project exercises {coursePart.groupProjectCount}
          </p>
          <br />
        </>
      );
    case "background":
      return (
        <>
          <b>
            {coursePart.name} {coursePart.exerciseCount}
          </b>
          <br />
          <p style={{ margin: 0 }}>
            <i>{coursePart.description}</i>
          </p>
          <p style={{ margin: 0 }}>submit to {coursePart.backgroundMaterial}</p>
          <br />
        </>
      );
    case "special":
      return (
        <>
          <b>
            {coursePart.name} {coursePart.exerciseCount}
          </b>
          <br />
          <i>{coursePart.description}</i>
          <br />
          <p style={{ margin: 0 }}>
            required skills: {coursePart.requirements.join(",")}
          </p>
          <br />
        </>
      );
    default:
      return assertNever(coursePart);
  }
};

export default Part;
