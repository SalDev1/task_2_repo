import React, { createContext, useContext, useState } from "react";

// Create InitialValues
export type InitialValues = {
  requisitionDetails: {
    gender?: string,
    noOfOpenings?: number,
    requisitionTitle?: string,
    urgency?: string,
  },
  jobDetails: {
    jobDetails?: string,
    jobLocation?: string,
    jobTitle?:string,
  },
  interviewSettings: {
    interviewDuration?: string,
    interviewLanguage?: string,
    interviewMode?: string,
  },
};

// Creating interface
export interface InitialContextInterface {
  initialValues : InitialValues,
  setInitialValues : React.Dispatch<React.SetStateAction<InitialValues>>,
}

// Setting a default state.
const defaultState = {
   initialValues : {
      requisitionDetails: {
        gender: "",
        noOfOpenings: 0,
        requisitionTitle: "",
        urgency: "",
      },
      jobDetails: {
        jobDetails: "",
        jobLocation: "",
        jobTitle:"",
      },
      interviewSettings: {
        interviewDuration: "",
        interviewLanguage: "",
        interviewMode: "",
      },
      prevState : null,
   },
   setInitialValues : (initialValues : InitialValues) => {}
} as InitialContextInterface

// Creating DataContext
export const DataContext = createContext<InitialContextInterface>(defaultState);

const DataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [initialValues, setInitialValues] = useState<InitialValues>({
     requisitionDetails: {
        gender: "",
        noOfOpenings: 0,
        requisitionTitle: "",
        urgency: "",
      },
      jobDetails: {
        jobDetails: "",
        jobLocation: "",
        jobTitle:"",
      },
      interviewSettings: {
        interviewDuration: "",
        interviewLanguage: "",
        interviewMode: "",
      },
  });

  return (
    <DataContext.Provider value={{ initialValues, setInitialValues }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};

export default DataProvider;
