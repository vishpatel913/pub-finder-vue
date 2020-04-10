import { InputType, Field } from 'type-graphql';
import { IsLatitude, IsLongitude } from 'class-validator';
import { Coords } from '../../schemas';

@InputType()
export class CoordsInput implements Partial<Coords> {
  @Field()
  @IsLatitude()
  lat: number;

  @Field()
  @IsLongitude()
  lng: number;
}
