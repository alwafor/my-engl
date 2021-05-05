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

   @ManyToMany(() => Translation)
   @JoinTable()
   @Field(type => [Translation])
   translations: Promise<Translation[]>;

   @ManyToMany(type => Dictionary, dictionary => dictionary.words)
   @Field(type => [Word])
   dictionaries: Promise<Dictionary[]>;
}
