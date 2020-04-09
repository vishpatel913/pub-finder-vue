import { ObjectType, Field } from 'type-graphql';
import { IsLatitude, IsLongitude } from 'c\lass-validator';

@ObjectType({ description: 'The Coords model' })
export class Coords {
  @Field()
  @IsLatitude()
  lat: number;

  @Field()
  @IsLongitude()
  lng: number;
}
