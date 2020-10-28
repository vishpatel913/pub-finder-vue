import { ObjectType, Field } from 'type-graphql';
import { IsOptional } from 'class-validator';
import { Coords } from '.';

@ObjectType({ description: 'Location data for an area' })
export class Location {
  @Field(() => Coords)
  coords: Coords;

  @Field()
  address: string;

  @Field({ nullable: true })
  @IsOptional()
  district: string;

  @Field({ nullable: true })
  @IsOptional()
  city: string;

  @Field({ nullable: true })
  @IsOptional()
  county: string;

  @Field({ nullable: true })
  @IsOptional()
  postalCode: string;
}
