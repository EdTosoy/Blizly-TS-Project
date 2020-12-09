import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@ObjectType()
@Entity()
export class CartList extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;
  @Field()
  @Column()
  url: string;

  @Field()
  @Column()
  price: string;

  @Field()
  @Column()
  username: string;

  @ManyToOne(() => User, (user: User) => user.cartList)
  @JoinColumn({ name: "user_id" })
  user: User;
}
