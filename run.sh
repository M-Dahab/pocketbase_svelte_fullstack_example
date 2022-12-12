docker build . -t pocketbase_svelte_fullstack
docker run --rm -p 5001:5001 -v `pwd`/pb_data:/pb/pb_data -v `pwd`/pb_migrations:/pb/pb_migrations pocketbase_svelte_fullstack