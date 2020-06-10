import { ObjectType, Field, Int, Float } from 'type-graphql';
import { Max, IsOptional } from 'class-validator';

@ObjectType({ description: 'Directions to a Pub' })
export class Direction {
  @Field(_type => Int, { nullable: true })
  @IsOptional()
  distance: number;

  @Field(_type => Int, { nullable: true })
  @IsOptional()
  duration: number;

  @Field(_type => Float, { nullable: true })
  @Max(360)
  @IsOptional()
  bearing: number;
}
