import { ObjectType, Field, ID } from 'type-graphql';
import { IsLatitude, IsLongitude } from 'class-validator';

@ObjectType({ description: 'The Coords model' })
export class Coords {
  @Field()
  @IsLatitude()
  lat: number;

  @Field()
  @IsLongitude()
  lng: number;
}
