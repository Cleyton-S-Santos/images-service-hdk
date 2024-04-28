import { config } from "dotenv"

config()
export const envs = {
    minioEndPoint: process.env.MINIO_URL,
    minioPort: +process.env.MINIO_PORT,
    minioAccessKey: process.env.MINIO_ACCESS_KEY,
    minioSecretKey: process.env.MINIO_SECRET_KEY,
    minioBucketName: process.env.MINIO_IMAGE_BUCKET_NAME,
    publicMinioHost: process.env.PUBLIC_MINIO_HOST
}