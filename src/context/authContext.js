import {useContext,createContext} from "react";

export const AuthContext = createContext();

export default  ()=>{
    return useContext(AuthContext)
}
