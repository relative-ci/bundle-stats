# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [3.2.8](https://github.com/relative-ci/bundle-stats/compare/v3.2.7...v3.2.8) (2022-03-10)

**Note:** Version bump only for package @bundle-stats/utils





## [3.2.7](https://github.com/relative-ci/bundle-stats/compare/v3.2.6...v3.2.7) (2022-03-10)


### Bug Fixes

* **utils:** FileTypes - add apng, m4a, aac,oga,wav,aac ([1b556c1](https://github.com/relative-ci/bundle-stats/commit/1b556c13b051bab122bfa05bb9b048d646399dbe))
* **utils:** FileTypes - add missing extensions ([260f046](https://github.com/relative-ci/bundle-stats/commit/260f046c177625c1d877156739aa4e83e3f878a5))





## [3.2.6](https://github.com/relative-ci/bundle-stats/compare/v3.2.5...v3.2.6) (2022-03-04)

**Note:** Version bump only for package @bundle-stats/utils





## [3.2.5](https://github.com/relative-ci/bundle-stats/compare/v3.2.4...v3.2.5) (2022-02-15)

**Note:** Version bump only for package @bundle-stats/utils





## [3.2.4](https://github.com/relative-ci/bundle-stats/compare/v3.2.3...v3.2.4) (2022-01-17)

**Note:** Version bump only for package @bundle-stats/utils





## [3.2.3](https://github.com/relative-ci/bundle-stats/compare/v3.2.2...v3.2.3) (2022-01-10)

**Note:** Version bump only for package @bundle-stats/utils





## [3.2.2](https://github.com/relative-ci/bundle-stats/compare/v3.2.1...v3.2.2) (2021-12-08)

**Note:** Version bump only for package @bundle-stats/utils





## [3.2.1](https://github.com/relative-ci/bundle-stats/compare/v3.2.0...v3.2.1) (2021-11-23)

**Note:** Version bump only for package @bundle-stats/utils





# [3.2.0](https://github.com/relative-ci/bundle-stats/compare/v3.1.3...v3.2.0) (2021-10-13)


### Bug Fixes

* Consistent dependency versions across packages ([cceebb7](https://github.com/relative-ci/bundle-stats/commit/cceebb7724670a7c40c156c395449fc65d183690))
* **utils:** Use convert-units@beta ([731e7a4](https://github.com/relative-ci/bundle-stats/commit/731e7a4c1cf3fc2189f961388632fdbab838be3f))
* **utils:** Webpack module packages -construct patterns ([29c8606](https://github.com/relative-ci/bundle-stats/commit/29c86067d07188e4a553f7a41f70cc0621ea7c0d))
* **utils:** Webpack packages - make slug pattern more restrictive ([4d1ac7f](https://github.com/relative-ci/bundle-stats/commit/4d1ac7f7fc3c4783a0124efb651de2ff2752301e))


### Features

* **utils:** Extract packages - add support for pnpm ([527e154](https://github.com/relative-ci/bundle-stats/commit/527e15422447c14dfa6f0ba0fdfe859c0aae7b9a))





## [3.1.2](https://github.com/relative-ci/bundle-stats/compare/v3.1.1...v3.1.2) (2021-08-10)


### Bug Fixes

* **utils:** Component links - show only changed entries for chunk modules ([be3a79b](https://github.com/relative-ci/bundle-stats/commit/be3a79b46028822f45bcc7487148e56fbc1f1777))


### Performance Improvements

* **utils:** Webpack extract - use assignments instead of deconstructions ([40fbd38](https://github.com/relative-ci/bundle-stats/commit/40fbd38710cff334a6e58dc026ff6d84e98841c3))





## [3.1.1](https://github.com/relative-ci/bundle-stats/compare/v3.1.0...v3.1.1) (2021-07-28)


### Bug Fixes

* **utils:** Import default I18N ([baf56e3](https://github.com/relative-ci/bundle-stats/commit/baf56e3fd8b11ee076a623ee6237622ad8fb60f7))





# [3.1.0](https://github.com/relative-ci/bundle-stats/compare/v3.0.1...v3.1.0) (2021-07-28)


### Bug Fixes

* **utils:** Assets - replace 5 char hashes ([f0d6bd2](https://github.com/relative-ci/bundle-stats/commit/f0d6bd26c6ab3e54d548bbb2756d76708ea8bce1))
* **utils:** ModuleName - replace invalid css prefix ([9b7111c](https://github.com/relative-ci/bundle-stats/commit/9b7111cd5e5137a875525d54948c6a7e48795023))


### Features

* BundleModules - filter by source type ([e494b23](https://github.com/relative-ci/bundle-stats/commit/e494b2312841bd767321f2677c6502f23478bca5))
* **utils:** Webpack compare - pass row transformers ([b5f9728](https://github.com/relative-ci/bundle-stats/commit/b5f9728b4afd11cebc958ef11f70fbcaffe7716e))


### Performance Improvements

* **utils:** mergeMetricsByKey - run addRowMetricData in one step ([9203549](https://github.com/relative-ci/bundle-stats/commit/92035497f2082d5e676facf23fb748ecc1134668))


### Reverts

* Revert "build(utils): tsconfig - fix rootDir" ([7f2f753](https://github.com/relative-ci/bundle-stats/commit/7f2f753dcc8ed3393f54772f69db367b589f3389))





## [3.0.1](https://github.com/relative-ci/bundle-stats/compare/v3.0.0...v3.0.1) (2021-06-06)

**Note:** Version bump only for package @bundle-stats/utils





# [3.0.0](https://github.com/relative-ci/bundle-stats/compare/v2.8.2...v3.0.0) (2021-05-18)


### Bug Fixes

* **utils:** DuplicatePackagesCount - count all the duplicate instances ([d9bdba5](https://github.com/relative-ci/bundle-stats/commit/d9bdba53ef2fc6fb72f89a892fd61adcb159db3b))
* **utils:** Module chunkId - consistent type with meta.chunks ([8e2bc0c](https://github.com/relative-ci/bundle-stats/commit/8e2bc0c359e6622bf30c4f61338e5b40a2918112))


### Features

* **utils:** Packages - store public package name ([36f5397](https://github.com/relative-ci/bundle-stats/commit/36f5397b50cd4ac377e90f9067692b27e9fdbfd1))
* **utils:** Webpack - extract concatenated modules ([39651ed](https://github.com/relative-ci/bundle-stats/commit/39651ed8e7cfbd0673c5418084911cd8e89c3185))
* **utils:** Webpack validate - allow modules[].modules[] ([309a4bb](https://github.com/relative-ci/bundle-stats/commit/309a4bb1325d399e1dc381c4155dcd7f14a52563))





## [2.8.2](https://github.com/relative-ci/bundle-stats/compare/v2.8.1...v2.8.2) (2021-05-07)


### Bug Fixes

* Depend on core-js ([475cffb](https://github.com/relative-ci/bundle-stats/commit/475cffbbb9924a4dbfffa923b81ccb19fe9cd7fb))





## [2.8.1](https://github.com/relative-ci/bundle-stats/compare/v2.8.0...v2.8.1) (2021-05-07)


### Bug Fixes

* **utils:** Filter - remove empty module chunks ([68fae44](https://github.com/relative-ci/bundle-stats/commit/68fae44f226c00c93e2b2a2cecdcb30c372e3dc4))
* **utils:** Filter - skip only null and undefined ([de7b8e9](https://github.com/relative-ci/bundle-stats/commit/de7b8e96b8e81b6fbedf485c53a2855549935314))
* **utils:** Packages - add package path ([b53c362](https://github.com/relative-ci/bundle-stats/commit/b53c3624556cdaf42f5c79a2bdedb5a1fd2e1b62))
* **utils:** Packages - separate packages based on path ([e66cf69](https://github.com/relative-ci/bundle-stats/commit/e66cf69426c0a3c795ff6027b67e388cbe90aaa3))





# [2.8.0](https://github.com/relative-ci/bundle-stats/compare/v2.7.2...v2.8.0) (2021-03-27)


### Bug Fixes

* **ui:** Search - merge filters param to all entries filters ([024d05d](https://github.com/relative-ci/bundle-stats/commit/024d05da639e33a4c4944968f878cbd4c67f6aa1))
* **utils:** Component link - set chunk ids filters ([2643fd3](https://github.com/relative-ci/bundle-stats/commit/2643fd384ed60e2754b7c9aa18cad95e5c7cfd3e))
* **utils:** ComponentLinks - packages change filter ([cb93c85](https://github.com/relative-ci/bundle-stats/commit/cb93c8548943c24f7358a09b55e681150589f461))
* **utils:** Webpack metrics info ([8b06dd5](https://github.com/relative-ci/bundle-stats/commit/8b06dd5095b5a8206ba2531355df618431147541))





## [2.7.2](https://github.com/relative-ci/bundle-stats/compare/v2.7.1...v2.7.2) (2021-03-13)


### Bug Fixes

* **utils:** Modules - add changed flag to view all link ([5c94893](https://github.com/relative-ci/bundle-stats/commit/5c94893c84d3f59d8f3b91fa57f595457b2d5818))


### Performance Improvements

* **utils:** Webpack compareAllModules - use object assignment ([7001578](https://github.com/relative-ci/bundle-stats/commit/70015783eff546243ae80160c173c42e9b3ae6bb))





# [2.7.0](https://github.com/relative-ci/bundle-stats/compare/v2.6.0...v2.7.0) (2021-03-05)


### Bug Fixes

* **ui:** Modules packages duplicate - remove extra data ([db60126](https://github.com/relative-ci/bundle-stats/commit/db601266c82611083bcbb946a832e5e42ac318ab))
* **ui/utils:** BundleModules - fix chunk filtering ([b02717d](https://github.com/relative-ci/bundle-stats/commit/b02717dbfe417cc3fddeead54c0d7770aac055ae))
* **utils:** Assets - always flag assets as chunks ([45e20d4](https://github.com/relative-ci/bundle-stats/commit/45e20d48aa6c5c3797295e48c8a40bc4ffbd903f))
* **utils:** Consistent type for chunk id ([76f9f07](https://github.com/relative-ci/bundle-stats/commit/76f9f07962b987f0d7b9ae8f233ba4f134e11263))
* **utils:** Tweak metric descriptions ([e0f6174](https://github.com/relative-ci/bundle-stats/commit/e0f6174c468c2b2536d23edc7ea8137bd4b65a9f))


### Features

* **utils:** Add compareAllModules ([fc9949d](https://github.com/relative-ci/bundle-stats/commit/fc9949daa4cfc117caee7ef8c1d2fb6dbab86d62))
* **utils:** Add module section links ([1f17efb](https://github.com/relative-ci/bundle-stats/commit/1f17efb1fb295d149210a1fab36cfb00e899950a))
* **utils:** Add support for module source/destination types ([5fc2464](https://github.com/relative-ci/bundle-stats/commit/5fc2464682f8bb2965ca4d4aa07f7a10806a91c2))
* **utils:** ModulesPackagesDuplicate - add size data ([887a554](https://github.com/relative-ci/bundle-stats/commit/887a554314d1b82c820b771f73fc8ebdf48bcbf2))
* **utils:** ModulesPackagesDuplicate - order by size desc ([7c16d78](https://github.com/relative-ci/bundle-stats/commit/7c16d780f99fabd531803fa75cdd4f34dea1722a))
* **utils:** Webpack assets - add chunkId ([048f72f](https://github.com/relative-ci/bundle-stats/commit/048f72f1ef4fa9829e56d82a59a95427d818636d))
* **utils:** Webpack chunks - save normalized array as meta ([8a4e79d](https://github.com/relative-ci/bundle-stats/commit/8a4e79dddc4d20b4a5ac5b524d6b6736960985ff))





# [2.6.0](https://github.com/relative-ci/bundle-stats/compare/v2.5.0...v2.6.0) (2021-02-06)

**Note:** Version bump only for package @bundle-stats/utils





# [2.5.0](https://github.com/relative-ci/bundle-stats/compare/v2.4.0...v2.5.0) (2021-01-08)

**Note:** Version bump only for package @bundle-stats/utils





# [2.4.0](https://github.com/relative-ci/bundle-stats/compare/v2.3.0...v2.4.0) (2020-12-21)


### Features

* **utils:** Add support for custom asset filename ([563c320](https://github.com/relative-ci/bundle-stats/commit/563c320607acf8cf5c96d23cf84427e3cbdfdd61))
* **utils:** Use min 7 chars for hash ([5f1656b](https://github.com/relative-ci/bundle-stats/commit/5f1656ba66ad92fdd3b2b81af0df0ba11c110832))





# [2.3.0](https://github.com/relative-ci/bundle-stats/compare/v2.2.0...v2.3.0) (2020-10-12)


### Bug Fixes

* Regenerate package-lock.json ([0aa419e](https://github.com/relative-ci/bundle-stats/commit/0aa419e29b93f9ebebf1b8b79838d9e52044c9ef))
* **deps:** update dependency lodash to v4.17.19 ([437d715](https://github.com/relative-ci/bundle-stats/commit/437d715bcdce3da849bffc07de9b6aafc07f5d0e))
* **utils:** Webpack - shorten metric labels ([a6be8db](https://github.com/relative-ci/bundle-stats/commit/a6be8dba3f30b2a0e1480e5aa19a31b398184869))


### Features

* **utils:** Ignore .LICENSE.txt by default ([849c4ba](https://github.com/relative-ci/bundle-stats/commit/849c4ba25caaada46d7dee7a25bdfd0a0fe5cc61))
* Assets total size insights - use consistent shorter message ([76c5d2a](https://github.com/relative-ci/bundle-stats/commit/76c5d2a4bf6c8317f33189a517f700990319fa8d))





# [2.2.0](https://github.com/relative-ci/bundle-stats/compare/v2.1.1...v2.2.0) (2020-04-13)


### Bug Fixes

* **utils:** Handle missing asset/module names ([ba2c11c](https://github.com/relative-ci/bundle-stats/commit/ba2c11c91e9275925a57b1112107c661a3b9fae0))
* **utils:** Validate webpack stats structure ([c2f2ba6](https://github.com/relative-ci/bundle-stats/commit/c2f2ba670fd8bdc2b8b5b60ede55f357dd07399a))





## [2.1.1](https://github.com/relative-ci/bundle-stats/compare/v2.1.0...v2.1.1) (2020-03-29)

**Note:** Version bump only for package @bundle-stats/utils





# [2.1.0](https://github.com/relative-ci/bundle-stats/compare/v2.0.1...v2.1.0) (2020-03-29)

**Note:** Version bump only for package @bundle-stats/utils





# [2.0.0](https://github.com/relative-ci/bundle-stats/compare/v2.0.0-rc.1...v2.0.0) (2020-02-29)

**Note:** Version bump only for package @bundle-stats/utils
