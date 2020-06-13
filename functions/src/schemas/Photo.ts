import { ObjectType, Field, Directive } from 'type-graphql';
import { IsUrl, IsOptional } from 'class-validator';

@Directive('@cacheControl(maxAge: 3600)')
@ObjectType({ description: 'A Photo of a Pub' })
export class Photo {
  @Field()
  @IsUrl()
  url: string;

  @Field({ nullable: true })
  @IsOptional()
  attribution?: string;
}

export interface PhotoResponse {
  photo_reference: string;
  html_attribution: string[];
}
