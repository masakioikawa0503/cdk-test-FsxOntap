import { Construct } from 'constructs';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';

export function createSecretsManagerFsxOntap(
  scope: Construct,
): secretsmanager.Secret {
  const fileSystemSecret = new secretsmanager.Secret(
    scope,
    'Secret of FSx for ONTAP file system',
    {
      secretName: '/fsx-for-ontap/file-system/fsxadmin',
      generateSecretString: {
        generateStringKey: 'password',
        passwordLength: 32,
        requireEachIncludedType: true,
        secretStringTemplate: '{"username": "fsxadmin"}',
      },
    },
  );

  return fileSystemSecret;
}
