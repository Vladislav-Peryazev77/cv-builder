import { observer } from "mobx-react-lite";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  Textarea,
  position,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import WorkExpFormStore from "../../../../stores/WorkExpFormStore";

export interface WordExpForm {
  position: string;
  company: string;
  workLocation: string;
  workStartDate: string;
  workEndDate: string;
  description: string;
}

const schema = yup.object({
  position: yup.string().required("Position is required"),
  company: yup.string().required("Company is required"),
  workLocation: yup
    .string()
    .required("Location is required")
    .matches(
      /^[\w\s]+,\s[\w\s]+$/,
      "Enter your location in format - City, Country"
    ),
  workStartDate: yup
    .string()
    .required("Start Date is required")
    .matches(
      /^\d{2}\/\d{2}\/\d{4}$/,
      "Enter the start date in format - dd//mm//yyyy"
    ),
  workEndDate: yup
    .string()
    .required("End Date is required")
    .matches(
      /^\d{2}\/\d{2}\/\d{4}$/,
      "Enter the end date in format - dd//mm//yyyy"
    ),
  description: yup
    .string()
    .required("Grade is required")
    .max(700, "No more than 700 letter"),
});

export const WordExpForm = observer(() => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WordExpForm>({ resolver: yupResolver(schema) });

  const { handleWorkExpFormValuesSubmit } = WorkExpFormStore;

  const onSubmit: SubmitHandler<WordExpForm> = (values) => {
    handleWorkExpFormValuesSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl
        maxWidth="400px"
        border="0.2px solid #d3d3d3"
        borderRadius="15px"
        padding="15px"
      >
        <Heading marginBottom="15px">Work Experience</Heading>
        <Box
          display="flex"
          flexDirection="column"
          gap="10px"
          marginBottom="15px"
        >
          <FormLabel>
            Position
            <Input {...register("position")} placeholder="React Developer" />
            <Text color="red">{errors.position?.message}</Text>
          </FormLabel>
          <FormLabel>
            School
            <Input
              {...register("company")}
              placeholder="The Odin Project Foundation"
            />
            <Text color="red">{errors.company?.message}</Text>
          </FormLabel>
          <FormLabel>
            Location
            <Input {...register("workLocation")} placeholder="City, Country" />
            <Text color="red">{errors.workLocation?.message}</Text>
          </FormLabel>
          <FormLabel>
            Start Date
            <Input {...register("workStartDate")} placeholder="dd/mm/yy" />
            <Text color="red">{errors.workStartDate?.message}</Text>
          </FormLabel>
          <FormLabel>
            End Date
            <Input {...register("workEndDate")} placeholder="dd/mm/yy" />
            <Text color="red">{errors.workEndDate?.message}</Text>
          </FormLabel>
          <FormLabel>
            Description
            <Textarea
              {...register("description")}
              placeholder="Implement x feature..."
              maxLength={700}
            />
            <Text color="red">{errors.description?.message}</Text>
          </FormLabel>
        </Box>
        <Button type="submit">Save</Button>
      </FormControl>
    </form>
  );
});
