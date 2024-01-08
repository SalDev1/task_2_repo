import { Button, Flex, Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import FormSelect from "../../components/formComponents/FormSelect";
import { IInterViewSettings } from "../../interface/forms";
import {
  interviewDurationOptions,
  interviewLanguageOptions,
  interviewModeOptions,
} from "./constants";
import { InitialValues, useData } from "./DataProvider";
import { useTabIndex } from "./IndexProvider";

const InterviewDetailsForm: React.FC = () => {
  const {initialValues , setInitialValues} = useData();
   const {index , setIndex} = useTabIndex();

  const {
    errors,
    touched,
    handleSubmit,
    values,
    setFieldTouched,
    setFieldValue,
  } = useFormik<IInterViewSettings>({
    initialValues: {
      interviewMode: initialValues.interviewSettings.interviewMode || "",
      interviewDuration: initialValues.interviewSettings.interviewDuration || "",
      interviewLanguage: initialValues.interviewSettings.interviewLanguage || "",
    },
    validationSchema : Yup.object().shape({
      interviewMode : Yup.string().required("Interview Mode is Required"),
      interviewDuration : Yup.string().required("Interview Duration is Required"), 
      interviewLanguage : Yup.string().required("Interview Langugae is Required"),
    }),
    onSubmit: (values) => {
      alert("Form Filled Sucessfully");
      // setInitialValues({
      //    requisitionDetails: {
      //       gender: "",
      //       noOfOpenings: 0,
      //       requisitionTitle: "",
      //       urgency: "",
      //     },
      //     jobDetails: {
      //       jobDetails: "",
      //       jobLocation: "",
      //       jobTitle:"",
      //     },
      //     interviewSettings: {
      //       interviewDuration: "",
      //       interviewLanguage: "",
      //       interviewMode: "",
      //     },
      // })
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
        jobDetails: initialValues.jobDetails.jobDetails,
        jobLocation: initialValues.jobDetails.jobLocation,
        jobTitle: initialValues.jobDetails.jobTitle,
      },
      interviewSettings: {
        interviewDuration: values?.interviewDuration,
        interviewLanguage: values?.interviewLanguage,
        interviewMode: values?.interviewMode,
      },
    })
  } , [values?.interviewDuration , values?.interviewLanguage , values?.interviewMode]);

  return (
    <Box width="100%" as="form" onSubmit={handleSubmit as any}>
      <Box width="100%">
        <FormSelect
          label="Interview Mode"
          placeholder="Select interview mode"
          name="interviewMode"
          options={interviewModeOptions}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
          value={values?.interviewMode || initialValues?.interviewSettings?.interviewMode}
          error={errors?.interviewMode}
          touched={touched?.interviewMode}
        />
        <FormSelect
          label="Interview Duration"
          placeholder="Select interview duration"
          name="interviewDuration"
          options={interviewDurationOptions}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
          value={values?.interviewDuration || initialValues?.interviewSettings?.interviewDuration}
          error={errors?.interviewDuration}
          touched={touched?.interviewDuration}
        />
        <FormSelect
          label="Job Location"
          name="interviewLanguage"
          placeholder="Select interview language"
          options={interviewLanguageOptions}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
          error={errors?.interviewLanguage}
          touched={touched?.interviewLanguage}
          value={values?.interviewLanguage || initialValues?.interviewSettings?.interviewLanguage}
        />
        <Flex w="100%" justify="flex-end" mt="4rem" gap="20px">
          <Button colorScheme="gray" type="button" onClick = {() => setIndex(1)}>
            Previous
          </Button>
          <Button colorScheme="red" type="submit">
            Submit
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default InterviewDetailsForm;
