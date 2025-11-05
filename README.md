npm install

# xóa network cũ
docker network rm doancuoiky_default
# chạy docker (redis)
docker-compose up -d

# render shema.prisma
npm run prisma:generate
# push lên monggo alat
npm run prisma:push

# chạy server
npm run dev