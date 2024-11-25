import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const openApiConfig = new DocumentBuilder()
    .setTitle("test-ua-api")
    .setDescription("The test UA API description")
    .setVersion("1.0")
    .build();

  const app = await NestFactory.create(AppModule);

  app.enableCors({ origin: /.*/ });

  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
    })
  );

  const document = SwaggerModule.createDocument(app, openApiConfig);

  SwaggerModule.setup("api", app, document);

  await app.listen(3006);
}
bootstrap();
