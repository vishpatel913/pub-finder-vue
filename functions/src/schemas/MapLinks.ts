import { ObjectType, Field } from 'type-graphql';
import { IsUrl } from 'class-validator';

@ObjectType({ description: 'Google Maps Links relating to a Pub' })
export class MapLinks {
  @Field()
  @IsUrl()
  place: string;

  @Field()
  @IsUrl()
  directions: string;
}
