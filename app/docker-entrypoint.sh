echo "Flush the manage.py command it any"

while ! python3 manage.py flush --no-input 2>&1; do
  echo "Flusing django manage command"
  sleep 3
done

echo "Migrate the Database at startup of project"

while ! python3 manage.py makemigrations  2>&1; do
   echo "MakeMigration is in progress status"
   sleep 3
done

# Wait for few minute and run db migraiton
while ! python3 manage.py migrate  2>&1; do
   echo "Migration is in progress status"
   sleep 3
done

echo "Django docker is fully configured successfully."

exec "$@"
