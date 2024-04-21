import { makeAutoObservable } from "mobx";

interface WorkExpFormValues {
  position: string;
  company: string;
  workLocation: string;
  workStartDate: string;
  workEndDate: string;
  description: string;
}

class WorkExpFormStore {
  workExpFormValues = {
    position: "",
    company: "",
    workLocation: "",
    workStartDate: "",
    workEndDate: "",
    description: "",
  };

  constructor() {
    makeAutoObservable(this);
  }

  handleWorkExpFormValuesSubmit = (values: WorkExpFormValues) => {
    this.workExpFormValues = values;
  };
}

export default new WorkExpFormStore();
