//Delete all Entries
call apoc.periodic.iterate("MATCH (n) return n", "DETACH DELETE n", {batchSize:1000})
yield batches, total return batches, total;

//Import Bishops data
LOAD CSV WITH HEADERS FROM "https://docs.google.com/spreadsheets/d/e/2PACX-1vQux_Dxr5gR6v8JiJvBtFRm997O9PJEhRhdHduHA5arLyP96PrxvtYCbGMNf3qRcUTRe2O94TrdPtPf/pub?gid=1980829198&single=true&output=csv" as line
CREATE (m:Member {whatsappNumber:line.`WhatsApp Number (if different)`})
	SET 
    m.id = apoc.create.uuid(),
    m.middleName = line.`Other Names`,
    m.firstName = apoc.text.capitalizeAll(toLower(trim(line.`First Name`))),
    m.lastName = apoc.text.capitalizeAll(toLower(trim(line.`Last Name`))),
    m.phoneNumber = line.`Phone Number`,
    m.areaOfResidence = line.`Area of Residence`,
    m.emailAddress = line.`Email`,
    m.pictureUrl   = line.pictureUrl

   
with line,m WHERE line.Gender is not null
MERGE(g: Gender {gender: line.Gender})
MERGE(m)-[:HAS_GENDER]->(g)

with line,m WHERE line.`Marital Status` is not null
MERGE (ms: MaritalStatus {status: line.`Marital Status`})
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

with line,m WHERE line.`Centre Code` is not null
MERGE (b:Bacenta {code:  line.`Centre Code`})
MERGE (m)-[:BELONGS_TO]->(b)

WITH line,m
WHERE line.Occupation is not null
// MATCH (m:Member {whatsappNumber: line.`WhatsApp Number (if different)`})
MERGE(O:Occupation {occupation: line.Occupation})
MERGE(m)-[:HAS_OCCUPATION]->(O);

CREATE CONSTRAINT ON (m:Member) ASSERT m.id IS UNIQUE;
CREATE CONSTRAINT ON (b:Bacenta) ASSERT b.id IS UNIQUE;
CREATE CONSTRAINT ON (b:Centre) ASSERT b.id IS UNIQUE;
CREATE CONSTRAINT ON (b:Town) ASSERT b.id IS UNIQUE;
CREATE CONSTRAINT ON (b:Campus) ASSERT b.id IS UNIQUE;
CREATE CONSTRAINT ON (b:HistoryLog) ASSERT b.id IS UNIQUE;
CREATE CONSTRAINT ON (b:Ministry) ASSERT b.id IS UNIQUE;
CREATE CONSTRAINT ON (b:Sonta) ASSERT b.id IS UNIQUE;

CREATE CONSTRAINT ON (m:Member) ASSERT m.whatsappNumber IS UNIQUE;
CREATE CONSTRAINT ON (m:Member) ASSERT m.email IS UNIQUE;
CREATE INDEX FOR (n:Member) ON (n.firstName);
CREATE INDEX FOR (n:Member) ON (n.lastName);
CREATE INDEX FOR (n:Bacenta) ON (n.name);
CREATE INDEX FOR (n:Centre) ON (n.name);
CREATE INDEX FOR (n:Campus) ON (n.name);
CREATE INDEX FOR (n:Town) ON (n.name);
CREATE INDEX FOR (n:Sonta) ON (n.name);
CREATE INDEX FOR (n:TimeGraph) ON (n.date);

 
// Create the Members
LOAD CSV WITH HEADERS FROM "https://docs.google.com/spreadsheets/d/e/2PACX-1vTlR9HQjNMNVpi1qtn2RK9PL47Y8hipuf3nIyrb5QZArLckhkErQYwwRdF71mLhISZO0-YonYwzu6xX/pub?output=csv" as line
MERGE (m:Member {whatsappNumber: line.`WhatsApp Number (if different)`})
	ON CREATE SET 
    m.id = apoc.create.uuid(),
    m.firstName = line.`First Name`,
    m.middleName = line.`Other Names`,
    m.lastName = line.`Last Name`,
    m.phoneNumber = line.`Phone Number`,
    m.areaOfResidence = line.`Area of Residence`,
    m.email = line.`Email`,
    m.pictureUrl = line.picture

with line,m WHERE line.Gender is not null
MERGE(g: Gender {gender: line.Gender})
MERGE(m)-[:HAS_GENDER]->(g)

with line,m WHERE line.`Marital Status` is not null
MERGE (ms: MaritalStatus {status: line.`Marital Status`})
MERGE(m)-[:HAS_MARITAL_STATUS]->(ms);

LOAD CSV WITH HEADERS FROM "https://docs.google.com/spreadsheets/d/e/2PACX-1vTlR9HQjNMNVpi1qtn2RK9PL47Y8hipuf3nIyrb5QZArLckhkErQYwwRdF71mLhISZO0-YonYwzu6xX/pub?output=csv" as line
MATCH (m:Member {whatsappNumber: line.`WhatsApp Number (if different)`})
with line,m WHERE line.`Centre Code` is not null
MERGE (b:Bacenta {code:  line.`Centre Code`})
MERGE (m)-[:BELONGS_TO]->(b);

