import { ObjectType, Field, Int, Float } from 'type-graphql';
import { Max, IsOptional } from 'class-validator';

@ObjectType({ description: 'Directions to a Pub' })
export class Direction {
  @Field(type => Int, { nullable: true })
  @IsOptional()
  distance: number;

  @Field(type => Int, { nullable: true })
  @IsOptional()
  duration: number;

  @Field(type => Float, { nullable: true })
  @Max(360)
  @IsOptional()
  bearing: number;
}
