import React, { createContext, useContext } from "react";

const DepartmentsContext = createContext();

export const DepartmentsContextProvider = ({ children }) => {
    const [ departmentsFilter, setDepartmentsFilter ] = React.useState("");

    return (
		<DepartmentsContext.Provider
			value={{
				departmentsFilter,
				setDepartmentsFilter,
			}}>
			{children}
		</DepartmentsContext.Provider>
	);
};

export const useDepartmentsContext = () => useContext(DepartmentsContext);
