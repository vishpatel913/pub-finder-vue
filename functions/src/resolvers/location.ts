import { Resolver, Query, Arg, Ctx } from 'type-graphql';
import { Location } from '../schemas';
import { CoordsInput } from './types';
import { DataSources } from '../datasources/types';

@Resolver()
export class LocationResolver {
  @Query(_returns => Location, { nullable: false })
  async location(
    @Arg('coords') coords: CoordsInput,
    @Ctx('dataSources') { here }: DataSources
  ): Promise<Location> {
    const response = await here.getGeocoding(coords);
    return response;
  }

  @Query(_returns => [Location], { nullable: false })
  async searchLocation(
    @Arg('query') query: string,
    @Ctx('dataSources') { here }: DataSources
  ): Promise<Location[]> {
    const response = await here.getSearchResults(query);
    return response;
  }
}
