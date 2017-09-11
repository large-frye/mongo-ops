# mongo-ops
A small admin to handle day-to-day mongo ops

## usage
Use `mongo_ops.sh` until the admin is ready. Eventually, the admin will utilize `mongo_ops.sh` script, but the admin isn't built yet!

## limitations
It only does a mongoexport, you can use the dumped bson for a mongorestore (https://docs.mongodb.com/v3.2/reference/program/mongorestore/). If you get the MONGO URI created by the dump, you should be able to modify easy enough to do a mongorestore.

## query quirks
When adding query via command prompt, there needs to be a double escape for double quotes inside your query.
ex: `\"{ \\"_id\\": ObjectId(\\"{your_id}\\") }\"`
