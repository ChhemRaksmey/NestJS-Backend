import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  AdminApplication,
  AdminApplication_ValidateCreate, AdminApplication_ValidateEdit
} from '../models/admin-applications.entity';

@Injectable()
export class AdminApplicationService {
  
  constructor(
    @InjectRepository(AdminApplication)
    private readonly rps_admin_app: Repository<AdminApplication>,
  ) {}

  findAll(): Promise<AdminApplication[]> {
    return this.rps_admin_app.find();
  }

  async findOne(id: string): Promise<AdminApplication> {
    const record = await this.rps_admin_app.findOne({ where: { idApp: id } });
    if (!record) { throw new NotFoundException(`record not found!`); }
    return record;
  }

  create(data: AdminApplication_ValidateCreate): Promise<AdminApplication> {
    const record = this.rps_admin_app.create({
      idModule: data.idModule,
      fullName: data.fullName,
      status: data.status,
      routeUrl: data.routeUrl,
      narrative: data.narrative,
    });

    return this.rps_admin_app.save(record);
  }

  async update(id: string, data: Partial<AdminApplication_ValidateEdit>): Promise<AdminApplication> {
    await this.findOne(id);

    await this.rps_admin_app.update({ idApp: id }, {
      idModule: data.idModule,
      fullName: data.fullName,
      status: data.status,
      routeUrl: data.routeUrl,
      narrative: data.narrative,
    });

    return this.findOne(id);
  }

}
