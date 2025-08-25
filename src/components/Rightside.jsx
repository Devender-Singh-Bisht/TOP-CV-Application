
import Template from "./Template1";

import "../styles/Rightside.css";



function Rightside({userDetails}) {

    return (
        <aside className="rightside">

            <div className="right-top">
                <img src="../github-mark.png" alt="Github Logo" onClick={()=> window.open("https://github.com/Devender-Singh-Bisht/TOP-CV-Application", "_blank")}/>
                <button onClick={()=> window.print()}>Preview & Print</button>
            </div>

            <div className="template-container">
                <Template details = {userDetails} />
            </div>

        </aside>
    );
}


export default Rightside;