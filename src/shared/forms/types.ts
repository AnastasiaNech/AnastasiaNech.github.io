import { type InputRef } from 'antd';
import { type FormikContextType } from 'formik';
import { MutableRefObject } from 'react';

export interface FormProps<Values = unknown> {
  className?: string;
  disabled?: boolean;
  formManager?: FormikContextType<Values>;
  formElement?: MutableRefObject<HTMLFormElement>;
  autoFocusElement?: MutableRefObject<InputRef>;
  isUpdate?: boolean;
}
