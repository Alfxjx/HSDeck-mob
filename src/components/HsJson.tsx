import HearthstoneJSON from "hearthstonejson-client";
import { useEffect } from "react";


export const HsJSON = () => {

    useEffect(()=>{
        const hsjson = new HearthstoneJSON();
        hsjson.get(2539).then(card=>{
            console.log(card);
            
        })
    }, [])

    return (
        <div>
        <h1>Hearthstone JSON</h1>
        <p>
            This is a simple example of using the HearthstoneJSON API.
        </p>
        </div>
    );
}