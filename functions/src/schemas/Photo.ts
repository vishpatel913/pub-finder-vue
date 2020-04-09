import { ObjectType, Field } from 'type-graphql';
import { IsUrl } from 'class-validator';

@ObjectType({ description: 'A Photo of a Pub' })
export class Photo {
  @Field()
  @IsUrl()
  url: string;

  @Field({ nullable: true })
  attribution?: string;
}
