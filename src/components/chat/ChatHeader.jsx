/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { createRoom } from "../../utils/apis";
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'

export default function ChatHeader({isSave,setIsSave}) {
    const [roomName, setRoomName] = useState();
    const fetchRoomData = async () => {
        try {
            const response = await createRoom(roomName);
            console.log(response); 
            setIsSave(!isSave);
        } catch(e) {
            console.error(e);
        }
    }

    const handleRoomName = (event) => {
        event.preventDefault();
        setRoomName(event.target.value);
    }

    function postRoom() {
        fetchRoomData();
    }
    return (
        <div
            css={{
                display: 'flex',
                justifyContent: 'space-between',
                padding:"0px 20px",
                paddingTop: "20px",
                paddingBottom: "5px"
            
            }}>
            <div
                css={{
                    fontSize: 'x-large',
                    fontWeight: 'bold'
                }}>Chats</div>
            <div
                css={{
                    display: 'flex',
                    alignItems: 'center'
                }}>
                <input 
                    type="text" 
                    css={{
                        border: 0,
                        backgroundColor: 'rgb(233, 233, 233)',
                        borderRadius: '10px',
                        fontSize: '16px',
                        outline: 'none',
                        height: '28px',
                        padding: '10px 4px',
                        marginRight: '4px'
                    }} 
                    onChange={handleRoomName}></input>
                <MagnifyingGlassIcon
                    type="submit"
                    css={{
                        color: '#AFAFAF',
                        width: '24px'
                    }}
                    onClick={()=>{
                        postRoom()                        
                    }}/>
            </div>
        </div>
    )
}