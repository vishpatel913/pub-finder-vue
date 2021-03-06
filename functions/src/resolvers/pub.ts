import {
  Resolver,
  Query,
  Arg,
  Ctx,
  FieldResolver,
  Root,
  Args,
} from 'type-graphql';
import { Pub, Direction, OpenTime, Photo } from '../schemas';
import { CoordsInput, PubFilterArgs } from './types';
import {
  distanceBetweenCoords,
  bearingBetweenCoords,
  timeToWalkDistance,
  filterOpenPeriods,
} from '../utils';
import { DataSources, PhotoResponse } from '../datasources/types';

@Resolver(_of => Pub)
export class PubResolver {
  @Query(_returns => [Pub], { nullable: false })
  async pubs(
    @Arg('coords') coords: CoordsInput,
    @Args() { first, skip }: PubFilterArgs,
    @Ctx('dataSources') { googleMaps }: DataSources
  ): Promise<Pub[]> {
    const results = await googleMaps.getPubsNear(coords);

    return results.slice(skip, first + skip);
  }

  @Query(_returns => Pub, { nullable: false })
  async pub(
    @Arg('id') id: string,
    @Ctx('dataSources') { googleMaps }: DataSources
  ): Promise<Pub> {
    const details = await googleMaps.getPubDetails(id);
    return details;
  }

  @FieldResolver()
  async openTimes(
    @Root() { id, openTimes }: Pub,
    @Ctx('dataSources') { googleMaps }: DataSources,
    @Arg('date', { nullable: true }) date?: string
  ): Promise<OpenTime[]> {
    if (openTimes?.length > 0) {
      return filterOpenPeriods(openTimes, date);
    }
    const details = await googleMaps.getPubDetails(id, { date });

    return details.openTimes;
  }

  @FieldResolver()
  async directions(
    @Root() { coords, id, name }: Pub,
    @Arg('from', { nullable: true }) from?: CoordsInput
  ): Promise<Direction | null> {
    if (!from) return null;
    const encodedName = encodeURIComponent(name);

    const distance = Math.ceil(distanceBetweenCoords(from, coords));
    const bearing = bearingBetweenCoords(from, coords);
    const duration = Math.ceil(timeToWalkDistance(distance));
    const link = `https://www.google.com/maps/dir/?api=1&origin=${from.lat},${from.lng}&destination=${encodedName}&destination_place_id=${id}&travelmode=walking`;

    return { distance, bearing, duration, link };
  }

  @FieldResolver()
  async photos(
    @Root() { photos }: { photos: PhotoResponse[] },
    @Ctx('dataSources') { googleMaps }: DataSources,
    @Arg('size', { nullable: true }) size?: number
  ): Promise<Photo[]> {
    const images = await Promise.all(
      photos.map(item =>
        googleMaps.getPhotoData(
          item.photo_reference,
          item.html_attributions,
          size
        )
      )
    );

    return images;
  }
}
