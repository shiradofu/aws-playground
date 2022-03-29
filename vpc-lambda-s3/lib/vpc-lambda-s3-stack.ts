import { Stack, StackProps } from 'aws-cdk-lib'
import { SubnetType, Vpc } from 'aws-cdk-lib/aws-ec2'
import { Construct } from 'constructs'
import { Bucket } from 'aws-cdk-lib/aws-s3'
import { LambdaDestination } from 'aws-cdk-lib/aws-s3-notifications'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'

export class VpcLambdaS3Stack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props)

    const vpc = new Vpc(this, 'Vpc', {
      cidr: '192.168.0.0/24',
      maxAzs: 1,
      subnetConfiguration: [
        {
          cidrMask: 27,
          subnetType: SubnetType.PUBLIC,
          name: `Public`,
        },
        {
          cidrMask: 27,
          subnetType: SubnetType.PRIVATE_WITH_NAT,
          name: `Private`,
        },
      ],
    })

    const bucket = new Bucket(this, 'Bucket')
    const fn = new NodejsFunction(this, "fn", {
      vpc,
      vpcSubnets: { subnetType: SubnetType.PRIVATE_WITH_NAT },
    });

    // VPC endpointがなくてもVPC内のlambdaにnotificationが届く
    bucket.addObjectCreatedNotification(new LambdaDestination(fn))
  }
}
