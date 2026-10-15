export const verifiedDefinition='Meets our membership requirements and commits to annual independent identity and purity testing';
export function publicVendorStatus(status:string){return status==='Active'?'Verified':['Under review','Suspended','Removed'].includes(status)?status:'Unverified'}
