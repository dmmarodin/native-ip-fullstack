import "./wrapper.scss";

const Wrapper = (props) => {
    return (
        <div className="content-wrapper">{props.children}</div>
    )
}

export default Wrapper;