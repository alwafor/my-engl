import { Word } from "./Word";
import {
   Entity,
   Column,
   PrimaryGeneratedColumn,
   ManyToMany,
   JoinTable,
   OneToMany,
   BaseEntity,
} from "typeorm";
import { Field, Int, ObjectType, ID } from "type-graphql";

@ObjectType()
@Entity()
export class Dictionary extends BaseEntity{
   @PrimaryGeneratedColumn()
   @Field(type => ID)
   id: number;

   @Column()
   @Field()
   name: string;

   @Column()
   @Field(type => Int)
   difficulty: number;

   @Column()
   @Field()
   choosed: Boolean;

   @Column()
   @Field(type => Int)
   wordsCount: number;

   @ManyToMany(type => Word, word => word.dictionaries)
   @JoinTable()
   @Field(type => [Word])
   words: Promise<Word[]>;
}
