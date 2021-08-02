const Table = (props) => {
    return (
        <table className={props.className}>
            <thead>
                <tr>
                {props.headers && props.headers.map((header) => {
                    return <th key={header}>{header}</th>
                })}
                </tr>
            </thead>
            <tbody>
                {props.children}
            </tbody>
        </table>
    )
}

export default Table