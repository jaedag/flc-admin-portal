
//Delete all Entries
call apoc.periodic.iterate("MATCH (n) return n", "DETACH DELETE n", {batchSize:1000})
yield batches, total return batches, total;

//Import Bishops data
LOAD CSV WITH HEADERS FROM "file:///Bishops.csv" as line
CREATE (m:Member {whatsappNumber:line.`WhatsApp Number (if different)`})
	SET 
    m.id = apoc.create.uuid(),
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
    son.id = apoc.create.uuid()
MERGE(m)-[:BELONGS_TO]->(son)

WITH line,m
WHERE line.`Date of Birth`is not null
// MATCH (m:Member {whatsappNumber:line.`WhatsApp Number (if different)`})
MERGE (dob: TimeGraph {date: date(line.`Date of Birth`)})
MERGE (m)-[:WAS_BORN_ON]->(dob)

WITH line,m
WHERE line.Occupation is not null
// MATCH (m:Member {whatsappNumber: line.`WhatsApp Number (if different)`})
MERGE(O:Occupation {occupation: line.Occupation})
MERGE(m)-[:HAS_OCCUPATION]->(O);

CREATE CONSTRAINT ON (m:Member) ASSERT m.id IS UNIQUE;
CREATE CONSTRAINT ON (b:Bacenta) ASSERT b.id IS UNIQUE;
// CREATE CONSTRAINT ON (m:Member) ASSERT m.whatsappNumber IS UNIQUE;
CREATE INDEX ON :Member(whatsappNumber);

// Create the Members

LOAD CSV WITH HEADERS FROM "file:///Members.csv" as line
CREATE (m:Member {id: apoc.create.uuid()})
	SET 
    m.firstName = line.`First Name`,
    m.middleName = line.`Other Names`,
    m.lastName = line.`Last Name`,
    m.phoneNumber = line.`Phone Number`,
    m.whatsappNumber = line.`WhatsApp Number (if different)`,
    m.areaOfResidence = line.`Area of Residence`,
    m.pictureUrl = line.picture

with line,m WHERE line.Gender is not null
MERGE(g: Gender {gender: line.Gender})
MERGE(m)-[:HAS_GENDER]->(g)

with line,m WHERE line.`Marital Status` is not null
MERGE (ms: MaritalStatus {status: line.`Marital Status`})
MERGE(m)-[:HAS_MARITAL_STATUS]->(ms)

with line,m WHERE line.`Centre Code` is not null
MERGE (b:Bacenta {code:  line.`Centre Code`})
MERGE (m)-[:BELONGS_TO]->(b)

with line, m  WHERE line.`Ministry` is not null
MERGE(son: Ministry {name:line.`Ministry`})
MERGE(m)-[:BELONGS_TO]->(son)

WITH line WHERE line.`Date of Birth`is not null
MATCH (m:Member {whatsappNumber: line.`WhatsApp Number (if different)`})
MERGE (dob: TimeGraph {date: date(line.`Date of Birth`)})
MERGE (m)-[:WAS_BORN_ON]->(dob)

// LOAD CSV WITH HEADERS FROM "file:///Members.csv" as line 
WITH line
WHERE line.Occupation is not null
MATCH (m:Member {whatsappNumber: line.`WhatsApp Number (if different)`})
MERGE(O:Occupation {occupation: line.Occupation})
MERGE(m)-[:HAS_OCCUPATION]->(O);


//Import Data from Pastors
LOAD CSV WITH HEADERS FROM "file:///Pastors.csv" as line
MERGE (m:Member {whatsappNumber: line.`Mobile`})
	SET 
    m.id = apoc.create.uuid(),
    m.firstName = line.`First  Name`,
    m.middleName = line.`Middlename`,
    m.lastName = line.`Last  Name`,
    m.phoneNumber = line.`Phone Number`,
    m.email = line.`Emailaddress`,
    m.areaOfResidence = line.`Area of Residence`

with line,m WHERE line.Gender is not null
MERGE(g: Gender {gender: line.Gender})
MERGE(m)-[:HAS_GENDER]->(g)


with line,m WHERE line.`Marital Status (Single/Married/Divorced/Widow/Widower)` is not null
MERGE (ms: MaritalStatus {status: line.`Marital Status (Single/Married/Divorced/Widow/Widower)`})
MERGE(m)-[:HAS_MARITAL_STATUS]->(ms)

WITH line,m
WHERE line.`Date Of Birth (Dd/Mm/Yyyy)`is not null
MERGE (dob: TimeGraph {date: date(line.`Date Of Birth (Dd/Mm/Yyyy)`)})
MERGE (m)-[:WAS_BORN_ON]->(dob)

