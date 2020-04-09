import { ObjectType, Field, ID } from 'type-graphql';
import { Min, Max } from 'class-validator';
import { Coords } from './Coords';

@ObjectType({ description: 'The Pub model' })
export class Pub {
  @Field(() => ID)
  id: string;

  @Field()
  name: String;

  @Field(() => Coords)
  coords: Coords;

  @Field()
  address: String;

  @Field({ nullable: true })
  @Min(0)
  @Max(5)
  rating?: number;

  @Min(0)
  @Max(5)
  @Field({ nullable: true })
  priceLevel?: number;

  // directions: Direction;
  // openTimes: [OpenTimes];
  // photos: [Photo];
}
