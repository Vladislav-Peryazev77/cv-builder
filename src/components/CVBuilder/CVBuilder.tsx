import { observer } from "mobx-react-lite";
import { Box } from "@chakra-ui/react";
import PersInfoFormStore from "../../stores/PersInfoFormStore";

import { PersInfoForm } from "./components/PersInfoForm";
import { CVInfoCard } from "./components/CVInfoCard";
import { EducationForm } from "./components/EducationForm";
import { WordExpForm } from "./components/WorkExpForm";
import EducationFormStore from "../../stores/EducationFormStore";
import WorkExpFormStore from "../../stores/WorkExpFormStore";

export const CVBuilder = observer(() => {
  const { persInfoFormValues } = PersInfoFormStore;
  const { educationFormValues } = EducationFormStore;
  const { workExpFormValues } = WorkExpFormStore;

  return (
    <Box padding="30px" display="flex" gap="50px">
      <Box display="flex" gap="50px" flexDirection="column">
        <PersInfoForm />
        <EducationForm />
        <WordExpForm />
      </Box>
      <CVInfoCard
        persInfoValues={persInfoFormValues}
        educationValues={educationFormValues}
        workExpValues={workExpFormValues}
      />
    </Box>
  );
});
