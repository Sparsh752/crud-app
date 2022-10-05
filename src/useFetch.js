import { useEffect,useState } from "react";

const useFetch=(url)=>{
    const [error,setError]=useState(null);
    const [isPending,setIsPending]=useState(true);
    const [data,setData]=useState(null);
    useEffect(()=>{
        const abortcont= new AbortController;
        fetch(url,{signal: abortcont.signal}).then(response=>{
                if(!response.ok){
                    throw Error('Could not fetch the data for that resource');
                }
                return response.json()
            }).then(data=> {
                console.log(data);
                setData(data);
                setIsPending(false);
                setError(null)
            }).catch(err=>{
                 if(err.name==='AbortError'){
                    console.log('fetch aborted')
                 }else{
                    setData(null);
                    setIsPending(false);
                    setError(err.message);
                 }
                
            });
        return ()=> abortcont.abort();
    },[url])

    return {data,isPending,error}
}

export default useFetch;