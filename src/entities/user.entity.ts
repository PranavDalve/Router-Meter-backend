// src/entities/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { IsEmail } from 'class-validator';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  @IsEmail()
  email!: string;

  @Column({ nullable: false })           // ← this is crucial
  passwordHash!: string;                  // ← no | undefined here

  @CreateDateColumn()
  createdAt!: Date;
}

export type SafeUser = Omit<User, 'passwordHash'>;