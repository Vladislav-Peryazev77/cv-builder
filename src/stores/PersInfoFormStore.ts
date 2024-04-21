import { makeAutoObservable } from "mobx";

interface PersInfoFormValues {
  name: string;
  email: string;
  phoneNumber: string | null;
  location: string;
}

class PersInfoFormStore {
  persInfoFormValues: PersInfoFormValues = {
    name: "",
    email: "",
    phoneNumber: null,
    location: "",
  };

  constructor() {
    makeAutoObservable(this);
  }

  handlePersInfoFormValueSumbit = (values: PersInfoFormValues) => {
    this.persInfoFormValues = values;
  };
}

export default new PersInfoFormStore();
