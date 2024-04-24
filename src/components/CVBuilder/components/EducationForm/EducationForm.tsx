import { observer } from "mobx-react-lite";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import EducationFromStore from "../../../../stores/EducationFormStore";

export interface EducationForm {
  degree: string;
  school: string;
  educationLocation: string;
  educationStartDate: string;
  educationEndDate: string;
  grade: string;
}

const schema = yup.object({
  degree: yup.string().required("Degree is required"),
  school: yup.string().required("School is required"),
  educationLocation: yup
    .string()
    .required("Location is required")
    .matches(
      /^[\w\s]+,\s[\w\s]+$/,
      "Enter your location in format - City, Country"
    ),
  educationStartDate: yup
    .string()
    .required("Start Date is required")
    .matches(
      /^\d{2}\/\d{2}\/\d{4}$/,
      "Enter the start date in format - dd//mm//yyyy"
    ),
  educationEndDate: yup
    .string()
    .required("End Date is required")
    .matches(
      /^\d{2}\/\d{2}\/\d{4}$/,
      "Enter the end date in format - dd//mm//yyyy"
    ),
  grade: yup.string().required("Grade is required"),
});

export const EducationForm = observer(() => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EducationForm>({
    resolver: yupResolver(schema),
  });

  const { handleEducationFormValuesSubmit } = EducationFromStore;

  const onSubmit: SubmitHandler<EducationForm> = (values) => {
    handleEducationFormValuesSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl
        maxWidth="400px"
        border="0.2px solid #d3d3d3"
        borderRadius="15px"
        padding="15px"
      >
        <Heading marginBottom="15px">Education</Heading>
        <Box
          display="flex"
          flexDirection="column"
          gap="10px"
          marginBottom="15px"
        >
          <FormLabel>
            Degree Name
            <Input {...register("degree")} placeholder="Bachelor of..." />
            <Text color="red">{errors.degree?.message}</Text>
          </FormLabel>
          <FormLabel>
            School
            <Input {...register("school")} placeholder="University of..." />
            <Text color="red">{errors.school?.message}</Text>
          </FormLabel>
          <FormLabel>
            Location
            <Input
              {...register("educationLocation")}
              placeholder="Bachelor of..."
            />
            <Text color="red">{errors.educationLocation?.message}</Text>
          </FormLabel>
          <FormLabel>
            Start Date
            <Input {...register("educationStartDate")} placeholder="dd/mm/yy" />
            <Text color="red">{errors.educationStartDate?.message}</Text>
          </FormLabel>
          <FormLabel>
            End Date
            <Input {...register("educationEndDate")} placeholder="dd/mm/yy" />
            <Text color="red">{errors.educationEndDate?.message}</Text>
          </FormLabel>
          <FormLabel>
            Grade
            <Input {...register("grade")} placeholder="17.6" />
            <Text color="red">{errors.grade?.message}</Text>
          </FormLabel>
        </Box>
        <Button type="submit">Save</Button>
      </FormControl>
    </form>
  );
});
