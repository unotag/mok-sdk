import { createContext } from 'react';
import { IMok } from '../../../browser/src/interfaces/mok.interface';

export const MokObjectContext = createContext<IMok | undefined>(undefined);