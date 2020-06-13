import { ObjectType, Field, Directive } from 'type-graphql';
import { IsNumberString } from 'class-validator';

@Directive('@cacheControl(maxAge: 3600)')
@ObjectType({ description: 'a Day Time object' })
export class DayTime {
  @Field()
  @IsNumberString()
  day: string;

  @Field()
  @IsNumberString()
  time: string;
}

@ObjectType({ description: 'A Pub Open Time object with closing' })
export class OpenTime {
  @Field(_type => DayTime)
  open: DayTime;

  @Field(_type => DayTime)
  close: DayTime;
}
