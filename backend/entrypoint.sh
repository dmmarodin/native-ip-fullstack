# Script de seeding e migrations do banco de dados
echo "
===========================================================
MIGRATIONS AND SEEDING - Waiting for database connection
==========================================================="
./node_modules/.bin/wait-port -t 50000 mysql:3306

echo "
===========================================================
MIGRATIONS AND SEEDING -Running Sequelize migrations
==========================================================="
npx sequelize db:migrate --migrations-path './src/migrations'

echo "
===========================================================
MIGRATIONS AND SEEDING -Running Sequelize seeders
==========================================================="
npx sequelize db:seed:undo:all --seeders-path './src/seeders'  && \
    npx sequelize db:seed:all --seeders-path './src/seeders'

echo "
===========================================================
MIGRATIONS AND SEEDING - All done!
==========================================================="

npm run dev