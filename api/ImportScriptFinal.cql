MATCH (n)
DETACH DELETE n;

//Create Service Day options
CREATE (:ServiceDay {day:"Tuesday",dayNumber: 2})
CREATE (:ServiceDay {day:"Wednesday",dayNumber: 3})
CREATE (:ServiceDay {day:"Thursday",dayNumber: 4})
CREATE (:ServiceDay {day:"Friday",dayNumber: 5})
CREATE (:ServiceDay {day:"Saturday",dayNumber: 6})
CREATE (r:ServiceDay {day:"Sunday",dayNumber: 7})
RETURN r;

// Create Title Options
CREATE (p:Title{title:"Pastor"})
CREATE (r:Title{title:"Reverend"})
CREATE (:Title{title:"Bishop"})
RETURN p,r;

//Create Marital Options
CREATE (a:MaritalStatus {status:"Single"})
CREATE (b:MaritalStatus {status:"Married"})
RETURN a,b;

//Create Gender Options
CREATE (:Gender {gender:"Male"})
CREATE (g:Gender {gender:"Female"})
RETURN g;

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
 MERGE (title:Title{title:"Bishop"})
MERGE (m)-[:HAS_TITLE]->(title)
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

LOAD CSV WITH HEADERS FROM "http://localhost:11001/project-7c59cf57-dda9-4c33-b7b1-0bb425793d00/CampusTownImport.csv" as line WITH line WHERE line.`Constituency Stream`= "Campus"
MERGE (campus:Campus {name:trim(line.`Constituencies`)})
ON CREATE SET campus.id = apoc.create.uuid()

with campus,line
MATCH (bishop:Member) WHERE bishop.lastName = line.Bishop
MERGE (bishop)-[:HAS_CAMPUS]->(campus)
RETURN bishop;

LOAD CSV WITH HEADERS FROM "http://localhost:11001/project-7c59cf57-dda9-4c33-b7b1-0bb425793d00/CampusTownImport.csv" as line WITH line WHERE line.`Constituency Stream`= "Town"
MERGE (town:Town {name:trim(line.`Constituencies`)})
ON CREATE SET town.id = apoc.create.uuid()

with town,line
MATCH (bishop:Member) WHERE bishop.lastName = line.Bishop
MERGE (bishop)-[:HAS_TOWN]->(town)
RETURN bishop;

LOAD CSV WITH HEADERS FROM "http://localhost:11001/project-7c59cf57-dda9-4c33-b7b1-0bb425793d00/BacentaImport.csv" as line WITH line WHERE line.Bishop is NOT NULL
MERGE (centre:Centre {name:line.Centre})
ON CREATE SET centre.id = apoc.create.uuid()

WITH centre,line
MATCH (campusTown) WHERE campusTown.name=trim(line.Campus)
MERGE (campusTown)-[:HAS_CENTRE]->(centre)
RETURN campusTown;

LOAD CSV WITH HEADERS FROM "http://localhost:11001/project-7c59cf57-dda9-4c33-b7b1-0bb425793d00/BacentaImport.csv" as line WITH line WHERE line.Bishop is NOT NULL
CREATE (bacenta:Bacenta {name: line.Bacenta})
SET bacenta.id = apoc.create.uuid(),
bacenta.code = line.CODE,
bacenta.venueLatitude = line.Latitude,
bacenta.venueLongitude = line.Longitude

WITH bacenta,line
MATCH (centre:Centre) WHERE centre.name=line.Centre
MATCH (serviceDay:ServiceDay) WHERE serviceDay.day=line.`Service Day`
MERGE (centre)-[:HAS_BACENTA]->(bacenta)
MERGE (bacenta)-[:MEETS_ON]->(serviceDay)
RETURN centre;

