import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGlobal } from './middlewares/logger.middleware';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { auth } from 'express-openid-connect';
import { config as auth0Config } from './config/auth0.config';
//import { AuthGuard } from './guards/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //app.useGlobalGuards(new AuthGuard());
  //app.useGlobalInterceptors(new MyInterceptor())
  app.use(auth(auth0Config));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      exceptionFactory: (errors) => {
        const cleanErrors = errors.map((error) => {
          return { property: error.property, constraints: error.constraints };
        });
        return new BadRequestException({
          alert:
            'Se han detectado los siguientes errores en la aplicacion y te mandamos un mensaje personalizado',
          errors: cleanErrors,
        });
      },
    }),
  );
  app.use(loggerGlobal);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
