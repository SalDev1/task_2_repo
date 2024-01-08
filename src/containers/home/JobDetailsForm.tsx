import { Button, Flex, Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import FormInput from "../../components/formComponents/FormInput";
import { IJobDetails } from "../../interface/forms";
import { InitialValues, useData } from "./DataProvider";
import { useTabIndex } from "./IndexProvider";

const JobDetailsForm: React.FC = () => {
  const {initialValues , setInitialValues} = useData();
  const {index , setIndex} = useTabIndex();

  const { 
    handleChange, 
    errors, 
    touched, 
    handleBlur, 
    handleSubmit, 
    values,
  } =
    useFormik<IJobDetails>({
      initialValues: {
        jobTitle: initialValues.jobDetails.jobTitle || "",
        jobDetails: initialValues.jobDetails.jobDetails || "",
        jobLocation: initialValues.jobDetails.jobLocation || "",
      },
      validationSchema: Yup.object().shape({
        jobTitle: Yup.string().required("Job Title is required"),
        jobDetails: Yup.string().required("Job Details is required"),
        jobLocation: Yup.string().required("Job Location is required"),
      }),
      onSubmit: (values) => {
        console.log(values);
        // Go to next step
        setIndex(2);
      },
    });

   useEffect(() => {
     setInitialValues({
      requisitionDetails: {
        gender: initialValues.requisitionDetails.gender,
        noOfOpenings: initialValues.requisitionDetails.noOfOpenings,
        requisitionTitle: initialValues.requisitionDetails.requisitionTitle,
        urgency: initialValues.requisitionDetails.urgency,
      },
      jobDetails: {
        jobDetails: values?.jobDetails,
        jobLocation: values?.jobLocation,
        jobTitle: values?.jobTitle,
      },
      interviewSettings: {
        interviewDuration: initialValues.interviewSettings.interviewDuration,
        interviewLanguage: initialValues.interviewSettings.interviewLanguage,
        interviewMode: initialValues.interviewSettings.interviewMode,
      },
    })
  } , [values?.jobTitle , values?.jobDetails , values?.jobLocation])

  return (
    <Box width="100%" as="form" onSubmit={handleSubmit as any}>
      <Box width="100%">
        <FormInput
          label="Job Title"
          placeholder="Enter job title"
          name="jobTitle"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values?.jobTitle || initialValues?.jobDetails?.jobTitle}
          error={errors?.jobTitle}
          touched={touched?.jobTitle}
        />
        <FormInput
          label="Job Details"
          placeholder="Enter job details"
          name="jobDetails"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values?.jobDetails || initialValues?.jobDetails?.jobDetails}
          error={errors?.jobDetails}
          touched={touched?.jobDetails}
        />
        <FormInput
          label="Job Location"
          name="jobLocation"
          placeholder="Enter job location"
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors?.jobLocation}
          touched={touched?.jobLocation}
          value={values?.jobLocation || initialValues?.jobDetails?.jobLocation}
        />
        <Flex w="100%" justify="flex-end" mt="4rem" gap="20px">
          <Button colorScheme="gray" type="button" onClick={() => setIndex(0)}>
            Previous
          </Button>
          <Button colorScheme="red" type="submit">
            Next
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default JobDetailsForm;
