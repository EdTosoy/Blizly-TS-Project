import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { CartList } from "./CartList";
@ObjectType()
@Entity({ name: "users" })
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  username: string;

  @Field()
  @Column()
  password: string;

  @OneToMany(() => CartList, (cartList: CartList) => cartList.user, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  cartList: CartList[];
}
