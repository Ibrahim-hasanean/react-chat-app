import React,{useState,useEffect,useRef} from 'react'
import SocketIoClient from "socket.io-client";
import useAuthContext from "../context/authContext";
const useChat = () => {
    const socketRef = useRef();
    const {messages,setMessages,} = useAuthContext();

    useEffect(()=>{
        socketRef.current= SocketIoClient("http://localhost:4000/chat", {transports: ['websocket']});                        

        socketRef.current.on("log",(data)=>{            
            console.log(data)
        })
        
        return ()=> {socketRef.current.disconnect();}
    },[])
    if(socketRef.current){
    
    socketRef.current.on("reciveMessage",(data)=>{
        const {message,senderId,chatRoomId} = data;
        console.log(data)
        setMessages([{message,senderId}])
    })
}

    const joinRoom = (senderId,reciverId)=>{
        socketRef.current.emit("joinRoom",{senderId,reciverId})
        let roomName = [senderId,reciverId].sort().join("-");
        return roomName;
    }
    const sendMessage = (senderId,chatRoomId,message)=>{
        socketRef.current.emit("sendMessage",{senderId,chatRoomId,message})
    }
    const leaveRoom = (curruentRoom)=>{      
        if(socketRef.current){  
            socketRef.current.emit("leaveRoom",{curruentRoom})            
        }
    }
    const emitTyping = (userTyping,roomId)=>{
        socketRef.current.emit("typing",{userTyping,roomId})
    }

    return {joinRoom,sendMessage,leaveRoom,emitTyping};
}

export default useChat
