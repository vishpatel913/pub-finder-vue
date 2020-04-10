import { ObjectType, Field, Int, Float } from 'type-graphql';

@ObjectType({ description: 'Directions to a Pub' })
export class Direction {
  @Field(type => Int, { nullable: true })
  distance: number;

  @Field(type => Int, { nullable: true })
  duration: number;

  @Field(type => Float, { nullable: true })
  bearing: number;
}
