import { configService } from '../modules/database/database.service';
import fs = require('fs');
fs.writeFileSync(
  'ormconfig.json',
  JSON.stringify(configService.getTypeOrmConfig(), null, 2),
);
/// in package json use "pretypeorm" use to delete generated ormconfig.josn file (del ormconfig.json || :) && for win
/// or   (rm ormconfig.json || :) && for linux, mac
