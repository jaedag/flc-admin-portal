export const matchMemberQuery = `
MATCH (member:Member {id:$from.id}) 
  RETURN 
  member.id AS id,
  member.firstName AS firstName, 
  member.lastName AS lastName,
  member.email AS email,
  member.auth_id AS auth_id,
  member.phoneNumber AS phoneNumber,
  member.pictureUrl AS pictureUrl`
export const setMemberAuthId = `
MATCH (member:Member {id:$id})
SET member.auth_id = $auth_id
RETURN member.auth_id`
export const mergeMemberIsBishopAdminFor = `
MATCH (admin:Member {id: $adminId})
MATCH (bishop:Member {id:$bishopId})
MERGE (admin)-[:IS_ADMIN_FOR]->(bishop)
RETURN 
  bishop.id AS id,
  bishop.firstName AS firstName, 
  bishop.lastName AS lastName,
  bishop.email AS email,
  bishop.auth_id AS auth_id,
  bishop.phoneNumber AS phoneNumber,
  bishop.pictureUrl AS pictureUrl
`
export const mergeMemberIsTownAdminFor = `
MATCH (admin:Member {id: $adminId})
MATCH (town:Member {id:$townId})
MERGE (admin)-[:IS_ADMIN_FOR]->(town)
RETURN 
  town.id AS id,
  town.name AS name, 
  town.phoneNumber AS phoneNumber
`
