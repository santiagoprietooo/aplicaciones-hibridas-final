import React from "react";

function MainTitle(props) {
    return(
        <h1 className="text-4xl font-bold uppercase">
            {props.title}
        </h1>
    );
}

export default MainTitle;