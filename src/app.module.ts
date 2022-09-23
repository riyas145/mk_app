import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { CompliantCategoriesModule } from './compliant_categories/compliant_categories.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URL),
    PassportModule,
    CompliantCategoriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
