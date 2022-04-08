#### 1.1.1 (2022-04-08)

### 1.1.0 (2022-04-08)

##### Chores

*  removed console.log ([af4a3e81](https://github.com/jaedag/fl-admin-portal/commit/af4a3e81a522cc381266742d06d75d6d85bb5b27))
*  downgraded neo4j/graphql to version 2.5.9 ([3bc4d14c](https://github.com/jaedag/fl-admin-portal/commit/3bc4d14cb648ee3f76030d3ecc375a97c2cb9fb3))
*  updated version number ([ffca27de](https://github.com/jaedag/fl-admin-portal/commit/ffca27def5697dd9f7b4a5d75e039c8f025c1f09))
*  update @neo4j/graphql and graphql libraries ([26515e15](https://github.com/jaedag/fl-admin-portal/commit/26515e15ce7aa75422ba3e0368b726f686189f99))

##### Documentation Changes

*  updated CHANGELOG.md ([b4e0d2be](https://github.com/jaedag/fl-admin-portal/commit/b4e0d2be74503d3eca6b2252d754360095bd6fd7))
*  updated CHANGELOG.md ([283b5471](https://github.com/jaedag/fl-admin-portal/commit/283b54716ac37e4d87d64768becc7db58340fd4d))
*  updated CHANGELOG.md ([2e59f2e5](https://github.com/jaedag/fl-admin-portal/commit/2e59f2e5b63a6619f526b711e31156b99790539f))

##### New Features

*  implemented a feature to show who uploaded a banking slip ([36245d1e](https://github.com/jaedag/fl-admin-portal/commit/36245d1edbd55f56468e490b21308555c22d7a86))
* **arrivals:**  implemented feature for stream admins to set arrival times ([7e73aad5](https://github.com/jaedag/fl-admin-portal/commit/7e73aad50ff56f965f7ee6f70b0f290f1a4b000d))

##### Bug Fixes

*  fixed version updates script ([f3b53900](https://github.com/jaedag/fl-admin-portal/commit/f3b539002292fc743e54416eb72f06d3675e81ae))
*  admin-85 fellowships on vacation can no longer fill service forms ([d10d18e9](https://github.com/jaedag/fl-admin-portal/commit/d10d18e9af07e21dafb751aadcd0b14c8f53eeb5))
*  admin-85 implemented non-null constraints on all ID fields ([73ea92bd](https://github.com/jaedag/fl-admin-portal/commit/73ea92bd851342dbd7f9713f8be5a413b02df776))
*  admin-85 implemented error handling for banking slip submission form ([54b037af](https://github.com/jaedag/fl-admin-portal/commit/54b037affdbeb86748e0fb265e2a0c4aa79e0039))
*  correct event object incorrectly being passed in context ([b76ed9e0](https://github.com/jaedag/fl-admin-portal/commit/b76ed9e006fe4ec4e9b5f88fce737b488a1ed408))
*  upgraded @neo4j/graphql ([f4165d4a](https://github.com/jaedag/fl-admin-portal/commit/f4165d4a2c511512cd1595c18b9a576923ff0c6d))
*  downgraded neo4j/graphql lib ([e4381be7](https://github.com/jaedag/fl-admin-portal/commit/e4381be74ec34619d65a11626d59a3932fa228b9))
*  awaitign the createHandler function in graphql.js ([e6fa1fc9](https://github.com/jaedag/fl-admin-portal/commit/e6fa1fc93a0e96bf0ae845623d520c99194798bb))
*  awaitign the createHandler function in graphql.js ([be6382d5](https://github.com/jaedag/fl-admin-portal/commit/be6382d5f85de4e70dd60a03946bf7bf289b7095))
*  wrote a function to convert a time string to ISODateString ([c45a10d9](https://github.com/jaedag/fl-admin-portal/commit/c45a10d9f36c8ddcd72f4cd4e468c569664c190b))
*  rewrote the graphql.js to fix breaking change on @neo4j update ([8782858f](https://github.com/jaedag/fl-admin-portal/commit/8782858fd47a4a66c1e3df68746c8e61608bc72d))
*  updated apollo-server-lambda ([a35144d9](https://github.com/jaedag/fl-admin-portal/commit/a35144d9abaed149c1104a3c4636b48006b6fb0a))
*  fixed breaking changes on updating to @neo4j/graphql 3.0.3 ([c6e608c4](https://github.com/jaedag/fl-admin-portal/commit/c6e608c41404a0aa5c284cf3a68391b80241cf2c))
*  fixed breaking changes on updating to @neo4j/graphql 3.0.3 ([b5fdbd09](https://github.com/jaedag/fl-admin-portal/commit/b5fdbd091a50a196c75a1ed0fc1d97679bc2506e))
*  updated graphql file to use @neo4j/graphql 3.0.3 (breaking change) ([e270f888](https://github.com/jaedag/fl-admin-portal/commit/e270f88849f4f2b3860cf88339bc304080666b54))
*  tightened phoneNumber validation to prevent using a duplicate number with '+2330' syntax ([d342e0f4](https://github.com/jaedag/fl-admin-portal/commit/d342e0f46a72bec74960d5db07ce187b0b30b91f))
*  tightened phoneNumber validation to prevent using a duplicate number with '+2330' syntax ([5cf25d69](https://github.com/jaedag/fl-admin-portal/commit/5cf25d698a1ff9e3aaf609af23634c9d5ac34692))
*  added missing 'id' to leaders in ListQueries ([bf74c3d6](https://github.com/jaedag/fl-admin-portal/commit/bf74c3d6d8129552f4437bbbc072d78a99365929))
*  fixed member and church icons on search flow ([fbdba11f](https://github.com/jaedag/fl-admin-portal/commit/fbdba11f3396d994c873bb9eacae1c6a2a26fe8e))
*  fixed bug breaking the update member page ([d656aaed](https://github.com/jaedag/fl-admin-portal/commit/d656aaedf8e8f4100f1b5e7279d1d3ae46032322))
*  fixed create member submission ([56ddcf4f](https://github.com/jaedag/fl-admin-portal/commit/56ddcf4fd580cc89d2965755628e7aa84310926d))
*  improved bacenta form for non stream admins ([175d5556](https://github.com/jaedag/fl-admin-portal/commit/175d5556e3119264dbc9a242024a519299a78e6f))
*  fixed bug where emails could not be changed ([54f64770](https://github.com/jaedag/fl-admin-portal/commit/54f6477063560fcefe05070220a626e4993cd757))

##### Refactors

*  introduced custom hook usePopup to take the weight of context ([7b37b9f7](https://github.com/jaedag/fl-admin-portal/commit/7b37b9f71442be70d7e5e7f396c0c323dfeafb35))

#### 1.0.3 (2022-04-03)

##### Chores

*  updated version number ([8842ec6a](https://github.com/jaedag/fl-admin-portal/commit/8842ec6a9d2f0ad1245f4277296826c4d7194fb1))
*  update @neo4j/graphql and graphql libraries ([f6c0c814](https://github.com/jaedag/fl-admin-portal/commit/f6c0c81406799c040d610146bbc003458820897f))

##### Documentation Changes

*  updated CHANGELOG.md ([13929c11](https://github.com/jaedag/fl-admin-portal/commit/13929c116d702e47be552d75e8337bfd94fa5b0f))
*  updated CHANGELOG.md ([393a7e60](https://github.com/jaedag/fl-admin-portal/commit/393a7e60c3c3843c86bbe9d71f74589e97acd0a9))

##### Bug Fixes

*  tightened phoneNumber validation to prevent using a duplicate number with '+2330' syntax ([662096bf](https://github.com/jaedag/fl-admin-portal/commit/662096bf057b87b68b71bf63f97e384d93d40b5b))
*  added missing 'id' to leaders in ListQueries ([46be6f0d](https://github.com/jaedag/fl-admin-portal/commit/46be6f0dfafe54a776b3583f41f451ccbc098822))
*  fixed member and church icons on search flow ([e4aa088e](https://github.com/jaedag/fl-admin-portal/commit/e4aa088e74a93e366f1128a7e0a4ef7651a591c8))
*  fixed bug breaking the update member page ([d656aaed](https://github.com/jaedag/fl-admin-portal/commit/d656aaedf8e8f4100f1b5e7279d1d3ae46032322))
*  fixed create member submission ([56ddcf4f](https://github.com/jaedag/fl-admin-portal/commit/56ddcf4fd580cc89d2965755628e7aa84310926d))
*  improved bacenta form for non stream admins ([175d5556](https://github.com/jaedag/fl-admin-portal/commit/175d5556e3119264dbc9a242024a519299a78e6f))
*  fixed bug where emails could not be changed ([54f64770](https://github.com/jaedag/fl-admin-portal/commit/54f6477063560fcefe05070220a626e4993cd757))

#### 1.0.3 (2022-04-03)

##### Chores

*  update @neo4j/graphql and graphql libraries ([f6c0c814](https://github.com/jaedag/fl-admin-portal/commit/f6c0c81406799c040d610146bbc003458820897f))

##### Documentation Changes

*  updated CHANGELOG.md ([393a7e60](https://github.com/jaedag/fl-admin-portal/commit/393a7e60c3c3843c86bbe9d71f74589e97acd0a9))

##### Bug Fixes

*  tightened phoneNumber validation to prevent using a duplicate number with '+2330' syntax ([662096bf](https://github.com/jaedag/fl-admin-portal/commit/662096bf057b87b68b71bf63f97e384d93d40b5b))
*  added missing 'id' to leaders in ListQueries ([46be6f0d](https://github.com/jaedag/fl-admin-portal/commit/46be6f0dfafe54a776b3583f41f451ccbc098822))
*  fixed member and church icons on search flow ([e4aa088e](https://github.com/jaedag/fl-admin-portal/commit/e4aa088e74a93e366f1128a7e0a4ef7651a591c8))
*  fixed bug breaking the update member page ([d656aaed](https://github.com/jaedag/fl-admin-portal/commit/d656aaedf8e8f4100f1b5e7279d1d3ae46032322))
*  fixed create member submission ([56ddcf4f](https://github.com/jaedag/fl-admin-portal/commit/56ddcf4fd580cc89d2965755628e7aa84310926d))
*  improved bacenta form for non stream admins ([175d5556](https://github.com/jaedag/fl-admin-portal/commit/175d5556e3119264dbc9a242024a519299a78e6f))
*  fixed bug where emails could not be changed ([54f64770](https://github.com/jaedag/fl-admin-portal/commit/54f6477063560fcefe05070220a626e4993cd757))

#### 1.0.1 (2022-04-03)

##### Chores

*  update @neo4j/graphql and graphql libraries ([f6c0c814](https://github.com/jaedag/fl-admin-portal/commit/f6c0c81406799c040d610146bbc003458820897f))

##### Bug Fixes

*  tightened phoneNumber validation to prevent using a duplicate number with '+2330' syntax ([662096bf](https://github.com/jaedag/fl-admin-portal/commit/662096bf057b87b68b71bf63f97e384d93d40b5b))
*  added missing 'id' to leaders in ListQueries ([46be6f0d](https://github.com/jaedag/fl-admin-portal/commit/46be6f0dfafe54a776b3583f41f451ccbc098822))
*  fixed member and church icons on search flow ([e4aa088e](https://github.com/jaedag/fl-admin-portal/commit/e4aa088e74a93e366f1128a7e0a4ef7651a591c8))
*  fixed bug breaking the update member page ([d656aaed](https://github.com/jaedag/fl-admin-portal/commit/d656aaedf8e8f4100f1b5e7279d1d3ae46032322))
*  fixed create member submission ([56ddcf4f](https://github.com/jaedag/fl-admin-portal/commit/56ddcf4fd580cc89d2965755628e7aa84310926d))
*  improved bacenta form for non stream admins ([175d5556](https://github.com/jaedag/fl-admin-portal/commit/175d5556e3119264dbc9a242024a519299a78e6f))
*  fixed bug where emails could not be changed ([54f64770](https://github.com/jaedag/fl-admin-portal/commit/54f6477063560fcefe05070220a626e4993cd757))

## 1.0.0 (2022-03-31)

##### Chores

*  accepted incoming changes from deploy ([5b75bd67](https://github.com/jaedag/fl-admin-portal/commit/5b75bd675bd61d7135fdf3688eeef97166712226))

##### New Features

* **arrivals:**
  *  gathering service admins can set the code of the day ([02294de7](https://github.com/jaedag/fl-admin-portal/commit/02294de77a37c0a7b396ffd63292c9159bea0d76))
  *  all stream helpers can be deleted at the touch of a button ([4502c5b8](https://github.com/jaedag/fl-admin-portal/commit/4502c5b89a51a98ffc377243c4d86331cc42d0e4))
  *  arrivals counting has been brought back as a step before confirming arrivals ([da7f3949](https://github.com/jaedag/fl-admin-portal/commit/da7f3949fd00f4730216847a79715895d7ca73dc))
  *  implemented user flow for arrivals helpers ([db9af4a2](https://github.com/jaedag/fl-admin-portal/commit/db9af4a29eb45cb150f4e9e6452f2920745a9d56))
  *  implemented cards for Members on the Way and Members Arrived ([62c6e4a0](https://github.com/jaedag/fl-admin-portal/commit/62c6e4a08cdde3b926734bd327c4d2d4b58a794b))
  *  implemented logging after updating bacenta bussing details ([ea0e01dd](https://github.com/jaedag/fl-admin-portal/commit/ea0e01ddde5018780314f5d56bcee48ed2cf1fe8))
  *  implemented church by subchurch flow for arrivals ([504a5404](https://github.com/jaedag/fl-admin-portal/commit/504a5404623337dd8dda50072ee69e9f294b1219))
  *  implemented flow for stream and gatheringservice levels ([ba281546](https://github.com/jaedag/fl-admin-portal/commit/ba28154633e1be5e5089531fc7c5ec1da589fa23))
  *  implemented feature for gathering service admins to set a date as a swell date ([c15e1556](https://github.com/jaedag/fl-admin-portal/commit/c15e15563a07000e06e7fc9527d98531b718dc75))
  *  implemented feature in backend to support swell and non swell ([34611e11](https://github.com/jaedag/fl-admin-portal/commit/34611e1130b69cea17e5d2beb49648741c2191ce))
  *  implemented payswitch integration for paying bussing topup ([6b4c9b7f](https://github.com/jaedag/fl-admin-portal/commit/6b4c9b7f86cac4fdcc0f03236b0459961e41d519))
*  removed alt attribute which messes with the UI of the cloudinary SDK ([4f31d563](https://github.com/jaedag/fl-admin-portal/commit/4f31d56394e4dc33ecca059401df45965e1ba7e9))
*  improved image handling using the cloudinary React SDK ([7638214a](https://github.com/jaedag/fl-admin-portal/commit/7638214aece829005a2761ce797981fe086d1bcc))
*  implemented feature to delete member from the database ([999e8902](https://github.com/jaedag/fl-admin-portal/commit/999e89026dcfa25f45445897d3df480bcd88e7c0))

##### Bug Fixes

*  brought back councilSontaSearch ([21baf963](https://github.com/jaedag/fl-admin-portal/commit/21baf963b1c1076b866fc658f433e8a8033896ef))
*  improved the submitting ux by ensure that all submit buttons display 'loading' before submit ([1912c21a](https://github.com/jaedag/fl-admin-portal/commit/1912c21a1c43d1d565fc730e552c7d2795d6840a))
*  fixed  bug with updating bacenta mutation ([ba6c5e95](https://github.com/jaedag/fl-admin-portal/commit/ba6c5e95189305c05830c92cad7ed330a9209f7e))
*  improved the UX for submitting member forms by refactoring promises into async/await ([f5108b48](https://github.com/jaedag/fl-admin-portal/commit/f5108b4839ba92f55b1b089a4ffe2304aad05541))
*  made improvements to the arrivals flow to enable better cross stream compatibility ([250eb5bb](https://github.com/jaedag/fl-admin-portal/commit/250eb5bbabb06302ad4eb0c1af41580cbb3a41cb))
*  touched up the colours on the banked card ([d3ba9bd3](https://github.com/jaedag/fl-admin-portal/commit/d3ba9bd3e693cbc562b40df2fe08f81dbfee0f3b))
*  insisted on distinctness in the number of fellowships returned in the defaulters numbers ([6dadee69](https://github.com/jaedag/fl-admin-portal/commit/6dadee6945027c4de56bd675fe7a7ad065dcb8ba))
*  improved the computations for the defaulters ([de81a99a](https://github.com/jaedag/fl-admin-portal/commit/de81a99a2debb92b03651df6420a768f123431c1))
*  fixed bug where admin could not view councils they aren't members of, refactored code ([e7db7c81](https://github.com/jaedag/fl-admin-portal/commit/e7db7c81336c3b9b50bec3e91e91fd70a434bbb0))
*  api checks if leader has current history and then creates it before writing the service record ([0b534ff3](https://github.com/jaedag/fl-admin-portal/commit/0b534ff397cab19bcb676245ddf431c9a8ddd2ed))
*  partially implemented service resolver check before writing to db ([9afa6ae7](https://github.com/jaedag/fl-admin-portal/commit/9afa6ae78366670b50822fb744fb399379bd1ae9))
*  member search boxes now supports better compatibility across streams ([02cc5f26](https://github.com/jaedag/fl-admin-portal/commit/02cc5f26bad8f0cca7825c8215588eec97dd0cb8))
*  service forms can only be filled for the week in which they occurred ([04b9a428](https://github.com/jaedag/fl-admin-portal/commit/04b9a428c167a3b3681daed8d8204e62c0095a42))
*  minor bug fixes ([e70e7124](https://github.com/jaedag/fl-admin-portal/commit/e70e7124fddbd7e3c4ca348f444658d83237fcde))
* **arrivals:**
  *  when transaction fails, transactionId should be removed ([7dedf895](https://github.com/jaedag/fl-admin-portal/commit/7dedf8952d3371b5bfb75eacabd9dc15eb2a7aec))
  *  added some more permissions ([06c176af](https://github.com/jaedag/fl-admin-portal/commit/06c176af6400f098dd5205d02846ca13dc5e291f))
  *   change the source for the rolesPath in the graphql.js ([b2028426](https://github.com/jaedag/fl-admin-portal/commit/b20284260dff4bbffe0f21986addf45c4317f25f))

##### Refactors

*  created a date functions file ([7fa23da3](https://github.com/jaedag/fl-admin-portal/commit/7fa23da32fe38054a88f131a3e6e380712869b59))
*  refactored resolvers to be more scalable as well as better error handling ([47181079](https://github.com/jaedag/fl-admin-portal/commit/47181079563ff65d50c8115adad663320bc25a25))

#### 0.7.5 (2022-03-14)

##### Bug Fixes

*  fixed breaking change in code ([0011d9d5](https://github.com/jaedag/fl-admin-portal/commit/0011d9d5ffd49b13297c7fdae09f04ea5eb140a7))
*  fixed bug preventing leaders from being changed ([86bbece8](https://github.com/jaedag/fl-admin-portal/commit/86bbece8298763d16b30a5812f4e22e852791781))

#### 0.7.4 (2022-03-12)

##### New Features

*  prevented users from selecting the same treasurer twice to fill the form ([0f535e7e](https://github.com/jaedag/fl-admin-portal/commit/0f535e7e69cb66bcce7d6ac340ec1aed0a7a0a1d))

##### Bug Fixes

*  implemented arrivals dummy sheet ([7b49d008](https://github.com/jaedag/fl-admin-portal/commit/7b49d008ae415820ec477be782dbc10bd8e64717))
*  fixed bug where exceptions thrown in nodejs prefixed with 'unexpected error' ([f2cf8b4a](https://github.com/jaedag/fl-admin-portal/commit/f2cf8b4a048dfd535cfb9331cb317d2d7326ba75))
*  admin-45 final touches to this issue ([b9b3fb7d](https://github.com/jaedag/fl-admin-portal/commit/b9b3fb7d971655cd288a750a6d68e252b4006779))
*  fixed bug where leaders were not being changed in db ADMIN-45 ([1171161b](https://github.com/jaedag/fl-admin-portal/commit/1171161b1ca265ff4ec3133a0dc0b48ece0148ba))
*  admin-45 fixed bug where leaders were not being changed in db ([5f55f91f](https://github.com/jaedag/fl-admin-portal/commit/5f55f91f0feb3724cdfd98707df222bab7fe6a1a))

#### 0.7.3 (2022-03-11)

##### Chores

*  edited prettier config ([1f540a96](https://github.com/jaedag/fl-admin-portal/commit/1f540a96d8e0cf68b45178d561ff348026884db2))
*  added the cypher file ([4c33a1c2](https://github.com/jaedag/fl-admin-portal/commit/4c33a1c2d60c2832996d1f7e73512529a17028f7))
*  updated prettier settings ([cc3aa026](https://github.com/jaedag/fl-admin-portal/commit/cc3aa02608efe24c97ade95947aca350119fe504))

##### New Features

* **arrivals:**  disabled arrivals flow for members ([b1c2e0f2](https://github.com/jaedag/fl-admin-portal/commit/b1c2e0f2433fc88f2fb8333183ec74058f38038a))

##### Bug Fixes

*  fixed bug where leader roles were not being changed in the database ([f7a6a8b9](https://github.com/jaedag/fl-admin-portal/commit/f7a6a8b952173acd2df373804f00a42267e1753a))
*  fixed bug where leaders could not view church details ([b504399c](https://github.com/jaedag/fl-admin-portal/commit/b504399c82ca123c532530137d9ad09572c0b81d))
*  fixed error with stream search ([ba2aeeec](https://github.com/jaedag/fl-admin-portal/commit/ba2aeeecd96f4a26015f2cdaea0a85dab8180a58))

#### 0.7.2 (2022-03-04)

##### Bug Fixes

*  fixed slight error with the component service calculations ([cd289da7](https://github.com/jaedag/fl-admin-portal/commit/cd289da70a2186ac70b89e0cfaf4a59e032848e4))
*  fixed bug with changing leader, and with submitting service forms ([6dba4b03](https://github.com/jaedag/fl-admin-portal/commit/6dba4b03dde10bb8b0f3e6eaef9e134d562f74db))
*  fixed bug where history log was showing 'undefined' after a change ([d7c6694f](https://github.com/jaedag/fl-admin-portal/commit/d7c6694ff9986a8fd81437c2ca1a953fb2bf4297))

#### 0.7.1 (2022-03-04)

##### New Features

*  overwrite deploy with release ([fc26c0b0](https://github.com/jaedag/fl-admin-portal/commit/fc26c0b0e48e16cf7e5751852745ae0804723237))

##### Bug Fixes

*  fixed bug preventing the edit fellowship page from loading ([204f2357](https://github.com/jaedag/fl-admin-portal/commit/204f2357e2170fe5cdee5d6c330a8172067935a7))
*  fixed broken fellowship service link 2 ([a058203e](https://github.com/jaedag/fl-admin-portal/commit/a058203e126b2a8536cbb5e82322d8f41d6f15b6))
*  fixed broken fellowship service link ([db20f03a](https://github.com/jaedag/fl-admin-portal/commit/db20f03ae28c0e6a350954ba98adcca1bf7972db))

### 0.7.0 (2022-03-04)

##### Chores

*  fixed merge changes ([c880c2e7](https://github.com/jaedag/fl-admin-portal/commit/c880c2e75ece31491c80599b2566e48c2d312397))
*  merge branch 'hotfix/council-form' into develop ([589bb547](https://github.com/jaedag/fl-admin-portal/commit/589bb54750a837b3e67b18683137582a6c94ddc0))
*  updated gitignore file to ignore eslintcache file ([7e69be3e](https://github.com/jaedag/fl-admin-portal/commit/7e69be3ec3f15f422e77d5d86923bde83805136a))

##### New Features

*  implemented functionality to switch bacenta status between 'vacation' and 'active' ([70b27059](https://github.com/jaedag/fl-admin-portal/commit/70b2705927fe00b3881984978e6e0589cb5eda61))
*  added functionality for constituency arrivals admin ([72614471](https://github.com/jaedag/fl-admin-portal/commit/726144716089236c9805caf43b32ad0ee3963688))
*  implemented api functionality to fill the forms that B Josh wants for arrivals ([23a546e7](https://github.com/jaedag/fl-admin-portal/commit/23a546e76f5f43cde2021232ebc33fe1861f43ab))
*  implemented functionality to switch bacenta status between 'IC' and 'Graduated' ([18938d5a](https://github.com/jaedag/fl-admin-portal/commit/18938d5af38d0d8a6458de99afc52b28f2c38994))
*  added functionality of inputing momo details for bacenta leaders ([ed90084b](https://github.com/jaedag/fl-admin-portal/commit/ed90084b4dd6ce511debf37cc52c7331e6ada949))

##### Bug Fixes

*  merge branch 'feature/arrivals' into develop ([f960ae5f](https://github.com/jaedag/fl-admin-portal/commit/f960ae5f05fe8e7c8c7529865e70c7f35cf33ba8))
*  implemented custom resolver so that admins can change member emails without fear ([7384c490](https://github.com/jaedag/fl-admin-portal/commit/7384c49084432c3091d1863795c19c88ecd20083))
*  defaulters flow can show you outside your personal church  instead of being limited ([4582572e](https://github.com/jaedag/fl-admin-portal/commit/4582572ea1616ac64434f34a866c3124b96e92fd))
*  fixed bug where current user doesn't remain after refreshing ([bf86adaa](https://github.com/jaedag/fl-admin-portal/commit/bf86adaa47f605dbc3682f83a8eb8d49267bce61))
*  tweaked the graph for the componennt services ([1f1dc3c8](https://github.com/jaedag/fl-admin-portal/commit/1f1dc3c807f0510c306dad50f7a780fdd9cb8c4e))
*  tweaked the order of members in member display pages ([b8ae13e7](https://github.com/jaedag/fl-admin-portal/commit/b8ae13e766489e66c22de9903700f0fb21b27b86))
*  addded functionality to confirm the arrival time of a bacenta ([188e92b4](https://github.com/jaedag/fl-admin-portal/commit/188e92b44ff2c63d0618b324be5ff6977305e64d))
*  added a page to view mobilisation picture ([afeeca29](https://github.com/jaedag/fl-admin-portal/commit/afeeca29485c7de7289ab2355edddfd1798f1629))
*  rewrote the code for making leaders and admins ([3cca7b24](https://github.com/jaedag/fl-admin-portal/commit/3cca7b2427cda9bac9cda3297365bd7430c9ca71))
*  improved the church graph ([d6d6c5e4](https://github.com/jaedag/fl-admin-portal/commit/d6d6c5e4d60b7abb4ff36261a556eac2efe99f5a))
*  added connect history to the change leader mutations ([620c6e81](https://github.com/jaedag/fl-admin-portal/commit/620c6e81b4bf8b59c503a9c30c8edb3335bde9f1))
*  added momo name and number to the busssing details submission form ([efe96853](https://github.com/jaedag/fl-admin-portal/commit/efe96853175dbf3a27d139d001a9e7dc4a355c81))

##### Other Changes

* Fellowship ([949ddb96](https://github.com/jaedag/fl-admin-portal/commit/949ddb96999349791e93da79fa2f42bfb9f52946))

##### Refactors

*  moved permissions definitions to a separate file ([b57ddc36](https://github.com/jaedag/fl-admin-portal/commit/b57ddc3685b4a58b2a2324ff55c24460a6ae9502))
*  moved arrivals schema definitiions to arrivals.graphql file ([061f2c4a](https://github.com/jaedag/fl-admin-portal/commit/061f2c4ad8a2b4e73a009a271ad4d8eff08608be))

#### 0.6.2 (2022-02-04)

##### Chores

*  create commitlint.yml ([9fd58c44](https://github.com/jaedag/fl-admin-portal/commit/9fd58c444e73a85e2d613bcbd0bc16ba10ecbc67))
*  removed unneeded dependencies ([96039cb6](https://github.com/jaedag/fl-admin-portal/commit/96039cb6a6065878b62e50dc9809cfa3636fe251))

##### Bug Fixes

*  ordered the weeks of the church graph ([cf56ba61](https://github.com/jaedag/fl-admin-portal/commit/cf56ba6179dc023d75e7905ff9572795a11456f9))
*  fixed graphs on the dashboard to show last 4 weeks even at the beginning of the year ([468f7f70](https://github.com/jaedag/fl-admin-portal/commit/468f7f70ab69d839817b0a38776529b676374db9))
*  added exports to graphql-schema ([f94d41d7](https://github.com/jaedag/fl-admin-portal/commit/f94d41d70efd4cf2d4bc8d62c4bdecf5e46aaf2c))
*  tried switching import for require in graphql-schema ([7b7becc3](https://github.com/jaedag/fl-admin-portal/commit/7b7becc3e7fd6e578ea629fce4faffcbebd12f36))
*  eliminated lodash in netlify function ([2e39f1b1](https://github.com/jaedag/fl-admin-portal/commit/2e39f1b1e41d4a57ea551bca4e83f1f284f5ecb3))
*  updated import statements in graphql.js ([fc6325fe](https://github.com/jaedag/fl-admin-portal/commit/fc6325fe10be52c50cf473f8ae5ed2bedcdfb59a))
*  updated import statements in graphql.js ([46c2ed0e](https://github.com/jaedag/fl-admin-portal/commit/46c2ed0e9801a7ad8877fd0f8ea5f4654c29fc77))
*  updated netlify.toml file after moving files around in api directory ([7bb208fb](https://github.com/jaedag/fl-admin-portal/commit/7bb208fbba809bbbde1def927490a58f73c144be))
*  updated references to files that have moved ([e1474d85](https://github.com/jaedag/fl-admin-portal/commit/e1474d85668e292c915bb2bb278b6034cbaa1f63))
*  updated references to files that have moved ([627f9174](https://github.com/jaedag/fl-admin-portal/commit/627f9174f21d6cede88d8434366c78047578e606))
*  updated references to files that have moved ([e8b41b1b](https://github.com/jaedag/fl-admin-portal/commit/e8b41b1b40810dd9666ae27b20a3dba56468d310))
*  updated netlify.toml file after moving files around in api directory ([47b7e682](https://github.com/jaedag/fl-admin-portal/commit/47b7e68209f971530979f46aea957ad3d034464d))

#### 0.6.1 (2022-02-04)

##### Documentation Changes

*  updated CHANGELOG.md ([83b5ffb2](https://github.com/jaedag/fl-admin-portal/commit/83b5ffb2377b84e3583c37748682db4f5e448499))

##### Bug Fixes

*  edited script that generates changelog ([ae1e6daf](https://github.com/jaedag/fl-admin-portal/commit/ae1e6dafa945458498302cf7ba01e756a3ff81ce))
*  installed Husky to enforce commit messages as we work ([948bbca3](https://github.com/jaedag/fl-admin-portal/commit/948bbca34cd8eac5e405d9088eaa9106d64cb5cc))

### 0.7.0 (2022-02-04)

##### Bug Fixes

*  installed Husky to enforce commit messages as we work ([948bbca3](https://github.com/jaedag/fl-admin-portal/commit/948bbca34cd8eac5e405d9088eaa9106d64cb5cc))

### 0.7.0 (2022-02-04)

##### Bug Fixes

*  installed Husky to enforce commit messages as we work ([948bbca3](https://github.com/jaedag/fl-admin-portal/commit/948bbca34cd8eac5e405d9088eaa9106d64cb5cc))

### 0.7.0 (2022-02-04)

##### Bug Fixes

*  installed Husky to enforce commit messages as we work ([948bbca3](https://github.com/jaedag/fl-admin-portal/commit/948bbca34cd8eac5e405d9088eaa9106d64cb5cc))

