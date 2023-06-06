import { Construct } from 'constructs';
import * as iam from 'aws-cdk-lib/aws-iam';

export function createIam(scope: Construct): iam.Role {
  const ssmIamRole = new iam.Role(scope, 'SSM IAM Role', {
    assumedBy: new iam.ServicePrincipal('ec2.amazonaws.com'),
    managedPolicies: [
      iam.ManagedPolicy.fromAwsManagedPolicyName(
        'AmazonSSMManagedInstanceCore',
      ),
    ],
  });

  return ssmIamRole;
}
