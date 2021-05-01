import { Field, ObjectType, ID } from "type-graphql";
import {
   Entity,
   Column,
   PrimaryGeneratedColumn,
   ManyToMany,
   JoinTable,
   BaseEntity,
} from "typeorm";

@ObjectType()
@Entity()
export class Translation extends BaseEntity {
   @PrimaryGeneratedColumn()
   @Field(type => ID)
   id: number;

   @Field()
   @Column()
   word: string;
}
