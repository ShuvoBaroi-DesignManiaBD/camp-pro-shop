import { ReactNode } from "react";

type ProductTopCategoryProps = {
  bgImage?: string;
  height?: string;
  className?: string;
  subHeadingStyle?: string;
  subHeadingText?: string;
  headingStyle?: string;
  headingText?: string;
  button?: ReactNode;
};

const ProductTopCategory = ({
  bgImage,
  height,
  className,
  subHeadingStyle,
  subHeadingText,
  headingStyle,
  headingText,
  button,
}: Partial<ProductTopCategoryProps>) => {
  return (
    <div
      id="product_cat"
      className={`flex flex-col justify-start items-start gap-1 p-6 bg-cover text-white ${
        className ? className : ""
      }`}
      style={{
        backgroundImage: bgImage ? `url(${bgImage})` : undefined,
        height: height ? height : "37vh",
      }}
    >
      <h4
        className={`text font-semibold text-secondaryLight ${subHeadingStyle}`}
      >
        {subHeadingText}
      </h4>
      <h2 className={`text-2xl font-bold mb-3 ${headingStyle}`}>
        {headingText}
      </h2>
      {button}
    </div>
  );
};

export default ProductTopCategory;
