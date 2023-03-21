import { API_URL } from '../../../../src/config';
import { logOut } from "../../../redux/usersRedux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const Logout = () => {
    
    const dispatch = useDispatch();

    useEffect(() => {
    const options = {
        method: 'DELETE',
    };

    fetch(`${API_URL}/logout`, options)
        .then(res => {
            dispatch(logOut());
        })
    }, [dispatch]);
    return null;
};

export default Logout;