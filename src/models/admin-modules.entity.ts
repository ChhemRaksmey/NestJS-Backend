import { Entity, Column, PrimaryColumn } from 'typeorm';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  IsArray,
  ValidateNested,
  IsObject,
} from 'class-validator';
import { Transform } from 'class-transformer';


export interface Authoriser {
  inputter: string; datetime: string;
}

export interface AuditUsers {
  INPUTTER: string; DATETIME: string; authoriser: Authoriser[];
}

export interface AuditChange {
  [fieldName: string]: { old_value: string; new_value: string; };
}


@Entity({schema: 'public' , name: 'modules'})
export class AdminModule {

  @PrimaryColumn({ name: 'id_module', type: 'varchar', length: 25 })
  idModule: string;

  @Column({ name: 'full_name', type: 'varchar', length: 25, default: '' })
  fullName: string;

  @Column({ name: 'status', type: 'varchar', length: 25, default: '' })
  status: string;

  @Column({ name: 'narrative', type: 'text', default: '' })
  narrative: string;

  @Column({name: 'audit_status', type: 'varchar', length: 5, default: '',})
  auditStatus: string;
  
  @Column({ name: 'audit_users', type: 'json', nullable: true, default: {INPUTTER: '',DATETIME: '',authoriser: [{ inputter: '', datetime: '' },{ inputter: '', datetime: '' },],},})
  auditUsers: AuditUsers;
  
  @Column({name: 'audit_change', type: 'json', nullable: true, default: {field_name_1: { old_value: '', new_value: '' },},})
  auditChange: AuditChange;

}

export class AdminModule_ValidateCreate {

  @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
  @IsString()
  @IsNotEmpty({ message: 'module full name is required' })
  full_name?: string;

  @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
  @IsString()
  @IsNotEmpty({ message: 'module status is required' })
  status?: string;

  @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
  @IsString()
  @IsNotEmpty({ message: 'module narrative is required' })
  narrative?: string;

}

export class AdminModule_ValidateEdit {

  @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
  @IsString()
  @IsNotEmpty({ message: 'module full name is required' })
  full_name?: string;

  @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
  @IsString()
  @IsNotEmpty({ message: 'module status is required' })
  status?: string;

  @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
  @IsString()
  @IsNotEmpty({ message: 'module narrative is required' })
  narrative?: string;

}
