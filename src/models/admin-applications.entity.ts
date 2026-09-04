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


@Entity({ name: 'applications', schema: 'public' })
export class AdminApplication {

  @PrimaryColumn({name: 'id_module', type: 'varchar', length: 25, default: '', })
  idModule: string;

  @PrimaryColumn({name: 'id_app', type: 'varchar', length: 25, default: '', })
  idApp: string;

  @Column({name: 'full_name', type: 'varchar', length: 25, default: '', })
  fullName: string;

  @Column({name: 'status', type: 'varchar', length: 25, default: '', })
  status: string;

  @Column({name: 'route_url', type: 'text', default: '', })
  routeUrl: string;

  @Column({name: 'narrative', type: 'text', default: '', })
  narrative: string;

  @Column({name: 'audit_status', type: 'varchar', length: 5, default: '', })
  auditStatus: string;

  @Column({name: 'audit_users', type: 'json', default: {INPUTTER: '',DATETIME: '',authoriser: [{ inputter: '', datetime: '' },{ inputter: '', datetime: '' },],}, })
  auditUsers: AuditUsers;

  @Column({name: 'audit_change', type: 'json', default: {field_name_1: { old_value: '', new_value: '' },}, })
  auditChange: AuditChange;

}


export class AdminApplication_ValidateCreate {

  @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
  @IsString()
  @IsNotEmpty({ message: 'main module is required' })
  idModule: string
  
  @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
  @IsString()
  @IsNotEmpty({ message: 'full name is required' })
  fullName: string
  
  @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
  @IsString()
  @IsNotEmpty({ message: 'status is required' })
  status: string
  
  @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
  @IsString()
  @IsNotEmpty({ message: 'route url is required' })
  routeUrl: string
  
  @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
  @IsString()
  @IsNotEmpty({ message: 'narrative is required' })
  narrative: string

}

export class AdminApplication_ValidateEdit {

  @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
  @IsString()
  @IsNotEmpty({ message: 'main module is required' })
  idModule: string
  
  @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
  @IsString()
  @IsNotEmpty({ message: 'full name is required' })
  fullName: string
  
  @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
  @IsString()
  @IsNotEmpty({ message: 'status is required' })
  status: string
  
  @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
  @IsString()
  @IsNotEmpty({ message: 'route url is required' })
  routeUrl: string
  
  @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
  @IsString()
  @IsNotEmpty({ message: 'narrative is required' })
  narrative: string

}

