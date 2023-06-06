import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as iam from 'aws-cdk-lib/aws-iam';

export function createEc2(
  scope: Construct,
  vpc: ec2.Vpc,
  ssmIamRole: iam.Role,
): ec2.Instance {
  const instance = new ec2.Instance(scope, 'EC2Instance', {
    vpc,
    instanceType: ec2.InstanceType.of(
      ec2.InstanceClass.T3,
      ec2.InstanceSize.SMALL,
    ),
    machineImage: new ec2.AmazonLinuxImage({
      generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2,
    }),
    blockDevices: [
      {
        deviceName: '/dev/sda1',
        volume: ec2.BlockDeviceVolume.ebs(30, {
          volumeType: ec2.EbsDeviceVolumeType.GP3,
        }),
      },
    ],
    vpcSubnets: {
      subnetType: ec2.SubnetType.PUBLIC,
    },
    role: ssmIamRole,
  });

  return instance;
}
