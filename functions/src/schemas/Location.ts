import { ObjectType, Field } from 'type-graphql';
import { IsOptional } from 'class-validator';

@ObjectType({ description: 'The Location data of coords' })
export class Location {
  @Field()
  address: string;

  @Field({ nullable: true })
  @IsOptional()
  area: string;

  @Field({ nullable: true })
  @IsOptional()
  borough: string;

  @Field({ nullable: true })
  @IsOptional()
  county: string;

  @Field({ nullable: true })
  @IsOptional()
  postalArea: string;
}
