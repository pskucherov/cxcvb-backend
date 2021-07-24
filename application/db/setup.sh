psql -f install.sql -U postgres
PGPASSWORD=marcus psql -d cxcvb -f structure.sql -U cxcvb_admin
PGPASSWORD=marcus psql -d cxcvb -f data.sql -U cxcvb_admin
