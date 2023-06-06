import { Construct } from 'constructs';
import * as fsx from 'aws-cdk-lib/aws-fsx';

export function createCfnStorageVirtualMachine(
  scope: Construct,
  cfnFileSystemFsxOntap: fsx.CfnFileSystem,
): fsx.CfnStorageVirtualMachine {
  const svmName = 'SvmFSxForOntap';
  const svm = new fsx.CfnStorageVirtualMachine(scope, 'SVM', {
    fileSystemId: cfnFileSystemFsxOntap.ref,
    name: svmName,
    rootVolumeSecurityStyle: 'MIXED',
    tags: [
      {
        key: 'Name',
        value: svmName,
      },
    ],
  });

  return svm;
}
