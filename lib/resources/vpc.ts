import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

export function createVpc(scope: Construct): ec2.Vpc {
  const vpc = new ec2.Vpc(scope, 'Vpc', {
    cidr: '10.0.0.0/16',
    enableDnsHostnames: true,
    enableDnsSupport: true,
    natGateways: 0,
    maxAzs: 1,
    subnetConfiguration: [
      {
        name: 'Public',
        subnetType: ec2.SubnetType.PUBLIC,
        cidrMask: 24,
      },
      {
        name: 'Private',
        subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
        cidrMask: 24,
      },
    ],
  });

  return vpc;
}
