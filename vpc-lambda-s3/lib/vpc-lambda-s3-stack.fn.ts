import { S3Handler } from 'aws-lambda'

export const handler: S3Handler = (event) => {
  event.Records.forEach((r) => {
    console.log(r)
  })
}
