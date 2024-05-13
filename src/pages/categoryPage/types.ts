import { FormProps } from "src/shared/forms/types";

export type CategoryFormValues = {
    name: string;
};

export type CategoryFormErrors = Record<keyof CategoryFormValues, string>;
export type CategoryFormTouched = Record<keyof CategoryFormValues, boolean>;

export type CategoryFormProps = FormProps<CategoryFormValues>;