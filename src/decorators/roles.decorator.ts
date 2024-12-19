import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/roles.enum';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles); // metadata es como un diccionario asociado a cada request que recibimos
