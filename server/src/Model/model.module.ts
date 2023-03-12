import { Global, Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { Favorites } from './Entities/favorite.entity';
import { Reviews } from './Entities/review.entity';
import { Users } from './Entities/user.entity';

@Global()
@Module({
  imports: [DatabaseModule],
  providers: [
    { provide: 'USERS', useValue: Users },
    { provide: 'FAVORITES', useValue: Favorites },
    { provide: 'REVIEWS', useValue: Reviews },
  ],
  exports: ['USERS', 'FAVORITES', 'REVIEWS'],
})
export class ModelsModule {}
