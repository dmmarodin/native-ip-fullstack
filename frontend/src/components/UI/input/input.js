import "./input.scss";

const Input = (props) => {
    return (
        <div className="input-group">
            <label htmlFor={"input-" + props.id}>{props.name}</label>
            <input type="text" id={"input-" + props.id} onChange={e => props.onChange(e.target.value)} value={props.value || ""} />
        </div>
    )
}

export default Input;