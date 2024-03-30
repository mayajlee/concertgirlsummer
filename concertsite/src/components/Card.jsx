function Card({label, title}) {
    const divStyle = {
        backgroundColor: "#FFEECF",
        border: "20px solid #9E2A2B",
        borderRadius: "40px",
        height:"200px",
        width:"330px",
        margin: "20px",
        color: "black"
    }
    return(
        <div style={divStyle}>
            <h1 style= {{fontSize: "35px"}}>{title}</h1>
            <h2 style={{fontFamily: "Modak"}}>{label}</h2>
        </div>
    )
}

export default Card;