import { ObjectType, Field, ID, Int, Float } from 'type-graphql';
import { Min, Max, IsOptional, IsUrl } from 'class-validator';
import { Coords, Direction, OpenTime, Photo } from './';

@ObjectType({ description: 'A Pub' })
export class Pub {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => Coords)
  coords: Coords;

  @Field()
  address: string;

  @Field(_type => Float, { nullable: true })
  @Min(0)
  @Max(5)
  @IsOptional()
  rating?: number;

  @Field(_type => Int, { nullable: true })
  @Min(0)
  @Max(5)
  @IsOptional()
  priceLevel?: number;

  @Field(_type => Direction, { nullable: true })
  @IsOptional()
  directions?: Direction;

  @Field(_type => [OpenTime])
  openTimes: OpenTime[];

  @Field(_type => [Photo])
  photos: Photo[] | unknown;

  @Field()
  @IsUrl()
  link: string;
}
