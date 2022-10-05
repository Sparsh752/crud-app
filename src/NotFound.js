import {Link} from "react-router-dom"
const NotFound = () => {
    return (
        <div className="not-found">
            <center><h1>Sorry the page could not be found</h1>
            <Link to={'/'}>Back to HomePage</Link>
            </center>
        </div>
    );
}
 
export default NotFound;