LOAD CSV WITH HEADERS FROM "http://localhost:11001/project-7c59cf57-dda9-4c33-b7b1-0bb425793d00/BacentaImport.csv" as line WITH line WHERE line.`Phone Number` is NOT NULL
MERGE (leader:Member {whatsappNumber:line.`Phone Number`})
ON CREATE SET leader.firstName= line.`Bacenta Leader First Name`,
leader.lastName = line.`Bacenta Leader Lst Name`,
leader.id = apoc.create.uuid()

WITH leader,line
MATCH (bacenta:Bacenta) WHERE bacenta.name = line.Bacenta
MERGE (leader)-[:LEADS]->(bacenta);

LOAD CSV WITH HEADERS FROM "http://localhost:11001/project-7c59cf57-dda9-4c33-b7b1-0bb425793d00/CentreImport.csv" as line WITH line WHERE line.`Centre Leader Phone Number` is NOT NULL
MERGE (leader:Member {whatsappNumber:line.`Centre Leader Phone Number`})
ON CREATE SET leader.firstName = line.`Centre Leader First Name`,
leader.lastName = line.`Centre Leader Last Name`,
leader.id = apoc.create.uuid()

WITH leader,line
MATCH (centre:Centre) WHERE centre.name = line.`Centre Name`
MERGE (leader)-[:LEADS]->(centre)
RETURN leader;

LOAD CSV WITH HEADERS FROM "http://localhost:11001/project-7c59cf57-dda9-4c33-b7b1-0bb425793d00/CampusTownImport.csv" as line WITH line WHERE line.Constituencies is NOT NULL
MERGE (leader:Member {whatsappNumber:line.`CO Phone Number`})
ON CREATE SET leader.firstName = line.`CO First Name`,
leader.lastName = line.`CO Last Name`,
leader.id = apoc.create.uuid()

WITH line,leader
MATCH (campusTown) WHERE campusTown.name = line.Constituencies 
MERGE (leader)-[:LEADS]->(campusTown)
RETURN campusTown;


LOAD CSV WITH HEADERS FROM "http://localhost:11001/project-7c59cf57-dda9-4c33-b7b1-0bb425793d00/CampusTownImport.csv" as line WITH line WHERE line.Admin is NOT NULL

MERGE (admin:Member {emailAddress:line.`Admin Email Address`})
ON CREATE SET admin.firstName = line.`Admin`,
admin.id = apoc.create.uuid()

WITH line,admin
MATCH (campusTown) WHERE campusTown.name = line.Constituencies 
MERGE (admin)-[:IS_ADMIN_FOR]->(campusTown)
RETURN campusTown;

LOAD CSV WITH HEADERS FROM "http://localhost:11001/project-7c59cf57-dda9-4c33-b7b1-0bb425793d00/bishopsAdmins.csv" as line WITH line WHERE line.Admin is NOT NULL
MERGE (admin:Member {emailAddress:line.`Admin Email Address`})
ON CREATE SET admin.firstName = line.`Admin`,
admin.id = apoc.create.uuid()

WITH line,admin
MATCH (bishop:Member) WHERE bishop.lastName = line.Bishop 
MERGE (admin)-[:IS_ADMIN_FOR]->(bishop)
RETURN bishop;

MERGE (m:Member {whatsappNumber: "233264248700"})
	SET 
    m.id = apoc.create.uuid(),
    m.firstName = "John-Dag",
    m.middleName = "Nii",
    m.lastName = "Addy",
    m.phoneNumber = "233264248700",
    m.areaOfResidence = "East Legon Hills",
    m.emailAddress = "jaedagy@gmail.com",
    m.pictureUrl = "https://res.cloudinary.com/firstlovecenter/image/upload/v1618329763/admin-portal/frqkvq20g0ilfueoxb87.jpg"

WITH m
MATCH (g: Gender {gender: "Male"})
MATCH (ms: MaritalStatus {status: "Single"})
MATCH (b:Bacenta {code:  "1288"})

MERGE(m)-[:HAS_MARITAL_STATUS]->(ms)
MERGE (m)-[:BELONGS_TO]->(b)
MERGE(m)-[:HAS_GENDER]->(g)
RETURN m;