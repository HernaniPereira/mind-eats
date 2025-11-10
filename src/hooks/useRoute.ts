import { RouteProp, useRoute } from '@react-navigation/native';
import type { RootStackParamList } from '../../App';

export function useAppRoute<T extends keyof RootStackParamList>() {
  return useRoute<RouteProp<RootStackParamList, T>>();
}
