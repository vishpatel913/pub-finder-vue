import { ArgsType, Field, Int } from 'type-graphql';
import { Min, Max } from 'class-validator';

@ArgsType()
export class PubArgs {
  @Field(type => Int, { nullable: true })
  skip?: number;

  @Field(type => Int, { nullable: true })
  @Min(1)
  @Max(20)
  first = 20;
}
