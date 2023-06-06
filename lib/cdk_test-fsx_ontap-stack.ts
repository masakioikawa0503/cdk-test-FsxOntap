import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { createVpc } from './resources/vpc';
import { createEc2 } from './resources/ec2Instance';
import { createIam } from './resources/ssmIamRoleEc2Instance';
import { createSecurityGroupFsxOntap } from './resources/securityGroupFsxOntap';
import { createSecretsManagerFsxOntap } from './resources/secretsManagerFsxOntap';
import { createCfnFileSystem } from './resources/fileSystemFsxOntap';
import { createCfnStorageVirtualMachine } from './resources/svmFsxOntap';
import { createCfnVolume } from './resources/volumeFsxOntap';

export class CdkTestFsxOntapStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    /** VPC */
    const vpc = createVpc(this);

    /** SSM IAM Role for EC2 Instance */
    const ssmIamRole = createIam(this);

    /** EC2 インスタンス */
    const ec2Instance = createEc2(this, vpc, ssmIamRole);

    /** SecurityGroup for FSx for ONTAP */
    const securityGroupFsxOntap = createSecurityGroupFsxOntap(this, vpc);

    /** SecretsManager for FSx for ONTAP */
    const secretsManagerFsxOntap = createSecretsManagerFsxOntap(this);

    /** FileSystem - FSx for ONTAP */
    const cfnFileSystemFsxOntap = createCfnFileSystem(
      this,
      vpc,
      securityGroupFsxOntap,
      secretsManagerFsxOntap,
    );

    /** SVM - FSx for ONTAP */
    const cfnStorageVirtualMachineFsxOntap = createCfnStorageVirtualMachine(
      this,
      cfnFileSystemFsxOntap,
    );

    /** Volume - FSx for ONTAP */
    const CfnVolumeFsxOntap = createCfnVolume(
      this,
      cfnStorageVirtualMachineFsxOntap,
    );
  }
}
