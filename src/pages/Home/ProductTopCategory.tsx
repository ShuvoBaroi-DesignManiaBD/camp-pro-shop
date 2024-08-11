import { ReactNode } from "react";

type ProductTopCategoryProps = {
  bgImage: string;
  height: string;
  className: string;
  subHeadingStyle: string;
  subHeadingText: string;
  headingStyle: string;
  headingText: string;
  button: ReactNode;
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
      className={`flex flex-col justify-start items-start gap-1 p-6 bg-${
        bgImage ? `[url('${bgImage}')]` : ""
      } h-${height ? height : "[37vh]"} bg-cover text-white ${className}`}
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
      {/* <Button type={"primaryButton"} text="Shop now" icon={<BiChevronRight />}/> */}
    </div>
  );
};

export default ProductTopCategory;
