import { ObjectType, Field } from 'type-graphql';

@ObjectType({ description: 'The Location data of coords' })
export class Location {
  @Field()
  address: string;

  @Field()
  area: string;

  @Field()
  borough: string;

  @Field()
  county: string;

  @Field()
  postalArea: string;
}
