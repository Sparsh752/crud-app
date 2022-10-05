import { useState } from "react";
import {useHistory,useParams} from "react-router-dom";
import useFetch from "./useFetch";
import {Link} from "react-router-dom"

const Edit = () => {
    const handleUpdate=(e)=>{
        e.preventDefault();
        const new_row={name}
        setName('');
        fetch('http://localhost:8000/data/'+id,{
            method:"PATCH",
            headers:{
                "Content-Type" : "application/json"
            },
            body:JSON.stringify(new_row)
        }).then(()=>{
            window.location.reload();
        })
        
        
    }
    const [name,setName]=useState('');
    const history=useHistory();
    const {id}=useParams();
    const {data: row,isPending,error}=useFetch('http://localhost:8000/data/'+id);
    return (
        <div className="edit">
            {error && <div>{error}</div>}
            {isPending && <center><div>Loading...</div></center>}
            {row &&
                <center>
                <h1>Update Task</h1>
                <form onSubmit={handleUpdate}>
                    <input type="text"
                    required
                    placeholder={row.name}
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    />
                    <button className="submit">Submit</button>
                </form>

                <Link to={'/'}><button className="cancel">Cancel</button></Link>
            </center>
            }
            
        </div>
    );
}
 
export default Edit;