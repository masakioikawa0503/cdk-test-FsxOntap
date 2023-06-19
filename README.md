# 【TEST】 AWS CDK (TypeScript) project - Amazon FSx for NetApp ONTAP("FSx for ONTAP")

## Create resources

This project will create the following resources.

- VPC (Single AZ) × 1
  - Public subnet × 1
  - Private subnet × 1
  - internet gateway × 1
- EC2 Instance (Amazon Linux 2 - t3.small) × 1
- IAM Role (SSM: AmazonSSMManagedInstanceCore) × 1
- Security Group for FSx for ONATP × 1
- Secrets Manager for FSx for ONTAP × 1
- FSx for ONTAP(Single AZ)
  - FileSystem × 1
  - SVM × 1
  - Volume × 2 (root volume is included)

## After "git clone", run the following commands to create the resources

- `npm install (or npm i)`
- `cdk synth (or cdk diff)`
- `cdk deploy`

## To destroy the resources created with AWS CDK, execute the following command

- `cdk destroy`

After "cdk destroy", delete the backup of FSx for ONTAP.

- Resource name to delete: `VolumeFSxForOntap`
  ![](images/cleanup-1.png 'cleanup-1')
  ![](images/cleanup-2.png 'cleanup-2')

## References

- [non-97/fsx-for-ontap-windows-client](https://github.com/non-97/fsx-for-ontap-windows-client)
