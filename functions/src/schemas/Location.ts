import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType({ description: 'The Location model' })
export class Location {
  @Field()
  address: String;

  @Field()
  area: String;

  @Field()
  borough: String;

  @Field()
  county: String;

  @Field()
  postalArea: String;
}
