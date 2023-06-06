import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

export function createSecurityGroupFsxOntap(
  scope: Construct,
  vpc: ec2.Vpc,
): ec2.SecurityGroup {
  const securityGroupFsxOntap = new ec2.SecurityGroup(
    scope,
    'Security Group of FSx for ONTAP file system',
    {
      vpc,
    },
  );

  // Ref : https://docs.aws.amazon.com/fsx/latest/ONTAPGuide/limit-access-security-groups.html
  securityGroupFsxOntap.addIngressRule(
    ec2.Peer.ipv4(vpc.vpcCidrBlock),
    ec2.Port.icmpPing(),
    'Pinging the instance',
  );
  securityGroupFsxOntap.addIngressRule(
    ec2.Peer.ipv4(vpc.vpcCidrBlock),
    ec2.Port.tcp(22),
    'SSH access to the IP address of the cluster management LIF or a node management LIF',
  );
  securityGroupFsxOntap.addIngressRule(
    ec2.Peer.ipv4(vpc.vpcCidrBlock),
    ec2.Port.tcp(111),
    'Remote procedure call for NFS',
  );
  securityGroupFsxOntap.addIngressRule(
    ec2.Peer.ipv4(vpc.vpcCidrBlock),
    ec2.Port.tcp(135),
    'Remote procedure call for CIFS',
  );
  securityGroupFsxOntap.addIngressRule(
    ec2.Peer.ipv4(vpc.vpcCidrBlock),
    ec2.Port.tcp(139),
    'NetBIOS service session for CIFS',
  );
  securityGroupFsxOntap.addIngressRule(
    ec2.Peer.ipv4(vpc.vpcCidrBlock),
    ec2.Port.tcpRange(161, 162),
    'Simple network management protocol (SNMP)',
  );
  securityGroupFsxOntap.addIngressRule(
    ec2.Peer.ipv4(vpc.vpcCidrBlock),
    ec2.Port.tcp(443),
    'ONTAP REST API access to the IP address of the cluster management LIF or an SVM management LIF',
  );
  securityGroupFsxOntap.addIngressRule(
    ec2.Peer.ipv4(vpc.vpcCidrBlock),
    ec2.Port.tcp(445),
    'Microsoft SMB/CIFS over TCP with NetBIOS framing',
  );
  securityGroupFsxOntap.addIngressRule(
    ec2.Peer.ipv4(vpc.vpcCidrBlock),
    ec2.Port.tcp(635),
    'NFS mount',
  );
  securityGroupFsxOntap.addIngressRule(
    ec2.Peer.ipv4(vpc.vpcCidrBlock),
    ec2.Port.tcp(749),
    'Kerberos',
  );
  securityGroupFsxOntap.addIngressRule(
    ec2.Peer.ipv4(vpc.vpcCidrBlock),
    ec2.Port.tcp(2049),
    'NFS server daemon',
  );
  securityGroupFsxOntap.addIngressRule(
    ec2.Peer.ipv4(vpc.vpcCidrBlock),
    ec2.Port.tcp(3260),
    'iSCSI access through the iSCSI data LIF',
  );
  securityGroupFsxOntap.addIngressRule(
    ec2.Peer.ipv4(vpc.vpcCidrBlock),
    ec2.Port.tcp(4045),
    'NFS lock daemon',
  );
  securityGroupFsxOntap.addIngressRule(
    ec2.Peer.ipv4(vpc.vpcCidrBlock),
    ec2.Port.tcp(4046),
    'Network status monitor for NFS',
  );
  securityGroupFsxOntap.addIngressRule(
    ec2.Peer.ipv4(vpc.vpcCidrBlock),
    ec2.Port.tcp(10000),
    'Network data management protocol (NDMP) and NetApp SnapMirror intercluster communication',
  );
  securityGroupFsxOntap.addIngressRule(
    ec2.Peer.ipv4(vpc.vpcCidrBlock),
    ec2.Port.tcp(11104),
    'Management of NetApp SnapMirror intercluster communication',
  );
  securityGroupFsxOntap.addIngressRule(
    ec2.Peer.ipv4(vpc.vpcCidrBlock),
    ec2.Port.tcp(11105),
    'SnapMirror data transfer using intercluster LIFs',
  );
  securityGroupFsxOntap.addIngressRule(
    ec2.Peer.ipv4(vpc.vpcCidrBlock),
    ec2.Port.udp(111),
    'Remote procedure call for NFS',
  );
  securityGroupFsxOntap.addIngressRule(
    ec2.Peer.ipv4(vpc.vpcCidrBlock),
    ec2.Port.udp(135),
    'Remote procedure call for CIFS',
  );
  securityGroupFsxOntap.addIngressRule(
    ec2.Peer.ipv4(vpc.vpcCidrBlock),
    ec2.Port.udp(137),
    'NetBIOS name resolution for CIFS',
  );
  securityGroupFsxOntap.addIngressRule(
    ec2.Peer.ipv4(vpc.vpcCidrBlock),
    ec2.Port.udp(139),
    'NetBIOS service session for CIFS',
  );
  securityGroupFsxOntap.addIngressRule(
    ec2.Peer.ipv4(vpc.vpcCidrBlock),
    ec2.Port.udpRange(161, 162),
    'Simple network management protocol (SNMP)',
  );
  securityGroupFsxOntap.addIngressRule(
    ec2.Peer.ipv4(vpc.vpcCidrBlock),
    ec2.Port.udp(635),
    'NFS mount',
  );
  securityGroupFsxOntap.addIngressRule(
    ec2.Peer.ipv4(vpc.vpcCidrBlock),
    ec2.Port.udp(2049),
    'NFS server daemon',
  );
  securityGroupFsxOntap.addIngressRule(
    ec2.Peer.ipv4(vpc.vpcCidrBlock),
    ec2.Port.udp(4045),
    'NFS lock daemon',
  );
  securityGroupFsxOntap.addIngressRule(
    ec2.Peer.ipv4(vpc.vpcCidrBlock),
    ec2.Port.udp(4046),
    'Network status monitor for NFS',
  );
  securityGroupFsxOntap.addIngressRule(
    ec2.Peer.ipv4(vpc.vpcCidrBlock),
    ec2.Port.udp(4049),
    'NFS quota protocol',
  );

  return securityGroupFsxOntap;
}
