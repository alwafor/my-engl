import { Dictionary } from './Dictionary';
import { Translation } from './Translation';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne, BaseEntity } from "typeorm";
import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
@Entity()
export class Word extends BaseEntity {
   @PrimaryGeneratedColumn()
   @Field(type => ID)
   id: number;

   @Column()
   @Field()
   word: string;

   // @Column()
   // translations: string

   @ManyToMany(() => Translation)
   @JoinTable()
   @Field(type => [Translation])
   translations: Translation[];
}
