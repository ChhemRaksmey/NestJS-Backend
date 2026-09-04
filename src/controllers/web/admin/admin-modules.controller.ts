import { AuthenticatedGuard } from '../../../middleware/auth.guard';
import { UseGuards, Controller, Req, Res, Body, Param, Get, Post, } from '@nestjs/common';
import { Request, Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { AdminModulesService } from '../../../services/admin-modules.service';
import { AdminModule_ValidateCreate, AdminModule_ValidateEdit } from '../../../models/admin-modules.entity';

@UseGuards(AuthenticatedGuard)
@Controller('/admin/modules')
export class AdminModuleController {

  private path_view  = "web/admin/modules/";
  private path_route = "/admin/modules";
  private page_title = "System Modules";

  constructor(
    private readonly srv_admin_module: AdminModulesService
  ) {}

  @Get()
  async page_list (@Res() res: Response, @Req() req: Request) {
    const records = await this.srv_admin_module.findAll();
    return res.render(this.path_view + "list", {
      user: req.user,
      path_route: this.path_route,
      page_title: this.page_title,
      records,
    });
  }

  @Get('create')
  async page_create (@Res() res: Response, @Req() req: Request) {
    return res.render(this.path_view + "create", {
      user: req.user,
      path_route: this.path_route,
      page_title: this.page_title,
      error: [],
      form: {},
    });
  }

  @Get(':id/edit')
  async page_edit (@Res() res: Response, @Req() req: Request, @Param('id') id: string) {
    const record = await this.srv_admin_module.findOne(id);
    return res.render(this.path_view + "edit", {
      user: req.user,
      path_route: this.path_route,
      page_title: this.page_title,
      id: id,
      error: [],
      form: {},
      record: record,
    });
  }

  @Get(':id/view')
  async page_view (@Res() res: Response, @Req() req: Request, @Param('id') id: string) {
    const record = await this.srv_admin_module.findOne(id);
    return res.render(this.path_view + "view", {
      user: req.user,
      path_route: this.path_route,
      page_title: this.page_title,
      id: id,
      record: record
    });
  }

  @Get(':id/authorize')
  async page_authorize (@Res() res: Response, @Req() req: Request, @Param('id') id: string) {
    return res.render(this.path_view + "authorize", { user: req.user, path_route: this.path_route, page_title: this.page_title, id: id });
  }



  @Post('create')
  async save_create (@Res() res: Response, @Req() req: Request, @Body() body: any,) {

    const form = {
      full_name: body.full_name,
      status: body.status,
      narrative: body.narrative,
    };
    const input = plainToInstance(AdminModule_ValidateCreate, form);
    const errors = await validate(input);

    if (errors.length > 0) {
      const messages = errors.flatMap((error) => Object.values(error.constraints || {}));
      return res.status(400).render(this.path_view + "create", {
        user: req.user,
        path_route: this.path_route,
        page_title: this.page_title,
        error: messages,
        form,
      });
    }

    try {
      await this.srv_admin_module.create(input);
      return res.redirect(this.path_route);
    } catch (error: any) {
      return res.status(500).render(this.path_view + "create", {
        user: req.user,
        path_route: this.path_route,
        page_title: this.page_title,
        error: [error.message || 'Unable to create module'],
        form,
      });
    }

  }

  @Post(':id/edit')
  async save_edit (@Res() res: Response, @Req() req: Request, @Body() body: any, @Param('id') id: string, ) {

    const form = {
      full_name: body.full_name,
      status: body.status,
      narrative: body.narrative,
    };
    const input = plainToInstance(AdminModule_ValidateEdit, form);
    const errors = await validate(input);

    if (errors.length > 0) {
      const messages = errors.flatMap((error) => Object.values(error.constraints || {}));
      return res.status(400).render(this.path_view + "edit", {
        user: req.user,
        path_route: this.path_route,
        page_title: this.page_title,
        id,
        error: messages,
        form,
      });
    }

    try {
      await this.srv_admin_module.update(id, input);
      return res.redirect(this.path_route + "/" + id + "/view");
    } catch (error: any) {
      return res.status(500).render(this.path_view + "edit", {
        user: req.user,
        path_route: this.path_route,
        page_title: this.page_title,
        id,
        error: [error.message || 'Unable to create module'],
        form,
      });
    }
    
  }

  @Post(':id/view')
  async save_view (@Res() res: Response, @Req() req: Request, @Body() body: any, @Param('id') id: string, ) {
    return res.redirect(this.path_route);
  }

  @Post(':id/authorize')
  async save_authorize (@Res() res: Response, @Req() req: Request, @Body() body: any, @Param('id') id: string, ) {
    return res.redirect(this.path_route);
  }


}
