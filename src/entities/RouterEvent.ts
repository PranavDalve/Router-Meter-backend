import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "router_events" })
export class RouterEvent {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "text" })
    device_id!: string;

    @Column({ type: "bigint" })
    timestamp!: string;  // keep as string because JS cannot store large bigint safely

    @Column({ type: "integer" })
    type!: number;

    @Column("jsonb")
    details!: any;
}
