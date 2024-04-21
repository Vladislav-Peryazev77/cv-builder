import { makeAutoObservable } from "mobx";

interface EducationFormValues {
  degree: string;
  school: string;
  educationLocation: string;
  educationStartDate: string;
  educationEndDate: string;
  grade: string;
}

class EducationFormStore {
  educationFormValues = {
    degree: "",
    school: "",
    educationLocation: "",
    educationStartDate: "",
    educationEndDate: "",
    grade: "",
  };

  constructor() {
    makeAutoObservable(this);
  }

  handleEducationFormValuesSubmit = (values: EducationFormValues) => {
    this.educationFormValues = values;
  };
}

export default new EducationFormStore();
