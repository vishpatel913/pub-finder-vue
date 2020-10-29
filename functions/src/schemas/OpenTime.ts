import { ObjectType, Field, Directive, Int } from 'type-graphql';
import { IsNumber, IsNumberString } from 'class-validator';

@Directive('@cacheControl(maxAge: 3600)')
@ObjectType({ description: 'a Day Time object' })
export class DayTime {
  @Field(_type => Int)
  @IsNumber()
  day: number;

  @Field()
  @IsNumberString()
  time: string;
}

@ObjectType({ description: 'A Pub Open Time object with closing' })
export class OpenTime {
  @Field(_type => DayTime, { nullable: true })
  open: DayTime;

  @Field(_type => DayTime, { nullable: true })
  close: DayTime;
}
