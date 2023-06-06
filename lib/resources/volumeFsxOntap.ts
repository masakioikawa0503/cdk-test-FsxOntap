import { Construct } from 'constructs';
import * as fsx from 'aws-cdk-lib/aws-fsx';

export function createCfnVolume(
  scope: Construct,
  cfnStorageVirtualMachineFsxOntap: fsx.CfnStorageVirtualMachine,
): fsx.CfnVolume {
  const volumeName = 'VolumeFSxForOntap';
  const junctionPath = '/vol1';
  const volume = new fsx.CfnVolume(scope, 'Volume', {
    name: volumeName,
    ontapConfiguration: {
      junctionPath,
      sizeInMegabytes: '102400',
      storageVirtualMachineId: cfnStorageVirtualMachineFsxOntap.ref,
      storageEfficiencyEnabled: 'true',
      securityStyle: 'UNIX',
    },
    tags: [
      {
        key: 'Name',
        value: volumeName,
      },
    ],
    volumeType: 'ONTAP',
  });

  return volume;
}