LOAD CSV WITH HEADERS FROM "https://docs.google.com/spreadsheets/d/e/2PACX-1vTlR9HQjNMNVpi1qtn2RK9PL47Y8hipuf3nIyrb5QZArLckhkErQYwwRdF71mLhISZO0-YonYwzu6xX/pub?output=csv" as line
MATCH (m:Member {whatsappNumber: line.`WhatsApp Number (if different)`})
with line, m  WHERE line.`Ministry` is not null
MERGE(son: Ministry {name:line.`Ministry`})
 ON CREATE SET 
    son.id = apoc.create.uuid()
MERGE(m)-[:BELONGS_TO]->(son);

LOAD CSV WITH HEADERS FROM "https://docs.google.com/spreadsheets/d/e/2PACX-1vTlR9HQjNMNVpi1qtn2RK9PL47Y8hipuf3nIyrb5QZArLckhkErQYwwRdF71mLhISZO0-YonYwzu6xX/pub?output=csv" as line
MATCH (m:Member {whatsappNumber: line.`WhatsApp Number (if different)`})
WITH line,m WHERE line.Occupation is not null
MERGE(O:Occupation {occupation: line.Occupation})
MERGE(m)-[:HAS_OCCUPATION]->(O);

LOAD CSV WITH HEADERS FROM "https://docs.google.com/spreadsheets/d/e/2PACX-1vTlR9HQjNMNVpi1qtn2RK9PL47Y8hipuf3nIyrb5QZArLckhkErQYwwRdF71mLhISZO0-YonYwzu6xX/pub?output=csv" as line
WITH line WHERE line.`Date of Birth` is not null
CREATE  (dob: TimeGraph {date: date(line.`Date of Birth`)});


LOAD CSV WITH HEADERS FROM "https://docs.google.com/spreadsheets/d/e/2PACX-1vTlR9HQjNMNVpi1qtn2RK9PL47Y8hipuf3nIyrb5QZArLckhkErQYwwRdF71mLhISZO0-YonYwzu6xX/pub?output=csv" as line
WITH line WHERE line.`Date of Birth` is not null
MATCH (m:Member {whatsappNumber: line.`WhatsApp Number (if different)`})
MATCH (dob: TimeGraph {date: date(line.`Date of Birth`)})
CREATE (m)-[:WAS_BORN_ON]->(dob);

// Create the Churches with 
LOAD CSV WITH HEADERS FROM "https://docs.google.com/spreadsheets/d/e/2PACX-1vTOjWaKQk38jZYy0hASTI_hSRZR99AC9RJ-AP1YSvks8bex_v7KRI_81uwSriazP2xKSbq6QHVENvZa/pub?output=csv" as line
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

LOAD CSV WITH HEADERS FROM "https://docs.google.com/spreadsheets/d/e/2PACX-1vTJia_j9M49dOptu6pjg3f8Q12CiPSyNjkBkFgD_TKxpofnKUNH-C-y2pwRnAaGbdGy3cYHo9jBZ1EI/pub?output=csv" as line
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

LOAD CSV WITH HEADERS FROM "https://docs.google.com/spreadsheets/d/e/2PACX-1vTu60_Lgyo45by9Ax3xEd02f2QDpRCP0FDtMrUcqjAZWAABVeHrlx9tZWk9mCLTX-E8GEUOBPOyYlFd/pub?output=csv" as line
MATCH (m:Member {whatsappNumber: line.`Whatsapp Number`})
MATCH (com: Centre {name:apoc.text.capitalizeAll(toLower(trim(line.`Community`)))})
MERGE (m)-[:LEADS]->(com)
RETURN m,com;

LOAD CSV WITH HEADERS FROM "https://docs.google.com/spreadsheets/d/e/2PACX-1vTN7_EZByGWry2Ozga-Kw4sgsI8tG31KM2s6TjmwpMNVkfFqfTfed61FtaWwOnJH0Ryrp3MSjS5zr1T/pub?output=csv" as line
MATCH (m:Member {whatsappNumber: line.`Whatsapp Number`})
MATCH (com: Centre {name:apoc.text.capitalizeAll(toLower(trim(line.`Hall`)))})
MERGE (m)-[:LEADS]->(com)
RETURN m,com;

LOAD CSV WITH HEADERS FROM "https://docs.google.com/spreadsheets/d/e/2PACX-1vQre5JdM9A2MCmT1ykinqPDr7-_j3j7ggs9Mcg3CSZsDPy_WM28UqHr0tHicnsr6TSeg1GuxEhd8E_i/pub?output=csv" as line WITH line WHERE line.`Whatsapp Number` IS NOT NULL
MERGE (m:Member {whatsappNumber: line.`Whatsapp Number`})
ON CREATE SET 
    m.id=apoc.create.uuid()

with line,m
MERGE (t:Town {name:apoc.text.capitalizeAll(toLower(trim(line.`TOWN`)))})
MERGE (m)-[:LEADS]->(t)
RETURN m,t;

