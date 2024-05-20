import { useContext } from 'react';
import { OperationContext, OperationContextProps } from '../providers/OperationProvider';

export const useOperation: () => OperationContextProps = () => useContext(OperationContext);
