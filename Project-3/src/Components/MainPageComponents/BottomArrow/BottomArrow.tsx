import React from "react";
import { BsFillArrowDownCircleFill } from "react-icons/bs";
import "./BottomArrow.css"

const BottomArrow = () => {

    return (
        <div className="BottomNavBarArrows">
            <button className="buttonholder"><BsFillArrowDownCircleFill/></button>
        </div>
    )
}

export default BottomArrow;
