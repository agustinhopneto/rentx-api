import { hash } from 'bcrypt';
import { v4 as uuid } from 'uuid';

import createConnection from '../index';

async function create() {
  const connection = await createConnection('localhost');

  const id = uuid();
  const password = await hash('admin1234', 8);

  await connection.query(
    `INSERT INTO users(id, name, email, password, is_admin, created_at, driver_license)
    VALUES('${id}', 'Administrador', 'admin@rentx.com', '${password}', 'true', 'now()', 'XXXXXX')`,
  );

  await connection.close();
}

create().then(() => console.log('✅ User admin created!'));