LOAD CSV WITH HEADERS FROM "https://docs.google.com/spreadsheets/d/e/2PACX-1vQEMAIhCR5zE05pLxJY-PuhXO-vus2qZVi9mGsOyBl0QYQCIZXMN9-5jeyiMtHSfWye-1eIrjUr5P1f/pub?output=csv" as line WITH line WHERE line.`Whatsapp Number` IS NOT NULL
MERGE (m:Member {whatsappNumber: line.`Whatsapp Number`})
ON CREATE SET 
    m.id=apoc.create.uuid()

with line,m
MERGE (t:Campus {name:apoc.text.capitalizeAll(toLower(trim(line.`CAMPUS`)))})
MERGE (m)-[:LEADS]->(t)
RETURN m,t;

 

//Q3 Sonta Relationships
LOAD CSV WITH HEADERS FROM "https://docs.google.com/spreadsheets/d/e/2PACX-1vS6pP1yi3femY5GtlJUTCxEoBwPn-f9jovWz7paFeUZDAgPVsm1CisoV1b9llglNyj8bqnc-jD7igT_/pub?output=csv" as line
MATCH (m:Member {whatsappNumber: line.`Whatsapp Number`})

with line,m
MERGE (sonta: Sonta {name: apoc.text.capitalizeAll(toLower(trim(line.`TOWN`)))+" "+line.Sonta})
ON CREATE SET sonta.id = apoc.create.uuid()
MERGE (m)-[:LEADS]->(sonta)

with line, m,sonta
MATCH (t: Town {name: apoc.text.capitalizeAll(toLower(trim(line.`TOWN`)))})
MERGE (t)-[:HAS_SONTA]->(sonta)
RETURN m;

LOAD CSV WITH HEADERS FROM "https://docs.google.com/spreadsheets/d/e/2PACX-1vQD-0Y31CXLBh4m9Ce1cQvfc-jcgNqaYPZ5W2NrKFxHntzeKNc5q0kIfHqj5vNskN9gPfG4GpYlBo-r/pub?output=csv" as line
MATCH (m:Member {whatsappNumber: line.`Whatsapp Number`})

with line,m
MERGE (sonta: Sonta {name: apoc.text.capitalizeAll(toLower(trim(line.`CAMPUS`)))+" "+line.Sonta})
ON CREATE SET sonta.id = apoc.create.uuid()
MERGE (m)-[:LEADS]->(sonta)

with line, m,sonta
MATCH (t: Campus {name: apoc.text.capitalizeAll(toLower(trim(line.`CAMPUS`)))})
MERGE (t)-[:HAS_SONTA]->(sonta)
RETURN m;

LOAD CSV WITH HEADERS FROM "https://docs.google.com/spreadsheets/d/e/2PACX-1vRQa8RtmkUsLrSMZStlZdrBKLXRS_1_N3B1lFtGETAtO9ToLd4WcoVUF86EkzyC_IGKsHnK9P2i_foO/pub?output=csv" as line
MATCH (m:Member {whatsappNumber: line.`Whatsapp Number`})

with line,m
MERGE (sonta: Basonta {name: apoc.text.capitalizeAll(toLower(trim(line.`COMMUNITY`)))+" "+line.Sonta})
ON CREATE SET sonta.id = apoc.create.uuid()
MERGE (m)-[:LEADS]->(sonta)

with line, m,sonta
MATCH (t: Centre {name: apoc.text.capitalizeAll(toLower(trim(line.`COMMUNITY`)))})
MERGE (t)-[:HAS_BASONTA]->(sonta)
RETURN m;

LOAD CSV WITH HEADERS FROM "https://docs.google.com/spreadsheets/d/e/2PACX-1vR9m4SljU8402PGFjYdVwMHtqe_NgWRD8Xx2ox_Xw0SBk0GzifP-2rWxS2Vg6HWKPaZZTJHQsTX2ZNL/pub?output=csv" as line
MATCH (m:Member {whatsappNumber: line.`Whatsapp Number`})

with line,m
MERGE (sonta: Basonta {name: apoc.text.capitalizeAll(toLower(trim(line.`HALL`)))+" "+line.Sonta})
ON CREATE SET sonta.id = apoc.create.uuid()
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

// Create Title Options
CREATE (p:Title{title:"Pastor"})
CREATE (r:Title{title:"Reverend"})
RETURN p,r;

DROP CONSTRAINT ON (m:Member) ASSERT m.id IS UNIQUE;
DROP CONSTRAINT ON (b:Bacenta) ASSERT b.id IS UNIQUE;
DROP CONSTRAINT ON (b:Centre) ASSERT b.id IS UNIQUE;
DROP CONSTRAINT ON (b:Town) ASSERT b.id IS UNIQUE;
DROP CONSTRAINT ON (b:Campus) ASSERT b.id IS UNIQUE;
// DROP CONSTRAINT ON (m:Member) ASSERT m.whatsappNumber IS UNIQUE;
DROP INDEX FOR (n:Member) ON (n.whatsappNumber);
DROP INDEX FOR (n:TimeGraph) ON (n.date);