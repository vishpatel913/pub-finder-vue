import { ObjectType, Field, Directive } from 'type-graphql';
import { IsUrl, IsOptional } from 'class-validator';

@Directive('@cacheControl(maxAge: 3600)')
@ObjectType({ description: 'A Photo of a Pub' })
export class Photo {
  @Field({ nullable: true })
  @IsUrl()
  @IsOptional()
  url?: string;

  @Field({ nullable: true })
  @IsOptional()
  attribution?: string;
}
