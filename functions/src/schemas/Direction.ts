import { ObjectType, Field, Int, Float } from 'type-graphql';

@ObjectType({ description: 'Directions to a Pub' })
export class Direction {
  @Field(type => Int)
  distance: number;

  @Field(type => Int)
  duration: number;

  @Field(type => Float)
  bearing: number;
}