WITH line,m WHERE line.Occupation is not null
MERGE(O:Occupation {occupation: line.Occupation})
MERGE(m)-[:HAS_OCCUPATION]->(O)

WITH line,m
MERGE (t:Title {title: 'Pastor'})
MERGE (m)-[r:HAS_TITLE]->(t)
SET 
r.yearAppointed = date(line.`Year Appointed`),
r.status = line.`Pastorstatus`;

// Create the Churches with 
LOAD CSV WITH HEADERS FROM "file:///Centres-Table%20Town.csv" as line
MERGE(t:Town {name: apoc.text.capitalizeAll(toLower(trim(line.`TOWN`)))})
    ON CREATE SET 
	t.id = apoc.create.uuid()

with line,t
MATCH (m: Member {whatsappNumber: line.`APOSTLE`})
MERGE (title: Title{title:'Bishop'})
MERGE (m)-[:HAS_TITLE]-> (title)
MERGE (t)<-[:HAS_TOWN]-(m)

with line WHERE line.COMMUNITY is not null
MERGE(C: Centre {name: apoc.text.capitalizeAll(toLower(trim(line.COMMUNITY)))})
	ON CREATE SET
    C.id = apoc.create.uuid()

    with line, C
    MATCH (t: Town {name: apoc.text.capitalizeAll(toLower(trim(line.`TOWN`))) })
    MERGE(t)-[:HAS_CENTRE]->(C)

with line, C  WHERE line.`CENTRE NAME` is not null
MERGE(b: Bacenta {code: line.`SERVICE CODE`})
	SET 
    b.id = apoc.create.uuid(),
    b.name = apoc.text.capitalizeAll(toLower(trim(line.`CENTRE NAME`))),
    b.location = point({latitude:toFloat(line.LATITUDE), longitude:toFloat(line.LONGITUDE), crs:'WGS-84'})
    
MERGE (b)<-[:HAS_BACENTA]-(C)
MERGE (l:Member {whatsappNumber: line.`PHONE NUMBER`})
MERGE (l)-[:LEADS]->(b)

with line,b
MERGE(sDay: ServiceDay {day: apoc.text.capitalizeAll(toLower(line.`SERVICE DAY`))} )
MERGE (sDay)<-[:MEETS_ON_DAY]-(b);

LOAD CSV WITH HEADERS FROM "file:///Centres-Table%20Campus.csv" as line
MERGE(camp:Campus {name: apoc.text.capitalizeAll(toLower(trim(line.`CAMPUS`)))})
    ON CREATE SET 
	camp.id = apoc.create.uuid()

with line,camp
MATCH (m: Member {whatsappNumber: line.`APOSTLE`})
MERGE (title: Title{title:'Bishop'})
MERGE (m)-[:HAS_TITLE]-> (title)
MERGE (camp)<-[:HAS_CAMPUS]-(m)

with line WHERE line.HALL is not null
MERGE(C: Centre {name: apoc.text.capitalizeAll(toLower(trim(line.HALL)))})
	ON CREATE SET
    C.id = apoc.create.uuid()

    with line, C
    MATCH (t: Campus {name: apoc.text.capitalizeAll(toLower(trim(line.`CAMPUS`))) })
    MERGE(t)-[:HAS_CENTRE]->(C)

with line, C  WHERE line.`CENTRE NAME` is not null
MERGE(b: Bacenta {code: line.`SERVICE CODE`})
	SET 
    b.id = apoc.create.uuid(),
    b.name = apoc.text.capitalizeAll(toLower(trim(line.`CENTRE NAME`))),
    b.location = point({latitude:toFloat(line.LATITUDE), longitude:toFloat(line.LONGITUDE), crs:'WGS-84'})
    
MERGE (b)<-[:HAS_BACENTA]-(C)
MERGE (l:Member {whatsappNumber: line.`PHONE NUMBER`})
MERGE (l)-[:LEADS]->(b)

with line,b
MERGE(sDay: ServiceDay {day: apoc.text.capitalizeAll(toLower(line.`SERVICE DAY`))} )
MERGE (sDay)<-[:MEETS_ON_DAY]-(b);

// LOAD CSV WITH HEADERS FROM "file:///Members.csv" as line
// WITH line 
// WHERE line.`Attending Church or FLOW Church` is not null
// MATCH (m:Member {whatsappNumber: line.`WhatsApp Number (if different)`})
// MERGE(f:FlowChurch {name: line.`Attending Church or FLOW Church`})
// MERGE (m)-[:BELONGS_TO_FLOWCHURCH]->(f)
// MERGE (a:Member {firstName:'Frank',lastName:'Opoku'})
// MERGE (f)<-[:HAS_FLOW_CHURCH]-(a);

