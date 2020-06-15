import {
  Resolver,
  Query,
  Arg,
  Ctx,
  FieldResolver,
  Root,
  Info,
  Args,
} from 'type-graphql';
import { Pub, Direction, OpenTime, Photo, PhotoResponse } from '../schemas';
import { CoordsInput, PubFilterArgs } from './types';
import {
  distanceBetweenCoords,
  bearingBetweenCoords,
  timeToWalkDistance,
} from '../utils';

@Resolver(_of => Pub)
export class PubResolver {
  @Query(_returns => [Pub], { nullable: false })
  async pubs(
    @Arg('coords') coords: CoordsInput,
    @Args() { first, skip }: PubFilterArgs,
    @Ctx('dataSources') { googleMaps }
  ): Promise<Pub[]> {
    const results = await googleMaps.getPubsNear(coords);

    return results.slice(skip, first + skip);
  }

  @Query(_returns => Pub, { nullable: false })
  async pub(
    @Arg('id') id: string,
    @Ctx('dataSources') { googleMaps }
  ): Promise<Pub> {
    const details = await googleMaps.getPubDetails(id);
    return details;
  }

  @FieldResolver()
  async openTimes(
    @Root() { id }: Pub,
    @Ctx('dataSources') { googleMaps },
    @Arg('date', { nullable: true }) date?: string
  ): Promise<OpenTime[]> {
    const details = await googleMaps.getPubDetails(id, {
      date,
    });
    return details.openTimes;
  }

  @FieldResolver()
  async directions(
    @Root() { coords }: Pub,
    @Info() { variableValues },
    @Arg('from', { nullable: true }) from?: CoordsInput
  ): Promise<Direction | null> {
    let directions: Direction | null;
    const start = (from || variableValues.coords) ?? null;

    try {
      const distance = Math.ceil(distanceBetweenCoords(start, coords));
      const bearing = bearingBetweenCoords(start, coords);
      const duration = Math.ceil(timeToWalkDistance(distance));
      directions = { distance, bearing, duration };
    } catch {
      directions = null;
    }

    return directions;
  }

  @FieldResolver()
  async photos(
    @Root() { photos }: { photos: PhotoResponse[] },
    @Ctx('dataSources') { googleMaps },
    @Arg('size', { nullable: true }) size?: number
  ): Promise<Photo[]> {
    const images = photos.map(item =>
      googleMaps.getPhotoData(item.photo_reference, item.html_attribution, size)
    );
    return images;
  }
}
