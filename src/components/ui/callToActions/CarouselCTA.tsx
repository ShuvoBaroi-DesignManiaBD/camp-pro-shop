import { NavLink } from "react-router-dom";

type carouselCTA = {
  subHeading: string;
  subHeadingStyle: string;
  subHeadingColor:
    | "text"
    | "Primary"
    | "primaryLight"
    | "primaryDark"
    | "secondary"
    | "secondaryLight"
    | "secondaryDark";
  HeadingText: string;
  HeadingColor:
    | "text"
    | "Primary"
    | "primaryLight"
    | "primaryDark"
    | "secondary"
    | "secondaryLight"
    | "secondaryDark";
  Heading: string;
  headingColoredText: string;
  headingSecondaryColor:
    | "text"
    | "Primary"
    | "primaryLight"
    | "primaryDark"
    | "secondary"
    | "secondaryLight"
    | "secondaryDark";
  text: string;
  textStyle: string;
  btnType:
    | "primaryButton"
    | "primaryButtonOutlined"
    | "primaryButtonSm"
    | "primaryButtonOutlinedSm"
    | "primaryButtonText"
    | "primaryButtonTextSm"
    | "secondaryButton"
    | "secondaryButtonOutlined"
    | "secondaryButtonSm"
    | "secondaryButtonOutlinedSm";
  btnText: string;
  btnURL: string;
  headingStyle: string;
  className: string;
  height: string;
  innerContentStyle: string;
};

const CarouselCTA = ({
  subHeading,
  subHeadingColor,
  HeadingText,
  HeadingColor,
  headingColoredText,
  headingSecondaryColor,
  text,
  textStyle,
  btnType,
  btnText,
  btnURL,
  headingStyle,
  className,
  innerContentStyle,
  subHeadingStyle
}: Partial<carouselCTA>) => {
  return (
    <div
      className={`${className} bg-cover flex flex-col justify-center items-center gap-3`}
    >
      <div className="container mx-auto">
        <div className={innerContentStyle}>
          <h4 className={`${subHeadingColor} ${subHeadingStyle}`}>{subHeading}</h4>
          <h1 className={`${HeadingColor ? HeadingColor : ""} ${headingStyle}`}>
            {HeadingText}
            {headingColoredText && (
              <span className={`text-${headingSecondaryColor}`}>
                <br />
                {headingColoredText}
              </span>
            )}
          </h1>
          {text && <p className={`${textStyle} text`}>{text}</p>}
          <NavLink to={btnURL as string} className={btnType}>
            {btnText}
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default CarouselCTA;
