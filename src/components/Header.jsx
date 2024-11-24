import {Link, NavLink } from "react-router-dom"
import "../index.css"
import { useState } from "react"
export default function Header(){

    const[menuopen, setMenuopen] = useState(false)

    return(
            <nav>
                <Link to ="/" className="title">Plantey</Link>
                <div className="menu" onClick={()=>{
                    setMenuopen(!menuopen)
                }}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <ul className={menuopen ? "open" : ""}>
                    <li><NavLink to ="/knowplants">Know Plants</NavLink></li>
                    <li><NavLink to ="/tips">Grow Tips</NavLink></li>
                </ul>
            </nav>
    )
}