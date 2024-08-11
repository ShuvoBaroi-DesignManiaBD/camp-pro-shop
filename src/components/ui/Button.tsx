import { ReactElement, ReactHTML, ReactNode } from "react";
import { Button as AntButton} from "antd";
type buttonType = "primaryButton" | "secondaryButton" | "textButton" | "primaryButtonLg" | "secondaryButtonLg" | "textButtonLg" | "primaryButtonSm" | "secondaryButtonSm" | "textButtonSm";

const Button = (btnType:buttonType, text:string, icon:ReactNode) => {
    return (
        // <button className={btnType === "primaryButton" ? "primaryButton" : ''}>
        //     {text}
        //     {icon && icon}
        // </button>
        <AntButton type="primary"></AntButton>
    );
};

export default Button;