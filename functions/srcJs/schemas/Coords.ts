import { ObjectType, Field, Float } from 'type-graphql';
import { __Type } from 'graphql';

@ObjectType({ description: 'The Coords model' })
export class Coords {
  @Field((_type) => Float)
  lat: number;

  @Field((_type) => Float)
  lng: number;
}

export const LocationModel = Location;
