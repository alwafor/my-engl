import { Field, ObjectType, ID } from "type-graphql";
import {
   Entity,
   Column,
   PrimaryGeneratedColumn,
   ManyToMany,
   JoinTable,
   BaseEntity,
} from "typeorm";
import { Word } from "./Word";

@ObjectType()
@Entity()
export class Translation extends BaseEntity {
   @PrimaryGeneratedColumn()
   @Field(type => ID)
   id: number;

   @Field()
   @Column()
   word: string;

   @ManyToMany(() => Word, word => word.translations)
   words: Promise<Word[]>;
}
