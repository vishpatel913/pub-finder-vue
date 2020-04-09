import { ObjectType, Field, ID, Int, Float } from 'type-graphql';
import { Min, Max, IsOptional } from 'class-validator';
import { Coords } from './Coords';
import { Direction } from './Direction';
import { OpenTime } from './OpenTime';
import { Photo } from './Photo';

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

  @Field(type => Float, { nullable: true })
  @Min(0)
  @Max(5)
  @IsOptional()
  rating?: number;

  @Field(type => Int, { nullable: true })
  @Min(0)
  @Max(5)
  @IsOptional()
  priceLevel?: number;

  @Field(type => Direction, { nullable: true })
  @IsOptional()
  directions?: Direction;

  @Field(type => [OpenTime])
  openTimes: OpenTime[];

  @Field(type => [Photo])
  photos: Photo[];
}
