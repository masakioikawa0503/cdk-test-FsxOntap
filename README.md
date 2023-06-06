# AWS CDK - TypeScript project

This project will create the following resources.

- VPC
- EC2 Instance
- IAM Role (SSM)
- Security Group for FSx for ONATP
- Secrets Manager for FSx for ONTAP
- FSx for ONTAP
  - FileSystem
  - SVM
  - Volume

## After "git clone", run the following commands to create the resource in AWS CDK.

- `npm install (or npm i)`
- `cdk synth (or cdk diff)`
- `cdk deploy`

## To destroy a resource created with AWS CDK, execute the following command

- `cdk destroy`
