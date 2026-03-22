import type { DataRow } from '@/types/table';

export interface InsurancePolicy extends DataRow {
  id: string;
  code: string;
  name: string;
  designation: string;
  email: string;
  address: string;
  district: string;
  panNumber: string;
  aadharNumber: string;
  status?: 'active' | 'inactive' | 'expired' | 'pending';
}

export const mockPolicies: InsurancePolicy[] = [
  {
    id: '1',
    code: 'EMP001',
    name: 'Arjun Nair',
    designation: 'Senior Manager',
    email: 'arjun.nair@example.com',
    address: 'MG Road, Kochi',
    district: 'Ernakulam',
    panNumber: 'ABCDE1234F',
    aadharNumber: '1234-5678-9012',
    status: 'active',
  },
  {
    id: '2',
    code: 'EMP002',
    name: 'Anu Menon',
    designation: 'Team Lead',
    email: 'anu.menon@example.com',
    address: 'Kowdiar, Thiruvananthapuram',
    district: 'Thiruvananthapuram',
    panNumber: 'BCDEF2345G',
    aadharNumber: '2345-6789-0123',
    status: 'active',
  },
  {
    id: '3',
    code: 'EMP003',
    name: 'Vishnu Pillai',
    designation: 'Software Engineer',
    email: 'vishnu.pillai@example.com',
    address: 'Technopark Phase 3',
    district: 'Thiruvananthapuram',
    panNumber: 'CDEFG3456H',
    aadharNumber: '3456-7890-1234',
    status: 'pending',
  },
  {
    id: '4',
    code: 'EMP004',
    name: 'Lakshmi Nambiar',
    designation: 'HR Manager',
    email: 'lakshmi.nambiar@example.com',
    address: 'Civil Station Road, Kozhikode',
    district: 'Kozhikode',
    panNumber: 'DEFGH4567I',
    aadharNumber: '4567-8901-2345',
    status: 'active',
  },
  {
    id: '5',
    code: 'EMP005',
    name: 'Rahul Varma',
    designation: 'Sales Executive',
    email: 'rahul.varma@example.com',
    address: 'Thrissur Round',
    district: 'Thrissur',
    panNumber: 'EFGHI5678J',
    aadharNumber: '5678-9012-3456',
    status: 'expired',
  },
  {
    id: '6',
    code: 'EMP006',
    name: 'Meera Krishnan',
    designation: 'Product Manager',
    email: 'meera.krishnan@example.com',
    address: 'Kakkanad Infopark',
    district: 'Ernakulam',
    panNumber: 'FGHIJ6789K',
    aadharNumber: '6789-0123-4567',
    status: 'active',
  },
  {
    id: '7',
    code: 'EMP007',
    name: 'Sanjay Nair',
    designation: 'Business Analyst',
    email: 'sanjay.nair@example.com',
    address: 'Marine Drive',
    district: 'Ernakulam',
    panNumber: 'GHIJK7890L',
    aadharNumber: '7890-1234-5678',
    status: 'active',
  },
  {
    id: '8',
    code: 'EMP008',
    name: 'Divya Suresh',
    designation: 'Marketing Lead',
    email: 'divya.suresh@example.com',
    address: 'Palayam',
    district: 'Thiruvananthapuram',
    panNumber: 'HIJKL8901M',
    aadharNumber: '8901-2345-6789',
    status: 'inactive',
  },
  {
    id: '9',
    code: 'EMP009',
    name: 'Hari Krishnan',
    designation: 'Technical Architect',
    email: 'hari.krishnan@example.com',
    address: 'Calicut Beach Road',
    district: 'Kozhikode',
    panNumber: 'IJKLM9012N',
    aadharNumber: '9012-3456-7890',
    status: 'active',
  },
  {
    id: '10',
    code: 'EMP010',
    name: 'Athira Nair',
    designation: 'UX Designer',
    email: 'athira.nair@example.com',
    address: 'Aluva',
    district: 'Ernakulam',
    panNumber: 'JKLMN0123O',
    aadharNumber: '0123-4567-8901',
    status: 'active',
  },
];
