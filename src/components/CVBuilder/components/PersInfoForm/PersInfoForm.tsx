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
import PersInfoFormStore from "../../../../stores/PersInfoFormStore";

export interface PersInfoForm {
  name: string;
  email: string;
  phoneNumber: string;
  location: string;
}

const schema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "No less than 2 characters")
    .max(25, "No more that 25 characters")
    .matches(
      /^[A-Z][a-z]* [A-Z][a-z]*$/,
      "Enter your full name using only Latin letters"
    ),
  email: yup
    .string()
    .required("Email is required")
    .matches(
      /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
      "Enter your email in the format - ivan@mail.com"
    ),
  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .matches(
      /^(7|8)9\d{9}$/,
      "Enter your phone number in format - 88005553535 or 79537885679"
    ),
  location: yup
    .string()
    .required("Location is required")
    .matches(
      /^[\w\s]+,\s[\w\s]+$/,
      "Enter your location in format - City, Country"
    ),
});

export const PersInfoForm = observer(() => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersInfoForm>({
    resolver: yupResolver(schema),
  });

  const { handlePersInfoFormValueSumbit } = PersInfoFormStore;

  const onSubmit: SubmitHandler<PersInfoForm> = (values) => {
    handlePersInfoFormValueSumbit(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl
        maxWidth="400px"
        border="0.2px solid #d3d3d3"
        borderRadius="15px"
        padding="15px"
      >
        <Heading marginBottom="15px">Personal Information</Heading>
        <Box
          display="flex"
          flexDirection="column"
          gap="10px"
          marginBottom="15px"
        >
          <FormLabel>
            Full Name
            <Input {...register("name")} placeholder="Full Name" />
            <Text color="red">{errors.name?.message}</Text>
          </FormLabel>
          <FormLabel>
            Email
            <Input {...register("email")} placeholder="Email" />
            <Text color="red">{errors.email?.message}</Text>
          </FormLabel>
          <FormLabel>
            Phone number
            <Input {...register("phoneNumber")} placeholder="Phone number" />
            <Text color="red">{errors.phoneNumber?.message}</Text>
          </FormLabel>
          <FormLabel>
            Location
            <Input {...register("location")} placeholder="City, Country" />
            <Text color="red">{errors.location?.message}</Text>
          </FormLabel>
        </Box>
        <Button type="submit">Save</Button>
      </FormControl>
    </form>
  );
});
