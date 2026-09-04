
import { LocalStrategy } from '../providers/local.strategy';
import { SessionSerializer } from '../providers/session.serializer';


import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { ProductService } from '../services/product.service';


import { AdminModulesService } from '../services/admin-modules.service';
import { AdminApplicationService } from '../services/admin-applications.service';


export default [
    LocalStrategy,
    SessionSerializer,
    AuthService,

    UserService, ProductService,

    AdminModulesService, AdminApplicationService
];
