import { Resolver, Query, Arg, Ctx } from 'type-graphql';
import { Location } from '../schemas';
import { CoordsInput } from './types';

@Resolver()
export class LocationResolver {
  @Query(_returns => Location, { nullable: false })
  async location(
    @Arg('coords') coords: CoordsInput,
    @Ctx('dataSources') { googleMaps }
  ): Promise<Location> {
    const response = await googleMaps.getGeocoding(coords);
    return response;
  }
}
