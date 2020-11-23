// Q1 Town, Community and Centre data import script
//Delete all Entries
match (n)
detach delete n;

//Import Apostles data
LOAD CSV WITH HEADERS FROM "https://admin-firstlovecenter.imfast.io/Neo4j%20Test%20Data/Apostles.csv" as line
CREATE (m:Member {whatsappNumber:line.`WhatsApp Number (if different)`})
	SET 
    m.memberID = apoc.create.uuid(),
    m.middleName = line.`Other Names`,
    m.firstName = apoc.text.capitalizeAll(toLower(trim(line.`First Name`))),
    m.lastName = apoc.text.capitalizeAll(toLower(trim(line.`Last Name`))),
    m.phoneNumber = line.`Phone Number`,
    m.areaOfResidence = line.`Area of Residence`,
    m.pictureUrl   = line.pictureUrl

   
MERGE(g: Gender {gender: apoc.text.capitalizeAll(toLower(trim(line.Gender)))})
MERGE(m)-[:HAS_GENDER]->(g)	

MERGE(ms: MaritalStatus {status: apoc.text.capitalizeAll(toLower(trim(line.`Marital Status`)))})
MERGE(m)-[:HAS_MARITAL_STATUS]->(ms)

with line, m  WHERE line.`Ministry` is not null
MERGE(son: Ministry {name:line.`Ministry`})
    ON CREATE SET 
    son.sontaID = apoc.create.uuid()
MERGE(m)-[:BELONGS_TO_MINISTRY]->(son)

WITH line,m
WHERE line.`Date of Birth` is not null
// MATCH (m:Member {whatsappNumber:line.`WhatsApp Number (if different)`})

MERGE (dob: TimeGraph {date: date(line.`Date of Birth`)})
MERGE (m)-[:WAS_BORN_ON]->(dob)

WITH line,m
WHERE line.Occupation is not null
// MATCH (m:Member {whatsappNumber: line.`WhatsApp Number (if different)`})

MERGE(O:Occupation {occupation: line.Occupation})
MERGE(m)-[:HAS_OCCUPATION]->(O);

// Create the Members
LOAD CSV WITH HEADERS FROM "https://admin-firstlovecenter.imfast.io/Neo4j%20Test%20Data/Members.csv" as line
CREATE (m:Member {whatsappNumber:line.`WhatsApp Number (if different)`})
	SET 
    m.memberID = apoc.create.uuid(),
    m.middleName = line.`Other Names`,
    m.firstName = apoc.text.capitalizeAll(toLower(trim(line.`First Name`))),
    m.lastName = apoc.text.capitalizeAll(toLower(trim(line.`Last Name`))),
    m.phoneNumber = line.`Phone Number`,
    m.areaOfResidence = line.`Area of Residence`,
    m.pictureUrl   = line.pictureUrl
   
MERGE(g: Gender {gender: apoc.text.capitalizeAll(toLower(trim(line.Gender)))})
MERGE(m)-[:HAS_GENDER]->(g)	

MERGE(ms: MaritalStatus {status: apoc.text.capitalizeAll(toLower(trim(line.`Marital Status`)))})
MERGE(m)-[:HAS_MARITAL_STATUS]->(ms)

with line, m  WHERE line.`Ministry` is not null
MERGE(son: Ministry {name:line.`Ministry`})
    ON CREATE SET 
    son.ministryID = apoc.create.uuid()
MERGE(m)-[:BELONGS_TO_MINISTRY]->(son);

LOAD CSV WITH HEADERS FROM "https://admin-firstlovecenter.imfast.io/Neo4j%20Test%20Data/Members.csv" as line
with line WHERE line.`Centre Code` is not null
MATCH (m:Member {whatsappNumber: line.`WhatsApp Number (if different)`})
MERGE (cen:Centre {code:  line.`Centre Code`})
MERGE (m)-[:BELONGS_TO_CENTRE]->(cen);

LOAD CSV WITH HEADERS FROM "https://admin-firstlovecenter.imfast.io/Neo4j%20Test%20Data/Members.csv" as line
WITH line WHERE line.`Date of Birth` is not null
MATCH (m:Member {whatsappNumber: line.`WhatsApp Number (if different)`})
MERGE (dob: TimeGraph {date: date("1993-07-18")})
MERGE (m)-[:WAS_BORN_ON]->(dob)
RETURN dob;

LOAD CSV WITH HEADERS FROM "https://admin-firstlovecenter.imfast.io/Neo4j%20Test%20Data/Members.csv" as line
WITH line WHERE line.Occupation is not null
MATCH (m:Member {whatsappNumber: line.`WhatsApp Number (if different)`})
MERGE(occ:Occupation {occupation: line.Occupation})
MERGE(m)-[:HAS_OCCUPATION]->(occ);

