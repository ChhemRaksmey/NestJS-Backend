import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  AdminModule,
  AdminModule_ValidateCreate, AdminModule_ValidateEdit,
} from '../models/admin-modules.entity';

@Injectable()
export class AdminModulesService {
  
  constructor(
    @InjectRepository(AdminModule)
    private readonly rps_admin_module: Repository<AdminModule>,
  ) {}

  findAll(): Promise<AdminModule[]> {
    return this.rps_admin_module.find();
  }

  async findOne(id: string): Promise<AdminModule> {
    const record = await this.rps_admin_module.findOne({ where: { idModule: id } });
    if (!record) { throw new NotFoundException(`record not found!`); }
    return record;
  }

  create(data: AdminModule_ValidateCreate): Promise<AdminModule> {
    const record = this.rps_admin_module.create({
      fullName: data.full_name,
      status: data.status,
      narrative: data.narrative,
    });

    return this.rps_admin_module.save(record);
  }

  async update(id: string, data: Partial<AdminModule_ValidateEdit>): Promise<AdminModule> {
    await this.findOne(id);

    await this.rps_admin_module.update({ idModule: id }, {
      fullName: data.full_name,
      status: data.status,
      narrative: data.narrative,
    });

    return this.findOne(id);
  }

}
