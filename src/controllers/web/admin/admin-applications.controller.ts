import { AuthenticatedGuard } from '../../../middleware/auth.guard';
import { UseGuards, Controller, Req, Res, Body, Param, Get, Post, } from '@nestjs/common';
import { Request, Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { AdminModulesService } from '../../../services/admin-modules.service';
import { AdminApplicationService } from '../../../services/admin-applications.service';
import { AdminApplication_ValidateCreate, AdminApplication_ValidateEdit } from '../../../models/admin-applications.entity';

@UseGuards(AuthenticatedGuard)
@Controller('/admin/applications')
export class AdminApplicationController {

  private path_view  = "web/admin/applications/";
  private path_route = "/admin/applications";
  private page_title = "System Applications";

  constructor(
    private readonly srv_admin_module: AdminModulesService,
    private readonly srv_admin_app: AdminApplicationService,
  ) {}

  @Get()
  async page_list (@Res() res: Response, @Req() req: Request) {
    const records = await this.srv_admin_app.findAll();
    return res.render(this.path_view + "list", {
      user: req.user,
      path_route: this.path_route,
      page_title: this.page_title,
      records
    });
  }

  @Get('create')
  async page_create (@Res() res: Response, @Req() req: Request) {
    const list_modules = await this.srv_admin_module.findAll();
    return res.render(this.path_view + "create", {
      user: req.user,
      path_route: this.path_route,
      page_title: this.page_title,
      error: [],
      form: {},
      list_modules: list_modules,
    });
  }

  @Get(':id/edit')
  async page_edit (@Res() res: Response, @Req() req: Request, @Param('id') id: string) {
    const list_modules = await this.srv_admin_module.findAll();
    const record = await this.srv_admin_app.findOne(id);
    return res.render(this.path_view + "edit", {
      user: req.user,
      path_route: this.path_route,
      page_title: this.page_title,
      id: id,
      error: [],
      form: {},
      record: record,
      list_modules: list_modules,
    });
  }

  @Get(':id/view')
  async page_view (@Res() res: Response, @Req() req: Request, @Param('id') id: string) {
    const list_modules = await this.srv_admin_module.findAll();
    const record = await this.srv_admin_app.findOne(id);
    return res.render(this.path_view + "view", {
      user: req.user,
      path_route: this.path_route,
      page_title: this.page_title,
      id: id,
      record: record,
      list_modules: list_modules,
    });
  }

  @Get(':id/authorize')
  async page_authorize (@Res() res: Response, @Req() req: Request, @Param('id') id: string) {
    const list_modules = await this.srv_admin_module.findAll();
    const record = await this.srv_admin_app.findOne(id);
    return res.render(this.path_view + "authorize", {
      user: req.user,
      path_route: this.path_route,
      page_title: this.page_title,
      id: id,
      record: record,
      list_modules: list_modules,
    });
  }



  @Post('create')
  async save_create (@Res() res: Response, @Req() req: Request, @Body() body: any,) {

    const form = {
      idModule: body.idModule,
      fullName: body.fullName,
      status: body.status,
      routeUrl: body.routeUrl,
      narrative: body.narrative,
    };
    const input = plainToInstance(AdminApplication_ValidateCreate, form);
    const errors = await validate(input);
    
    const list_modules = await this.srv_admin_module.findAll();

    if (errors.length > 0) {
      const messages = errors.flatMap((error) => Object.values(error.constraints || {}));
      return res.status(400).render(this.path_view + "create", {
        user: req.user,
        path_route: this.path_route,
        page_title: this.page_title,
        error: messages,
        form,
        list_modules: list_modules,
      });
    }

    try {
      const record = await this.srv_admin_app.create(input);
      return res.redirect(this.path_route);
    } catch (error: any) {
      return res.status(500).render(this.path_view + "create", {
        user: req.user,
        path_route: this.path_route,
        page_title: this.page_title,
        error: [error.message || 'Unable to create module'],
        form,
        list_modules: list_modules,
      });
    }

  }

  @Post(':id/edit')
  async save_edit (@Res() res: Response, @Req() req: Request, @Body() body: any, @Param('id') id: string, ) {

    const form = {
      idModule: body.idModule,
      fullName: body.fullName,
      status: body.status,
      routeUrl: body.routeUrl,
      narrative: body.narrative,
    };
    const input = plainToInstance(AdminApplication_ValidateEdit, form);
    const errors = await validate(input);

    console.log(input);

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
      await this.srv_admin_app.update(id, input);
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
