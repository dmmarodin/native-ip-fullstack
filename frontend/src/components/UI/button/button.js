import "./button.scss";

const Button = (props) => {
    return (
        <button type={props.type || "button"} className="button">{props.children}</button>
    )
}

export default Button;