// Create the Churches with 
LOAD CSV WITH HEADERS FROM "https://admin-firstlovecenter.imfast.io/Neo4j%20Test%20Data/Centres-Table%20Town.csv" as line
MERGE(t:Town {name: apoc.text.capitalizeAll(toLower(trim(line.`TOWN`)))})
    ON CREATE SET 
	t.townID = apoc.create.uuid()

with line,t
MATCH (m: Member {lastName: line.`APOSTLE`})
MERGE (title: Title{title:'Apostle'})
MERGE (m)-[:HAS_TITLE]-> (title)
MERGE (t)<-[:HAS_TOWN]-(m)

with line WHERE line.COMMUNITY is not null
MERGE(C: Community {name: apoc.text.capitalizeAll(toLower(trim(line.COMMUNITY)))})
	ON CREATE SET
    C.communityID = apoc.create.uuid()

    with line, C
    MATCH (t: Town {name: apoc.text.capitalizeAll(toLower(trim(line.`TOWN`))) })
    MERGE(t)-[:HAS_COMMUNITY]->(C)

with line, C  WHERE line.`CENTRE NAME` is not null
MERGE(cen: Centre {code: line.`SERVICE CODE`})
	SET 
    cen.centreID = apoc.create.uuid(),
    cen.name = apoc.text.capitalizeAll(toLower(trim(line.`CENTRE NAME`))),
    cen.location = point({latitude:toFloat(line.LATITUDE), longitude:toFloat(line.LONGITUDE), crs:'WGS-84'})
    
MERGE (cen)<-[:HAS_CENTRE]-(C)
MERGE (l:Member {whatsappNumber: line.`PHONE NUMBER`})
MERGE (l)-[:LEADS_CENTRE]->(cen)

with line,cen
MERGE(sDay: ServiceDay {day: apoc.text.capitalizeAll(toLower(line.`SERVICE DAY`))} )
MERGE (sDay)<-[:MEETS_ON_DAY]-(cen);

LOAD CSV WITH HEADERS FROM "https://admin-firstlovecenter.imfast.io/Neo4j%20Test%20Data/Centres-Table%20Campus.csv" as line
MERGE(camp:Campus {name: apoc.text.capitalizeAll(toLower(trim(line.`CAMPUS`)))})
    ON CREATE SET 
	camp.campusID = apoc.create.uuid()

with line,camp
MATCH (m: Member {lastName: line.`APOSTLE`})
MERGE (title: Title{title:'Apostle'})
MERGE (m)-[:HAS_TITLE]-> (title)
MERGE (camp)<-[:HAS_CAMPUS]-(m)

with line WHERE line.HALL is not null
MERGE(C: Hall {name: apoc.text.capitalizeAll(toLower(trim(line.HALL)))})
	ON CREATE SET
    C.hallID = apoc.create.uuid()

    with line, C
    MATCH (t: Campus {name: apoc.text.capitalizeAll(toLower(trim(line.`CAMPUS`))) })
    MERGE(t)-[:HAS_HALL]->(C)

with line, C  WHERE line.`CENTRE NAME` is not null
MERGE(cen: Centre{code: line.`SERVICE CODE`})
	SET 
    cen.centreID = apoc.create.uuid(),
    cen.name = apoc.text.capitalizeAll(toLower(trim(line.`CENTRE NAME`))),
    cen.location = point({latitude:toFloat(line.LATITUDE), longitude:toFloat(line.LONGITUDE), crs:'WGS-84'})
    
MERGE (cen)<-[:HAS_CENTRE]-(C)
MERGE (l:Member {whatsappNumber: line.`PHONE NUMBER`})
MERGE (l)-[:LEADS_CENTRE]->(cen)

with line,cen
MERGE(sDay: ServiceDay {day: apoc.text.capitalizeAll(toLower(line.`SERVICE DAY`))} )
MERGE (sDay)<-[:MEETS_ON_DAY]-(cen);

LOAD CSV WITH HEADERS FROM "https://admin-firstlovecenter.imfast.io/Neo4j%20Test%20Data/Communities.csv" as line
MATCH (m:Member {whatsappNumber: line.`Whatsapp Number`})
MATCH (com: Community {name:apoc.text.capitalizeAll(toLower(trim(line.`Community`)))})
MERGE (m)-[:LEADS_COMMUNITY]->(com)
RETURN m,com;

LOAD CSV WITH HEADERS FROM "https://admin-firstlovecenter.imfast.io/Neo4j%20Test%20Data/Halls.csv" as line
MATCH (m:Member {whatsappNumber: line.`Whatsapp Number`})
MATCH (com: Hall {name:apoc.text.capitalizeAll(toLower(trim(line.`Hall`)))})
MERGE (m)-[:LEADS_HALL]->(com)
RETURN m,com;

LOAD CSV WITH HEADERS FROM "https://admin-firstlovecenter.imfast.io/Neo4j%20Test%20Data/Towns.csv" as line WITH line WHERE line.`Whatsapp Number` IS NOT NULL
MERGE (m:Member {whatsappNumber: line.`Whatsapp Number`})

