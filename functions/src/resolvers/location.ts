import { Resolver, Arg, Query } from 'type-graphql';
import { Location } from '../schemas/Location';
import { CoordsInput } from './types/coords-input';

@Resolver()
export class LocationResolver {
  @Query(_returns => Location, { nullable: false })
  location(@Arg('coords') coords: CoordsInput): Location {
    return {
      address: '62, Sisters Ave',
      area: 'Battersea',
      borough: 'Wandsworth',
      county: 'London',
      postalArea: 'London, SW11',
    };
  }
}