LOAD CSV WITH HEADERS FROM "file:///Communities.csv" as line
MATCH (m:Member {whatsappNumber: line.`Whatsapp Number`})
MATCH (com: Centre {name:apoc.text.capitalizeAll(toLower(trim(line.`Community`)))})
MERGE (m)-[:LEADS]->(com)
RETURN m,com;

LOAD CSV WITH HEADERS FROM "file:///Halls.csv" as line
MATCH (m:Member {whatsappNumber: line.`Whatsapp Number`})
MATCH (com: Centre {name:apoc.text.capitalizeAll(toLower(trim(line.`Hall`)))})
MERGE (m)-[:LEADS]->(com)
RETURN m,com;

LOAD CSV WITH HEADERS FROM "file:///Towns.csv" as line WITH line WHERE line.`Whatsapp Number` IS NOT NULL
MERGE (m:Member {whatsappNumber: line.`Whatsapp Number`})
ON CREATE SET 
    m.id=apoc.create.uuid()

with line,m
MERGE (t:Town {name:apoc.text.capitalizeAll(toLower(trim(line.`TOWN`)))})
MERGE (m)-[:LEADS]->(t)
RETURN m,t;

LOAD CSV WITH HEADERS FROM "file:///Campuses.csv" as line WITH line WHERE line.`Whatsapp Number` IS NOT NULL
MERGE (m:Member {whatsappNumber: line.`Whatsapp Number`})
ON CREATE SET 
    m.id=apoc.create.uuid()

with line,m
MERGE (t:Campus {name:apoc.text.capitalizeAll(toLower(trim(line.`CAMPUS`)))})
MERGE (m)-[:LEADS]->(t)
RETURN m,t;

 

//Q3 Sonta Relationships
LOAD CSV WITH HEADERS FROM "file:///Sonta%20Town.csv" as line
MATCH (m:Member {whatsappNumber: line.`Whatsapp Number`})

with line,m
MERGE (sonta: Sonta {name: apoc.text.capitalizeAll(toLower(trim(line.`TOWN`)))+" "+line.Sonta})
SET sonta.id = apoc.create.uuid()
MERGE (m)-[:LEADS]->(sonta)

with line, m,sonta
MATCH (t: Town {name: apoc.text.capitalizeAll(toLower(trim(line.`TOWN`)))})
MERGE (t)-[:HAS_SONTA]->(sonta)
RETURN m;

LOAD CSV WITH HEADERS FROM "file:///Sonta%20Campus.csv" as line
MATCH (m:Member {whatsappNumber: line.`Whatsapp Number`})

with line,m
MERGE (sonta: Sonta {name: apoc.text.capitalizeAll(toLower(trim(line.`CAMPUS`)))+" "+line.Sonta})
SET sonta.id = apoc.create.uuid()
MERGE (m)-[:LEADS]->(sonta)

with line, m,sonta
MATCH (t: Campus {name: apoc.text.capitalizeAll(toLower(trim(line.`CAMPUS`)))})
MERGE (t)-[:HAS_SONTA]->(sonta)
RETURN m;

LOAD CSV WITH HEADERS FROM "file:///Basonta%20Town.csv" as line
MATCH (m:Member {whatsappNumber: line.`Whatsapp Number`})

with line,m
MERGE (sonta: Basonta {name: apoc.text.capitalizeAll(toLower(trim(line.`COMMUNITY`)))+" "+line.Sonta})
SET sonta.id = apoc.create.uuid()
MERGE (m)-[:LEADS]->(sonta)

with line, m,sonta
MATCH (t: Centre {name: apoc.text.capitalizeAll(toLower(trim(line.`COMMUNITY`)))})
MERGE (t)-[:HAS_BASONTA]->(sonta)
RETURN m;

LOAD CSV WITH HEADERS FROM "file:///Basonta%20Campus.csv" as line
MATCH (m:Member {whatsappNumber: line.`Whatsapp Number`})

with line,m
MERGE (sonta: Basonta {name: apoc.text.capitalizeAll(toLower(trim(line.`HALL`)))+" "+line.Sonta})
SET sonta.id = apoc.create.uuid()
MERGE (m)-[:LEADS]->(sonta)

with line, m,sonta
MATCH (t: Centre {name: apoc.text.capitalizeAll(toLower(trim(line.`HALL`)))})
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
MATCH (h:Centre) WHERE b.name CONTAINS h.name
MERGE (h)-[:HAS_BASONTA]->(b)
RETURN h,b;

MATCH (b:Basonta)
MATCH (s:Sonta)
MATCH (s)<-[:HAS_SONTA]-(m:Ministry)
MATCH (s)<-[:HAS_SONTA]-()-[:HAS_CENTRE]->()-[:HAS_BASONTA]->(b)
WHERE b.name CONTAINS m.name
MERGE (s)-[r:HAS_BASONTA]->(b)
RETURN r;