with line,m
MERGE (t:Town {name:apoc.text.capitalizeAll(toLower(trim(line.`TOWN`)))})
MERGE (m)-[:LEADS_TOWN]->(t)
RETURN m,t;

LOAD CSV WITH HEADERS FROM "https://admin-firstlovecenter.imfast.io/Neo4j%20Test%20Data/Campuses.csv" as line WITH line WHERE line.`Whatsapp Number` IS NOT NULL
MERGE (m:Member {whatsappNumber: line.`Whatsapp Number`})

with line,m
MERGE (t:Campus {name:apoc.text.capitalizeAll(toLower(trim(line.`CAMPUS`)))})
MERGE (m)-[:LEADS_CAMPUS]->(t)
RETURN m,t;


// Sonta Relationships
LOAD CSV WITH HEADERS FROM "https://admin-firstlovecenter.imfast.io/Neo4j%20Test%20Data/Sonta%20Town.csv" as line
MATCH (m:Member {whatsappNumber: line.`Whatsapp Number`})

with line,m
MERGE (sonta: Sonta {name: apoc.text.capitalizeAll(toLower(trim(line.`TOWN`)))+" "+line.Sonta})
MERGE (m)-[:LEADS_SONTA]->(sonta)

with line, m,sonta
MATCH (t: Town {name: apoc.text.capitalizeAll(toLower(trim(line.`TOWN`)))})
MERGE (t)-[:HAS_SONTA]->(sonta)
RETURN m;

LOAD CSV WITH HEADERS FROM "https://admin-firstlovecenter.imfast.io/Neo4j%20Test%20Data/Sonta%20Campus.csv" as line
MATCH (m:Member {whatsappNumber: line.`Whatsapp Number`})

with line,m
MERGE (sonta: Sonta {name: apoc.text.capitalizeAll(toLower(trim(line.`CAMPUS`)))+" "+line.Sonta})
MERGE (m)-[:LEADS_SONTA]->(sonta)

with line, m,sonta
MATCH (t: Campus {name: apoc.text.capitalizeAll(toLower(trim(line.`CAMPUS`)))})
MERGE (t)-[:HAS_SONTA]->(sonta)
RETURN m;

LOAD CSV WITH HEADERS FROM "https://admin-firstlovecenter.imfast.io/Neo4j%20Test%20Data/Basonta%20Town.csv" as line
MATCH (m:Member {whatsappNumber: line.`Whatsapp Number`})

with line,m
MERGE (sonta: Basonta {name: apoc.text.capitalizeAll(toLower(trim(line.`COMMUNITY`)))+" "+line.Sonta})
MERGE (m)-[:LEADS_BASONTA]->(sonta)

with line, m,sonta
MATCH (t: Community {name: apoc.text.capitalizeAll(toLower(trim(line.`COMMUNITY`)))})
MERGE (t)-[:HAS_BASONTA]->(sonta)
RETURN m;

LOAD CSV WITH HEADERS FROM "https://admin-firstlovecenter.imfast.io/Neo4j%20Test%20Data/Basonta%20Campus.csv" as line
MATCH (m:Member {whatsappNumber: line.`Whatsapp Number`})

with line,m
MERGE (sonta: Basonta {name: apoc.text.capitalizeAll(toLower(trim(line.`HALL`)))+" "+line.Sonta})
MERGE (m)-[:LEADS_BASONTA]->(sonta)

with line, m,sonta
MATCH (t: Hall {name: apoc.text.capitalizeAll(toLower(trim(line.`HALL`)))})
MERGE (t)-[:HAS_BASONTA]->(sonta)
RETURN t;

//Light Touch Ups
//Connecting Sontas to Ministries
MATCH (m:Ministry) 
MATCH (s:Sonta) 
WHERE s.name CONTAINS m.name
MERGE (m)-[:HAS_SONTA]->(s)
RETURN m,s;

//Connecting Sontas to Towns
MATCH (s:Sonta)
MATCH (t:Town) WHERE s.name CONTAINS t.name
MERGE (t)-[:HAS_SONTA]->(s)
RETURN t,s;

//Basonta to Hall and Community
MATCH (b:Basonta)
MATCH (h:Hall) WHERE b.name CONTAINS h.name
MERGE (h)-[:HAS_BASONTA]->(b)
RETURN h,b;

MATCH (b:Basonta)
MATCH (c:Community) WHERE b.name CONTAINS c.name
MERGE (c)-[:HAS_BASONTA]->(b)
RETURN c,b;

MATCH (b:Basonta)
MATCH (s:Sonta)
MATCH (s)<-[:HAS_SONTA]-(m:Ministry)
MATCH (s)<-[:HAS_SONTA]-()-[:HAS_COMMUNITY|:HAS_HALL]->()-[:HAS_BASONTA]->(b)
WHERE b.name CONTAINS m.name
MERGE (s)-[r:HAS_BASONTA]->(b)
RETURN r;