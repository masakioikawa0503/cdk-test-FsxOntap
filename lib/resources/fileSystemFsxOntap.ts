import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as fsx from 'aws-cdk-lib/aws-fsx';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';
import { CfnDynamicReference, CfnDynamicReferenceService } from 'aws-cdk-lib';

export function createCfnFileSystem(
  scope: Construct,
  vpc: ec2.Vpc,
  securityGroupFsxOntap: ec2.SecurityGroup,
  secretsManagerFsxOntap: secretsmanager.Secret,
): fsx.CfnFileSystem {
  const cfnFileSystemFsxOntap = new fsx.CfnFileSystem(
    scope,
    'CfnFileSystemFSxONTAP',
    {
      fileSystemType: 'ONTAP',
      subnetIds: vpc.selectSubnets({
        subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
      }).subnetIds,
      securityGroupIds: [securityGroupFsxOntap.securityGroupId],
      storageCapacity: 1024,
      ontapConfiguration: {
        deploymentType: 'SINGLE_AZ_1',
        throughputCapacity: 128,
        fsxAdminPassword: new CfnDynamicReference(
          CfnDynamicReferenceService.SECRETS_MANAGER,
          `${secretsManagerFsxOntap.secretArn}:SecretString:password`,
        ).toString(),
      },
      storageType: 'SSD',
      tags: [
        {
          key: 'Name',
          value: 'CfnFileSystemFSxONTAP',
        },
      ],
    },
  );

  return cfnFileSystemFsxOntap;
}
