import { useAuthContext } from "./useAuthContext";
import { useUsersContext } from "./useUsersContext";

export const useLogout = () => {
    const {dispatch} = useAuthContext();
    const {dispatch: dispatchUsers} = useUsersContext();
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("loggedInUser");
        dispatch({type: "LOGOUT"})
        dispatchUsers({type: "ALLUSERS", payload: []})
    }
    return {logout};
}
