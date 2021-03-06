import React, { createContext, useContext, useEffect, useReducer } from "react";
import PropTypes from 'prop-types';
import { AuthReducer } from "../reducers/auth/auth.reducer";

export const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = props => {
	const localAuth = sessionStorage.getItem("auth");
	const authState = localAuth
		? JSON.parse(localAuth)
		: { user: null };
	const [ auth, dispatch ] = useReducer(AuthReducer, authState);

	useEffect(() => {
		sessionStorage.setItem("auth", JSON.stringify(auth));
	}, [ auth ]);

	return (
		<AuthContext.Provider value={{ ...auth, authDispatch: dispatch }}>
			{props.children}
		</AuthContext.Provider>
	);
};

AuthContextProvider.propTypes = {
    children: PropTypes.node.isRequired
}
