import { Button, Flex, Box } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import FormInput from "../../components/formComponents/FormInput";
import FormSelect from "../../components/formComponents/FormSelect";
import { IFormInputProps, IRequisitionDetails } from "../../interface/forms";
import { genderOptions, urgencyOptions } from "./constants";
import { InitialValues, useData } from "./DataProvider";
import asPath from "next/router";
import Link from "next/link";
import { constants } from "perf_hooks";
import { useTabIndex } from "./IndexProvider";

const RequisitionDetailsForm: React.FC = () => {
  const {initialValues , setInitialValues} = useData();
  const {index , setIndex} = useTabIndex();

  const {
    handleChange,
    errors,
    touched,
    handleBlur,
    handleSubmit,
    values,
    setFieldTouched,
    setFieldValue,

  } = useFormik<IRequisitionDetails>({
    initialValues: {
      requisitionTitle: initialValues.requisitionDetails.requisitionTitle || "",
      noOfOpenings: initialValues.requisitionDetails.noOfOpenings || 0,
      urgency: initialValues.requisitionDetails.urgency || "",
      gender: initialValues.requisitionDetails.gender || "",
    },
    validationSchema: Yup.object().shape({
      requisitionTitle: Yup.string().required("Requisition title is required"),
      noOfOpenings: Yup.number()
        .typeError("Enter a valid number")
        .required("Number of openings is required")
        .positive("Enter a valid number")
        .min(1, "Enter a valid number"),
      urgency: Yup.string().required("Urgency is required"),
      gender: Yup.string().required("Gender is required"),
    }),
    onSubmit: (values) => {
      setIndex(1);
    },
  });
  
  useEffect(() => {
     setInitialValues({
      requisitionDetails: {
        gender: values?.gender,
        noOfOpenings: values?.noOfOpenings,
        requisitionTitle: values?.requisitionTitle,
        urgency: values?.urgency,
      },
      jobDetails: {
        jobDetails: initialValues.jobDetails.jobDetails,
        jobLocation: initialValues.jobDetails.jobLocation,
        jobTitle: initialValues.jobDetails.jobTitle,
      },
      interviewSettings: {
        interviewDuration: initialValues.interviewSettings.interviewDuration,
        interviewLanguage: initialValues.interviewSettings.interviewLanguage,
        interviewMode: initialValues.interviewSettings.interviewMode,
      },
    })
  } , [values?.gender , values?.noOfOpenings , values?.requisitionTitle , values?.urgency]);

  // console.log(values?.noOfOpenings);

  return (
       <Box width="100%" as="form" onSubmit={handleSubmit as any}>
          <Box width="100%">
            <FormInput
              label="Requisition Title"
              placeholder="Enter requisition title"
              name="requisitionTitle"
              onChange={handleChange}
              onBlur={handleChange}
              value={values?.requisitionTitle || initialValues?.requisitionDetails?.requisitionTitle}
              error={errors?.requisitionTitle}
              touched={touched?.requisitionTitle}
            />
            <FormInput
              label="Number of openings"
              placeholder="Enter number of openings"
              name="noOfOpenings"
              onChange={handleChange}
              onBlur={handleBlur}
              value={initialValues.requisitionDetails.noOfOpenings == 0 ? values?.noOfOpenings : initialValues.requisitionDetails.noOfOpenings}
              error={errors?.noOfOpenings}
              touched={touched?.noOfOpenings}
            />
            <FormSelect
              label="Gender"
              name="gender"
              placeholder="Select gender"
              options={genderOptions}
              onChange={setFieldValue}
              onBlur={setFieldTouched}
              error={errors?.gender}
              touched={touched?.gender}
              value={values?.gender || initialValues?.requisitionDetails?.gender}
            />
            <FormSelect
              label="Urgency"
              name="urgency"
              placeholder="Select urgency"
              options={urgencyOptions}
              onChange={setFieldValue}
              onBlur={setFieldTouched}
              error={errors?.urgency}
              touched={touched?.urgency}
              value={values?.urgency || initialValues?.requisitionDetails?.urgency}
            />
            <Flex w="100%" justify="flex-end" mt="4rem">
              <Button colorScheme="red" type="submit">
                Next
              </Button>
            </Flex>
          </Box>
        </Box>  
  );
};

export default RequisitionDetailsForm;
