import { useSelector } from 'react-redux';
import { RootState } from '../../../store/root-state.types';

export const useSelectRenderTestName = () => useSelector((state: RootState) => state.renderTest.name);
export const useSelectRenderTestDescription = () => useSelector((state: RootState) => state.renderTest.description);
