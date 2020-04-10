import { ObjectType, Field } from 'type-graphql';

@ObjectType({ description: 'The Location data of coords' })
export class Location {
  @Field()
  address: string;

  @Field({ nullable: true })
  area: string;

  @Field({ nullable: true })
  borough: string;

  @Field({ nullable: true })
  county: string;

  @Field({ nullable: true })
  postalArea: string;
}
