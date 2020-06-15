import { ArgsType, Field, Int } from 'type-graphql';
import { Min, Max } from 'class-validator';

@ArgsType()
export class PubFilterArgs {
  @Field(_type => Int, { nullable: true })
  @Min(0)
  @Max(19)
  skip = 0;

  @Field(_type => Int, { nullable: true })
  @Min(1)
  @Max(20)
  first = 10;
}
