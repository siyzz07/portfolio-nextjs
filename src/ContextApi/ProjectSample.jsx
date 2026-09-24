"use client";

import { createContext, useState } from "react";

// Create a context
export const projectDataContext = createContext();

function ProjectSample({ children }) {
    const [data, setData] = useState({ index: null, popup: false });

    return (
        <projectDataContext.Provider value={{ data, setData }}>
            {children}
        </projectDataContext.Provider>
    );
}

export default ProjectSample;
