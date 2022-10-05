import useFetch from "./useFetch";
import { faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import {useHistory} from "react-router-dom";
import {Link} from "react-router-dom"


const Home = () => {
    const history=useHistory();
    const [name,setName]=useState('')
    const {data,isPending,error}=useFetch('http://localhost:8000/data');
    const handleSubmit=(e)=>{
        e.preventDefault();
        const row={name}
        setName('');
        fetch('http://localhost:8000/data',{
                method:'POST',
                headers:{"Content-Type":"application/json"},
                body : JSON.stringify(row)
            }).then(()=>{
                window.location.reload();
            });
        
    }
    console.log(data);
    return (
        <div className="home">
            <center>
                <h1>CRUD with JSON Server</h1>
                <form onSubmit={handleSubmit}>
                    <input type="text"
                    required
                    placeholder="Enter the data to be added"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    />
                    <button className="submit">Submit</button>
                    
                </form>
                    <button onClick={()=>setName('')} className="cancel">Cancel</button>
                {isPending && <div>Loading...</div>}
                <div className="data">
                {error && <div><p>{error}</p></div>}
                {data && 
                    <div className="data-display">
                        {data.map((row)=>(
                            <div className="row-preview" key={row.id}>
                                <span className="name">{row.name}</span>
                                <Link to={`/row/${row.id}`}><span className="icons"><FontAwesomeIcon icon={faEdit} /></span></Link> 
                                <span className="icons"><FontAwesomeIcon onClick={()=>{
                                        fetch('http://localhost:8000/data/'+row.id,{
                                            method:'DELETE'
                                        }).then(()=>{
                                            window.location.reload();
                                        })
                                    }} icon={faTrash}></FontAwesomeIcon></span>
                                
                            </div>
                        ))}
                    </div>
                }
            </div>
            </center>
            
        </div>
    );
}
 
export default Home;