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
import { useMask } from "@react-input/mask";

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
  phoneNumber: yup.string().required("Phone number is required"),
  location: yup
    .string()
    .required("Location is required")
    .matches(
      /^[\w\s]+,\s[\w\s]+$/,
      "Enter your location in format - City, Country"
    ),
});

export const PersInfoForm = observer(() => {
  const { handlePersInfoFormValueSumbit } = PersInfoFormStore;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<PersInfoForm>({
    resolver: yupResolver(schema),
  });

  const inputPhoneNumberRef = useMask({
    mask: "+7 (___) ___-__-__",
    replacement: { _: /\d/ },
    showMask: true,
  });

  const onSubmit: SubmitHandler<PersInfoForm> = (values) => {
    const phoneNumber = values.phoneNumber.replace(/[\s()-]/g, "");
    handlePersInfoFormValueSumbit({ ...values, phoneNumber });
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue("phoneNumber", e.target.value);
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
            <Input
              {...register("phoneNumber")}
              placeholder="Phone number"
              onChange={handlePhoneNumberChange}
              ref={inputPhoneNumberRef}
            />
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
