
import { AppController } from '../controllers/app.controller';
import { AuthController } from '../controllers/auth.controller';
import { ProductController } from '../controllers/product.controller';
import { ProductApiController } from '../controllers/api/product-api.controller';

import { webDashboardDefaultController } from '../controllers/web/dashbords/dashboard.controller';


import { SanctionResourceOverseaController } from '../controllers/web/aml/sanction-resource-oversea.controller';
import { SanctionResourceLocalController } from '../controllers/web/aml/sanction-resource-local.controller';
import { SanctionRiskContriesController } from '../controllers/web/aml/sanction-risk-countries.controller';
import { SanctionRiskLevelController } from '../controllers/web/aml/sanction-risk-level.controller';
import { SanctionOnBoardController } from '../controllers/web/aml/sanction-onboard.controller';
import { SanctionBlacklistController } from '../controllers/web/aml/sanction-blacklist.controller';

import { AdminModuleController } from '../controllers/web/admin/admin-modules.controller';
import { AdminApplicationController } from '../controllers/web/admin/admin-applications.controller';
import { AdminPrivilegeController } from '../controllers/web/admin/admin-privileges.controller';
import { AdminUserController } from '../controllers/web/admin/admin-users.controller';


export default [
    AppController, AuthController,
    
    ProductController,
    ProductApiController,

    webDashboardDefaultController,

    SanctionRiskContriesController, SanctionRiskLevelController,
    SanctionResourceOverseaController, SanctionResourceLocalController,
    SanctionOnBoardController, SanctionBlacklistController,

    AdminModuleController, AdminApplicationController, AdminPrivilegeController, AdminUserController,
    
];
