import { Box, Heading } from "@chakra-ui/react";

interface PersInfoValues {
  name: string;
  email: string;
  phoneNumber: string | null;
  location: string;
}

interface EducationFormValues {
  degree: string;
  school: string;
  educationLocation: string;
  educationStartDate: string;
  educationEndDate: string;
  grade: string;
}

interface WorkExpValues {
  position: string;
  company: string;
  workLocation: string;
  workStartDate: string;
  workEndDate: string;
  description: string;
}

interface CVInfoCardProps {
  persInfoValues: PersInfoValues;
  educationValues: EducationFormValues;
  workExpValues: WorkExpValues;
}

export const CVInfoCard = ({
  persInfoValues,
  educationValues,
  workExpValues,
}: CVInfoCardProps) => {
  const { name, email, phoneNumber, location } = persInfoValues;
  const {
    degree,
    school,
    educationLocation,
    educationStartDate,
    educationEndDate,
    grade,
  } = educationValues;
  const {
    position,
    company,
    workLocation,
    workStartDate,
    workEndDate,
    description,
  } = workExpValues;
  return (
    <Box
      width="100%"
      maxWidth="1000px"
      height="max-content"
      boxShadow="0px 5px 10px 1px rgba(0,0,0,0.48)"
    >
      <Box padding="30px" backgroundColor="#d3d3d3">
        <Heading textAlign="center" fontSize="35px" marginBottom="20px">
          {name}
        </Heading>
        <Box display="flex" justifyContent="space-around" width="100%">
          <div>{email}</div>
          <div>{phoneNumber}</div>
          <div>{location}</div>
        </Box>
      </Box>
      <Box padding="30px">
        <Heading
          fontSize="25px"
          borderBottom="1px solid black"
          marginBottom="15px"
        >
          Education
        </Heading>
        <div>
          {degree}
          {degree && ", "}
          {school}
        </div>
        <div>{educationLocation}</div>
        <div>
          {educationStartDate}
          {educationStartDate && " - "}
          {educationEndDate}
        </div>
        <div>{grade}</div>
      </Box>
      <Box padding="30px">
        <Heading
          fontSize="25px"
          borderBottom="1px solid black"
          marginBottom="15px"
        >
          Work Experience
        </Heading>
        <div>
          {position}
          {position && ", "}
          {company}
        </div>
        <div>{workLocation}</div>
        <div>
          {workStartDate}
          {workStartDate && " - "}
          {workEndDate}
        </div>
        <div>{description}</div>
      </Box>
    </Box>
  );
};
