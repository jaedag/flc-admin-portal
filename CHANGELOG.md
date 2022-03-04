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

