export const verifiedDefinition='Meets our membership requirements and agrees to annual independent identity and purity surveillance';
export function publicVendorStatus(status:string){return status==='Active'?'Verified':['Under review','Suspended','Removed'].includes(status)?status:'Unverified listing'}
