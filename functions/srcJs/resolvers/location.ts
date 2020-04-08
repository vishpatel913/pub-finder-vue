import { Resolver, Arg, Query } from 'type-graphql';
import { Location } from '../schemas/Location';
import { CoordsInput } from './types/coords-input';

import { mocks } from '../mocks';

@Resolver()
export class LocationResolver {
  @Query((_returns) => Location, { nullable: false })
  async createCategory(@Arg('coords') coords: CoordsInput): Promise<Location> {
    return {
      address: '30C Eckstein Rd, London SW11 1QF, UK',
      area: 'Battersea',
      borough: 'London Borough of Wandsworth',
      county: 'Greater London',
      postalArea: 'London SW11, UK',
    };
  }
}
