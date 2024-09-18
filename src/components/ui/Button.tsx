import { Button as AntButton} from "antd";

const Button = () => {
    return (
        // <button className={btnType === "primaryButton" ? "primaryButton" : ''}>
        //     {text}
        //     {icon && icon}
        // </button>
        <AntButton type="primary"></AntButton>
    );
};

export default Button;