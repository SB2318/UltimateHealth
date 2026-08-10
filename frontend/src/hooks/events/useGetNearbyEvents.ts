import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { NEARBY_EVENTS_API } from '../../lib/api/APIUtils';
import { HealthEvent, NearbyEventsResponse } from '../../schemas/type';

export const useGetNearbyEvents = (
  latitude: number | null,
  longitude: number | null,
  radius: number,
): UseQueryResult<HealthEvent[], AxiosError> => {
  return useQuery({
    queryKey: ['get-nearby-events', latitude, longitude, radius],
    queryFn: async () => {
      const response = await axios.get<NearbyEventsResponse>(NEARBY_EVENTS_API, {
        params: {
          latitude,
          longitude,
          radius,
        },
      });
      return response.data.data;
    },
    enabled: latitude !== null && longitude !== null,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
