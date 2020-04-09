import { Resolver, Arg, Query } from 'type-graphql';
import { Pub } from '../schemas/Pub';
import { CoordsInput } from './types/coords-input';

@Resolver()
export class PubResolver {
  @Query(_returns => Pub, { nullable: false })
  pubs(@Arg('coords') coords: CoordsInput): [Pub] {
    return [
      {
        id: '1',
        name: 'The Merchant',
        coords: { lat: 1.5, lng: -0.6 },
        address: 'Battersea Rise',
        rating: undefined,
        priceLevel: undefined,
        directions: undefined,
        openTimes: [
          {
            open: {
              day: '1',
              time: '1',
            },
            close: {
              day: '1',
              time: '1',
            },
          },
        ],
        photos: [{ url: 'https://test.com', attribution: undefined }],
      },
    ];
  }
}
