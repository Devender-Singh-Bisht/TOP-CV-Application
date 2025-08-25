
import Template from "./Template1";

import "../styles/Rightside.css";



function Rightside({userDetails}) {

    return (
        <aside className="rightside">

            <div className="right-top">
                <button onClick={()=> window.print()}>Preview & Print</button>
            </div>

            <div className="template-container">
                <Template details = {userDetails} />
            </div>

        </aside>
    );
}


export default Rightside;