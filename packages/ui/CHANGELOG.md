# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.8.2](https://github.com/relative-ci/bundle-stats/compare/v2.8.1...v2.8.2) (2021-05-07)


### Bug Fixes

* Depend on core-js ([475cffb](https://github.com/relative-ci/bundle-stats/commit/475cffbbb9924a4dbfffa923b81ccb19fe9cd7fb))





## [2.8.1](https://github.com/relative-ci/bundle-stats/compare/v2.8.0...v2.8.1) (2021-05-07)


### Bug Fixes

* **ui:** BundleAssets - use Icon for not predictive warning ([40a40c9](https://github.com/relative-ci/bundle-stats/commit/40a40c9b3f9686eeeab2a271d2f5ac7793967915))
* **ui:** BundlePackages - extract public package name ([a87b5b5](https://github.com/relative-ci/bundle-stats/commit/a87b5b5e1b771697451ac0d5f7ce39f471550b84))
* **ui:** JobName - allow children ([e3d0fcd](https://github.com/relative-ci/bundle-stats/commit/e3d0fcd2f53384ab0a843642995549157545449e))
* **ui:** MetricTable - styles for JobName link ([4f97f32](https://github.com/relative-ci/bundle-stats/commit/4f97f3266ec2d19fe3684d21bf64ae4507576ee9))
* **ui:** withSearch - name regexp case insensitive ([0ca664c](https://github.com/relative-ci/bundle-stats/commit/0ca664c4b57eb529ba0fc0b4e77f3b6221ef0d77))
* **utils:** Fix info texts ([626375f](https://github.com/relative-ci/bundle-stats/commit/626375fc3d5ca3819a45689324ab5efa12b29b3f))
* **utils:** Packages - separate packages based on path ([e66cf69](https://github.com/relative-ci/bundle-stats/commit/e66cf69426c0a3c795ff6027b67e388cbe90aaa3))
* **utils:** withSearch - prevent inconsistent filter state ([8cf6847](https://github.com/relative-ci/bundle-stats/commit/8cf68475235c6fd0b85a6bb83e9b922dd812efe1))


### Features

* **ui:** Icon - add warning svg ([ecdb419](https://github.com/relative-ci/bundle-stats/commit/ecdb41931ba3fd727763d5d095b42da97a9dea74))





# [2.8.0](https://github.com/relative-ci/bundle-stats/compare/v2.7.2...v2.8.0) (2021-03-27)


### Bug Fixes

* **ui:** Dropdown - consistent usage and styling ([46082d6](https://github.com/relative-ci/bundle-stats/commit/46082d6fd782e6861f4dfe54829b7ed6f3a1f30a))
* **ui:** DuplicatePackagesWarning - skip delta when 0 ([e5ebc46](https://github.com/relative-ci/bundle-stats/commit/e5ebc4689aac35118d559fef244c01c087ff9c14))
* **ui:** Export TotalSizeTypeTitle ([6c40752](https://github.com/relative-ci/bundle-stats/commit/6c407527c99716068e8226fe7605dc85510176f8))
* **ui:** Filters - active styles for custom selection ([a0ea03a](https://github.com/relative-ci/bundle-stats/commit/a0ea03a1cad742683238f389d4e6f65516421cc9))
* **ui:** Filters - crop long dropdown labels ([cfd3292](https://github.com/relative-ci/bundle-stats/commit/cfd3292c8c409243615c1b8fb463f5a547344ca1))
* **ui:** Filters - overflow if there more than 20 items ([a6bdfd2](https://github.com/relative-ci/bundle-stats/commit/a6bdfd2e5458f6baf53009054bdab196f3decceb))
* **ui:** Increase color palette saturation ([0465ab4](https://github.com/relative-ci/bundle-stats/commit/0465ab42dfcae206954a2a19089c2e8bf3f3a9e3))
* **ui:** Loader - update colors ([c3f10f4](https://github.com/relative-ci/bundle-stats/commit/c3f10f4a69fabbedfefca01518735e079c518927))
* **ui:** MetricsTable - show count and total count ([11e4ca6](https://github.com/relative-ci/bundle-stats/commit/11e4ca6b4bdff285660fc6012a263b3f82f2541a))
* **ui:** Popover - pass aria-label ([547c4f1](https://github.com/relative-ci/bundle-stats/commit/547c4f1b77db9ee245516d27725b23bd1b1b87c2))
* **ui:** Remove dropdown label right margin ([b9eb061](https://github.com/relative-ci/bundle-stats/commit/b9eb0611bfc680ad41ae3edd7fce787a2ef5d643))
* **ui:** Search - merge filters param to all entries filters ([024d05d](https://github.com/relative-ci/bundle-stats/commit/024d05da639e33a4c4944968f878cbd4c67f6aa1))
* **ui:** SummaryItem - correct loading state ([c053b89](https://github.com/relative-ci/bundle-stats/commit/c053b89d7b04f4265e8c3ca81d955f8c8ae05276))
* **ui:** SummaryItem - prevent delta value from wrapping ([ddd63a1](https://github.com/relative-ci/bundle-stats/commit/ddd63a1ffe339be7cfd47bfb36649b9c890151f0))
* **ui:** withSearch - update state when props are changing ([4f16adb](https://github.com/relative-ci/bundle-stats/commit/4f16adba54099a2ef6bb5a4e600306cc326e56d0))
* **utils:** Component link - set chunk ids filters ([2643fd3](https://github.com/relative-ci/bundle-stats/commit/2643fd384ed60e2754b7c9aa18cad95e5c7cfd3e))


### Features

* **ui:** Add MetricsTableOptions ([edff4eb](https://github.com/relative-ci/bundle-stats/commit/edff4ebfb417ec8feb8f19ddcfacd1d03a7f2c17))
* **ui:** BundleModules - add ModuleInfo on click ([a3ae754](https://github.com/relative-ci/bundle-stats/commit/a3ae754435a6de026a06de00c2e896742ad7a0c2))
* **ui:** MetricsTableOptions component ([8b30c1f](https://github.com/relative-ci/bundle-stats/commit/8b30c1ffa0cbfb463a3efc35354470c6a6d9630d))
* **ui:** ModuleInfo component ([29e6694](https://github.com/relative-ci/bundle-stats/commit/29e6694d8fb3e37ba8e14f294c0f02e3b3a9e177))


### Performance Improvements

* **ui:** BundleModules - render Popover on mouse enter ([8c0f2ce](https://github.com/relative-ci/bundle-stats/commit/8c0f2ce90924bee26a398b60b38ad56bc26af37e))





## [2.7.2](https://github.com/relative-ci/bundle-stats/compare/v2.7.1...v2.7.2) (2021-03-13)


### Bug Fixes

* **utils:** Modules - add changed flag to view all link ([5c94893](https://github.com/relative-ci/bundle-stats/commit/5c94893c84d3f59d8f3b91fa57f595457b2d5818))


### Performance Improvements

* **ui:** Memo data comparison ([e6691fd](https://github.com/relative-ci/bundle-stats/commit/e6691fd02df89081c17ca9c561f93b109fec88c1))





## [2.7.1](https://github.com/relative-ci/bundle-stats/compare/v2.7.0...v2.7.1) (2021-03-10)


### Bug Fixes

* **ui:** BundleAssets - prevent error when chunk id is not available ([5cdfad3](https://github.com/relative-ci/bundle-stats/commit/5cdfad3ea245583aafd431493225ef7cb1542f3c))
* **ui:** BundleAssets - view all modules link only for current run ([f3769cc](https://github.com/relative-ci/bundle-stats/commit/f3769cc7a3ff103b099b870771f0d8f08d93f977))





# [2.7.0](https://github.com/relative-ci/bundle-stats/compare/v2.6.0...v2.7.0) (2021-03-05)


### Bug Fixes

* **ui:** Alert - decrease vertical spacing ([d00c7a4](https://github.com/relative-ci/bundle-stats/commit/d00c7a42a34533ed11cce960ba0287b9dab228ef))
* **ui:** BundleAssets - improve asset popover ([d3769b8](https://github.com/relative-ci/bundle-stats/commit/d3769b8e35b4f4a3b89211633085300d4ab743b7))
* **ui:** BundleAssets - improve asset popover ([d15a6b2](https://github.com/relative-ci/bundle-stats/commit/d15a6b21ace480b3cdacc87dee6551e066431762))
* **ui:** BundleModuels - add emptyFilters ([d02f8bb](https://github.com/relative-ci/bundle-stats/commit/d02f8bbc3a9eef27a6d15591f869e2760c141241))
* **ui:** BundlePackages - do not set changed filter if single job ([9797e55](https://github.com/relative-ci/bundle-stats/commit/9797e55bfb17fb02324433b3bf9c7be48c5aa6ae))
* **ui:** BundlePackages - show popover info for all packages ([785e99e](https://github.com/relative-ci/bundle-stats/commit/785e99ee6c1a720d3c385082cc8173375c2c77f5))
* **ui:** BundleTotalsChartBars - link to assets component ([3270e87](https://github.com/relative-ci/bundle-stats/commit/3270e877ed64d8ba42cfc4a58de32f463d47ae64))
* **ui:** Change default sort by to size desc ([b52e81e](https://github.com/relative-ci/bundle-stats/commit/b52e81e5918e905b6972a3757b3d1be4562241d4))
* **ui:** Color scheme - add light/dark variation to functional ([9fddfa0](https://github.com/relative-ci/bundle-stats/commit/9fddfa0cf8dbe89c293113c89b6e557178f6c025))
* **ui:** Correct view package filter title ([1bfb68d](https://github.com/relative-ci/bundle-stats/commit/1bfb68de5551146d15f1667134b4e7fe37477fb1))
* **ui:** Delta - inverted high positive state ([4ce3d4f](https://github.com/relative-ci/bundle-stats/commit/4ce3d4fc4bddec96a0f6607a399c21ce3dae918f))
* **ui:** Fix default changed filter when only one job ([19a12cc](https://github.com/relative-ci/bundle-stats/commit/19a12cc4e03b83e2516964f9d3994591b62adc3b))
* **ui:** FlexStack - stretch full height ([4c7ffbb](https://github.com/relative-ci/bundle-stats/commit/4c7ffbbbdcc0f890786507a6742b1749cc0a5648))
* **ui:** Modules packages duplicate - remove extra data ([db60126](https://github.com/relative-ci/bundle-stats/commit/db601266c82611083bcbb946a832e5e42ac318ab))
* **ui:** No css-modules in the global styles ([9342a4a](https://github.com/relative-ci/bundle-stats/commit/9342a4a601f7618aa11fa0a572b5cb7e9d4f1c16))
* **ui:** Popover - update api ([96503d0](https://github.com/relative-ci/bundle-stats/commit/96503d0edc79e0fc3d48be2534d138a789c7ed18))
* **ui:** Popover - valign icon and label ([63517a2](https://github.com/relative-ci/bundle-stats/commit/63517a22ff88ffdd40332be5e9d5d3331a36543e))
* **ui:** Summary - add size modifier ([2d3aaf9](https://github.com/relative-ci/bundle-stats/commit/2d3aaf9df31a2f3d61a6555f660f34e18ccfe89d))
* **ui:** SummaryItem - correct font-size for size modifier ([7afa5b8](https://github.com/relative-ci/bundle-stats/commit/7afa5b8d95022806174159f9ccff516edd3c6a8b))
* **ui:** SummaryItem - remove inline variation ([4c73cbf](https://github.com/relative-ci/bundle-stats/commit/4c73cbf0fdf1b4a95dafe38ba6c6f018fbc70709))
* **ui:** SummaryItem - show baseline value ([9d9fe8c](https://github.com/relative-ci/bundle-stats/commit/9d9fe8c51515ec88b45b1fb1bd34f64de2c1dad4))
* **ui:** SummaryItem - use Popover for help info ([1a9bddd](https://github.com/relative-ci/bundle-stats/commit/1a9bddde5085a040c3ebb3735d58577edaac9029))
* **ui:** Table - empty colspan based on headers ([b2c0e6c](https://github.com/relative-ci/bundle-stats/commit/b2c0e6c00e6535049ce7a4ed127348439fdf2d60))
* **ui:** Table - show inherit colors for links ([277a423](https://github.com/relative-ci/bundle-stats/commit/277a423437f3adacc6c11fca1653ed9159e22756))
* **ui:** Tooltip z-index ([a13436c](https://github.com/relative-ci/bundle-stats/commit/a13436c9a6d1231379cb7862b3b2bcb3ebfcda85))
* **ui/utils:** BundleModules - fix chunk filtering ([b02717d](https://github.com/relative-ci/bundle-stats/commit/b02717dbfe417cc3fddeead54c0d7770aac055ae))
* **utils:** Assets - always flag assets as chunks ([45e20d4](https://github.com/relative-ci/bundle-stats/commit/45e20d48aa6c5c3797295e48c8a40bc4ffbd903f))
* **utils:** Consistent type for chunk id ([76f9f07](https://github.com/relative-ci/bundle-stats/commit/76f9f07962b987f0d7b9ae8f233ba4f134e11263))


### Features

* **ui:** Add popover component ([04199b4](https://github.com/relative-ci/bundle-stats/commit/04199b43f71f08d9abbcfd4b1c7a7c0b123403ef))
* **ui:** Add section summary ([07fbb1c](https://github.com/relative-ci/bundle-stats/commit/07fbb1c99596f6973a096c3d542a8b6e76d17c39))
* **ui:** Add TotalSizeByType title with size info ([99d05c3](https://github.com/relative-ci/bundle-stats/commit/99d05c3941ec59d46749d6263c6625aad536cbe9))
* **ui:** Box - add horizontal/vertical padding variation ([048860d](https://github.com/relative-ci/bundle-stats/commit/048860dc8b130d29a39cfeefe5e4d453fd833481))
* **ui:** BundleAssets - add title and asset size popover info ([4104318](https://github.com/relative-ci/bundle-stats/commit/41043184b21af413a9151a1fa3523cb520313bcf))
* **ui:** BundleAssets - link chunk to modules ([b8f8b37](https://github.com/relative-ci/bundle-stats/commit/b8f8b3748e772329dfb89d1812f8b3d3882a1daa))
* **ui:** BundleAssets - link to modules by chunk type ([12aa246](https://github.com/relative-ci/bundle-stats/commit/12aa246940e503c094112ba051d697e4cba5c2d0))
* **ui:** BundleChunkModules - add title with module size info ([e9f053f](https://github.com/relative-ci/bundle-stats/commit/e9f053faa592eb39dfad4ff617dbfd54f85d5e54))
* **ui:** BundleModules - add support for source file type filters ([1c074e8](https://github.com/relative-ci/bundle-stats/commit/1c074e831b1065e4e6b98b2478c78d04a550b932))
* **ui:** BundleModules - filter by chunk ([76acc62](https://github.com/relative-ci/bundle-stats/commit/76acc6234bb8830aa1dc8a07f29252349db0c3eb))
* **ui:** BundleModules - show all entries ([dd2de92](https://github.com/relative-ci/bundle-stats/commit/dd2de92c95ad0362c4d3551cb243f7cb9417986b))
* **ui:** BundlePackages - add package popover ([12f3bca](https://github.com/relative-ci/bundle-stats/commit/12f3bca8a16fb427191f77009dfe528e4c281488))
* **ui:** BundlePackages - add title with popover info ([5416c4b](https://github.com/relative-ci/bundle-stats/commit/5416c4b1ef7bb8b325e004f8771e0087091348a0))
* **ui:** BundlePackages - add view all duplicates button ([7b04638](https://github.com/relative-ci/bundle-stats/commit/7b04638d9ba0f8c666f8a6a9ceb83111bfb441ef))
* **ui:** BundlePackages - link to corresponding modules ([ba10a8d](https://github.com/relative-ci/bundle-stats/commit/ba10a8d66d7a37b9df842333fc06e6c6cdb97e12))
* **ui:** BundlePackages - show duplicated flag ([f201b05](https://github.com/relative-ci/bundle-stats/commit/f201b0539467d0acc41c89f1f56772d2713a0842))
* **ui:** Delta - add inverted modifier ([bf49809](https://github.com/relative-ci/bundle-stats/commit/bf4980925c9420ff23e1f527eabfde1c893b0e52))
* **ui:** DuplicatePackagesWarning - ling children to packages view ([2be9c09](https://github.com/relative-ci/bundle-stats/commit/2be9c09af536d103cb7659d806567b221d5182d9))
* **ui:** DuplicatePackagesWarning - show changed metric ([3ca0609](https://github.com/relative-ci/bundle-stats/commit/3ca06095283b19d98d779c0a06e896da58334e85))
* **ui:** DuplicatePackagesWarning - show package size ([52d1ea4](https://github.com/relative-ci/bundle-stats/commit/52d1ea41e20ca59f5afc0a83c8d326725201c04d))
* **ui:** DuplicatePackagesWarning - support for duplicate packages v3 data structure ([77e4965](https://github.com/relative-ci/bundle-stats/commit/77e4965a6ebf71ab45f78c5b0cc9728fd8200907))
* **ui:** DuplicatePackagesWarning - title delta and link ([4572b66](https://github.com/relative-ci/bundle-stats/commit/4572b661a723149f2c843b188681fc04cf619b8e))
* **ui:** Metrics(Table) - add support for multiple rows header ([ef7eea6](https://github.com/relative-ci/bundle-stats/commit/ef7eea6e0bbe7936aea1a7c1f1e8b9b4e3db7671))
* **ui:** MetricsTable - add support for title ([eae9ae1](https://github.com/relative-ci/bundle-stats/commit/eae9ae1d6c272776d0402f6b12c8b700ecf8a734))
* **ui:** Popover - updates ([79406a5](https://github.com/relative-ci/bundle-stats/commit/79406a5b4c249ce91d4d1965851cdf45244c9049))
* **ui:** Summary - allow to render custom links ([4817681](https://github.com/relative-ci/bundle-stats/commit/4817681ac16a6a58ed17390432b5fd5d289f2d8d))
* **ui:** Summary - update metrics ([0d53bd8](https://github.com/relative-ci/bundle-stats/commit/0d53bd839deb56f3e790cf5dc74c8a6d581c5625))
* **utils:** Add compareAllModules ([fc9949d](https://github.com/relative-ci/bundle-stats/commit/fc9949daa4cfc117caee7ef8c1d2fb6dbab86d62))
* **utils:** ModulesPackagesDuplicate - order by size desc ([7c16d78](https://github.com/relative-ci/bundle-stats/commit/7c16d780f99fabd531803fa75cdd4f34dea1722a))
* **utils:** Webpack assets - add chunkId ([048f72f](https://github.com/relative-ci/bundle-stats/commit/048f72f1ef4fa9829e56d82a59a95427d818636d))


### Reverts

* Revert "build(ui): Fix package - add sideEffects" ([6a597fb](https://github.com/relative-ci/bundle-stats/commit/6a597fb66ff33a6338cd17301c56055958bd6ecc))





# [2.6.0](https://github.com/relative-ci/bundle-stats/compare/v2.5.0...v2.6.0) (2021-02-06)


### Bug Fixes

* **ui:** App router - use render with key ([621db45](https://github.com/relative-ci/bundle-stats/commit/621db453c873349b6661aef7adf3155c4f397725))
* **ui:** BundleAssetsTotalsTable - add custom ComponentLink prop ([958f806](https://github.com/relative-ci/bundle-stats/commit/958f80698c656eedb9ce07c404b2e405d9a03c84))
* **ui:** DuplicatePackagesWarning - add custom ComponentLink prop ([2115220](https://github.com/relative-ci/bundle-stats/commit/21152201232fa1ded3dc59a675443b4d1e61420b))
* **ui:** FiltersDropdown - vertically align input & label ([871df3a](https://github.com/relative-ci/bundle-stats/commit/871df3a562e371faf3669ef6c611dd1586dc18e6))
* **ui:** MetricTable - add styles for links ([bfd1c19](https://github.com/relative-ci/bundle-stats/commit/bfd1c1984301208427ab6821dbd2a98002b15c45))
* **ui:** Reset filters and search ([3548839](https://github.com/relative-ci/bundle-stats/commit/3548839beb302ea9a8be63f28a65036622fa07dc))
* **ui:** Router - scroll to top on change ([ce7c3b6](https://github.com/relative-ci/bundle-stats/commit/ce7c3b685189c42682487179b34133817b3b7429))


### Features

* **html-templates:** Link summary items to tabs ([6f760a9](https://github.com/relative-ci/bundle-stats/commit/6f760a9316175af90405ee4c44be65f7d94b1fc1))
* **ui:** Add section - components links ([ffb9349](https://github.com/relative-ci/bundle-stats/commit/ffb9349534e4a66690945b09ec3096582e4b4b6f))
* **ui:** BundleAssets - allow to pass custom initialFilters ([c82b042](https://github.com/relative-ci/bundle-stats/commit/c82b0423db3d68ab05de7184e21d290b1674107e))
* **ui:** BundlePackages - add support for custom filters ([bc3210e](https://github.com/relative-ci/bundle-stats/commit/bc3210e4e73f77f114a6c24fbc2de0d82e6e9c95))
* **ui:** Components links - add titles ([d591218](https://github.com/relative-ci/bundle-stats/commit/d591218b5556a244fc2d3e8f20338c235f412db6))
* **ui:** DuplicatePackagesWarning - link to packages ([e65ea46](https://github.com/relative-ci/bundle-stats/commit/e65ea465052a806c20a819e848a4ae4e76279262))
* **ui:** Enable URL state ([c69cb4e](https://github.com/relative-ci/bundle-stats/commit/c69cb4eca376d1fcfa5c207704684b1bcffcda79))
* **ui:** FiltersDropdown - active filters state ([05da749](https://github.com/relative-ci/bundle-stats/commit/05da749dae06408ce779ab537ef0c8f82e859abc))
* **ui:** Summary - add item titles ([7600ab7](https://github.com/relative-ci/bundle-stats/commit/7600ab7c75de5a72adfd08692f79b218808f1526))
* **ui:** Summary - add support for item wrappers ([e07e1fe](https://github.com/relative-ci/bundle-stats/commit/e07e1fecc124c321e27a68279e76cc88150fe34a))
* **ui:** Totals - add links to BundleAssets ([50782a4](https://github.com/relative-ci/bundle-stats/commit/50782a4f9db74df93f734344c7a5d5b3a9ba0c8f))





# [2.5.0](https://github.com/relative-ci/bundle-stats/compare/v2.4.0...v2.5.0) (2021-01-08)


### Bug Fixes

* **ui:** Add reakit as dependency ([20cc52b](https://github.com/relative-ci/bundle-stats/commit/20cc52b2fd63388ef87a94e0799a1a62cfe499a9))
* **ui:** Grayscale - increase contrast ([bf968b9](https://github.com/relative-ci/bundle-stats/commit/bf968b9578d0262b8d57674648e79bf0a394b36e))
* **ui:** JobHeader - layout fixes ([208908e](https://github.com/relative-ci/bundle-stats/commit/208908e43c2e7ea95f3888d72c446d0740a1c9f5))
* **ui:** JobsHeader - add borders & padding ([d09e434](https://github.com/relative-ci/bundle-stats/commit/d09e4341b9639797dfd721c42691bbf7f3d99446))
* **ui:** JobsHeader - tweak spacing; use i18n ([ec215c5](https://github.com/relative-ci/bundle-stats/commit/ec215c5b7e02e04773a663a90cb11417e55d1283))
* **ui:** Summary - add bg ([ad477f0](https://github.com/relative-ci/bundle-stats/commit/ad477f0b85036b896afbf9c8682203e2a39c2004))
* **ui:** SummaryItem - simplify tooltip ([ea80be0](https://github.com/relative-ci/bundle-stats/commit/ea80be052d480589efc72b1650902da0fd85d3ad))
* **ui:** Svg support - workaround jsx transform issue ([65b90b3](https://github.com/relative-ci/bundle-stats/commit/65b90b3b8b0f42640ac2d8d212736a14d7f5fa50))
* **ui:** Tabs - tweak active state ([5c3f33e](https://github.com/relative-ci/bundle-stats/commit/5c3f33e2b0536022c5dac9072f16df96e1fbf45e))





# [2.4.0](https://github.com/relative-ci/bundle-stats/compare/v2.3.0...v2.4.0) (2020-12-21)


### Features

* **utils:** Use min 7 chars for hash ([5f1656b](https://github.com/relative-ci/bundle-stats/commit/5f1656ba66ad92fdd3b2b81af0df0ba11c110832))





# [2.3.0](https://github.com/relative-ci/bundle-stats/compare/v2.2.0...v2.3.0) (2020-10-12)


### Bug Fixes

* Regenerate package-lock.json ([0aa419e](https://github.com/relative-ci/bundle-stats/commit/0aa419e29b93f9ebebf1b8b79838d9e52044c9ef))
* **deps:** update dependency lodash to v4.17.19 ([437d715](https://github.com/relative-ci/bundle-stats/commit/437d715bcdce3da849bffc07de9b6aafc07f5d0e))
* **ui:** Colorscheme - add missing shades ([209123e](https://github.com/relative-ci/bundle-stats/commit/209123ebdddba99189d80a3ffe361df2e6292c7e))
* **ui:** Container - remove padding ([881149c](https://github.com/relative-ci/bundle-stats/commit/881149c09b38d1e75419f412e085eeaaa7975131))
* **ui:** Delta - remove layout styling ([b8c5e3e](https://github.com/relative-ci/bundle-stats/commit/b8c5e3ebba571562964e70dc91b746603320a036))
* **ui:** Dropdown - allow glyph to be empty or svg component ([862ffbb](https://github.com/relative-ci/bundle-stats/commit/862ffbbe15d7f7bbfd4d2c73e857006782d0b102))
* **ui:** Footer - pass source prop ([8f16107](https://github.com/relative-ci/bundle-stats/commit/8f161076e51573859b89bff5a9b83472fc045167))
* **ui:** Header - switch to one row at 768 ([c6c5bbd](https://github.com/relative-ci/bundle-stats/commit/c6c5bbdc8eff6519e1fa91ffa6090dcf757ba878))
* **ui:** Icon - allow svg compontents as glyphs ([31f0181](https://github.com/relative-ci/bundle-stats/commit/31f0181328173baf9dd5d1dd6f92a4703fc6a4d3))
* **ui:** JobsHeader - move spacing to parent ([05d0ccf](https://github.com/relative-ci/bundle-stats/commit/05d0ccfeae8b0488d2a74080fb18f4d0e5af9bbf))
* **ui:** JobsHeader - remove outlines ([8f80eaa](https://github.com/relative-ci/bundle-stats/commit/8f80eaa74f763b5d520de0cd389c759ff9c9f626))
* **ui:** Metric - add inline and anchore modifiers ([5507575](https://github.com/relative-ci/bundle-stats/commit/55075758e23f1fd804983a8bb0276f5dfe9ba614))
* **ui:** MetricsTable - show delta when 0 ([5772566](https://github.com/relative-ci/bundle-stats/commit/5772566567c948e774e0a2e5d154d5d84fa557b4))
* **ui:** Stack ([fb453fe](https://github.com/relative-ci/bundle-stats/commit/fb453fe5efa5520375862a87f6ca9873b348eb98))
* **ui:** Stack - clone and merge class name ([f67c876](https://github.com/relative-ci/bundle-stats/commit/f67c8767289c7817b8953b582a6e1cad374b4282))
* **ui:** Subheader - add padding ([3901e68](https://github.com/relative-ci/bundle-stats/commit/3901e68b3d98b4f212d770dd641c70b1ba2d9777))
* **ui:** SubHeader - small breakpoint styles ([18eee10](https://github.com/relative-ci/bundle-stats/commit/18eee10c8aea5694049a9ec1a043617f2b7bd02f))
* **ui:** SubHeader - use Box component ([2009fcf](https://github.com/relative-ci/bundle-stats/commit/2009fcf8561daaba856e562af34f034b492c6861))
* **ui:** Summary - remove unused prop ([d52397e](https://github.com/relative-ci/bundle-stats/commit/d52397e3fc9e487d1b77dcc049f7416bb28c446d))
* **ui:** SummaryItem - prevent layout jump on loading ([18687eb](https://github.com/relative-ci/bundle-stats/commit/18687eba046fafea1ed6380bb0acf7e9ba4444da))
* **ui:** Use Array.from for Map ([f4f2963](https://github.com/relative-ci/bundle-stats/commit/f4f2963637f61931a77216a9b2b1c0dc6988f55c))
* Add @babel/plugin-proposal-private-methods ([20be3c6](https://github.com/relative-ci/bundle-stats/commit/20be3c6cbb941ee7b9a3389d7137e01152e950d3))


### Features

* **ui:** Box - add outline modifier ([773b4e2](https://github.com/relative-ci/bundle-stats/commit/773b4e229a7c4308b94ab23d9860276576ca7d3c))
* **ui:** Box - add padding support ([6d682b8](https://github.com/relative-ci/bundle-stats/commit/6d682b875b7512c0e070810c9ed45bb86da12de5))
* **ui:** Colorscheme - increase gray contrast ([c825eab](https://github.com/relative-ci/bundle-stats/commit/c825eab3e53bd3466cb9845b21d5f57d529b04cc))
* **ui:** FlexStart component ([0285cd6](https://github.com/relative-ci/bundle-stats/commit/0285cd63852fabc6787baf82fad42523c11008b7))
* **ui:** Footer - add FAQ link ([080902b](https://github.com/relative-ci/bundle-stats/commit/080902bdbf90a9d0ba58690a5ab563cc88085fca))
* **ui:** Stack - layout component ([0525713](https://github.com/relative-ci/bundle-stats/commit/0525713008bddd38d0a8df6d672f96120ca9a25c))
* Assets total size insights - use consistent shorter message ([76c5d2a](https://github.com/relative-ci/bundle-stats/commit/76c5d2a4bf6c8317f33189a517f700990319fa8d))





# [2.2.0](https://github.com/relative-ci/bundle-stats/compare/v2.1.1...v2.2.0) (2020-04-13)


### Bug Fixes

* **ui:** Consistent prop name for metric items ([35f4483](https://github.com/relative-ci/bundle-stats/commit/35f448365f5fde295ed75d70fa2dc8818f695306))
* **ui:** Correct prop types ([7f04086](https://github.com/relative-ci/bundle-stats/commit/7f04086c801f408e376323e8f37f4933e87dcb47))
* **ui:** Debounce metrics table search ([5b0e785](https://github.com/relative-ci/bundle-stats/commit/5b0e78510f74302db452ab3dc30a6d3772eadeff))
* **ui:** Dropdown - substract border from padding ([3eb8d2c](https://github.com/relative-ci/bundle-stats/commit/3eb8d2cbff7623d6ffd12a0b85078dc43d7e2419))
* **ui:** EmptySet - update message ([49181c0](https://github.com/relative-ci/bundle-stats/commit/49181c0148aa13f0fc3d8f1deaae3f56201bcfb9))
* **ui:** RunLabelSum - increase font size ([8543d56](https://github.com/relative-ci/bundle-stats/commit/8543d56b1d7c6b7e3ea47c65e9198b60f4f55879))
* **ui:** SortDropdown - merge buttons ([3140c03](https://github.com/relative-ci/bundle-stats/commit/3140c03d8a239076a0d6c393765da5ce6ce751be))
* **ui:** Table - use unique keys ([60ab489](https://github.com/relative-ci/bundle-stats/commit/60ab489003979a8c9089bd9a6a30b0762061e55d))


### Performance Improvements

* **ui:** useMemo for filtering & sorting ([9495337](https://github.com/relative-ci/bundle-stats/commit/94953371c6f449047a7aad6c4babeb095945e486))





## [2.1.1](https://github.com/relative-ci/bundle-stats/compare/v2.1.0...v2.1.1) (2020-03-29)

**Note:** Version bump only for package @bundle-stats/ui





# [2.1.0](https://github.com/relative-ci/bundle-stats/compare/v2.0.1...v2.1.0) (2020-03-29)

**Note:** Version bump only for package @bundle-stats/ui





## [2.0.1](https://github.com/relative-ci/bundle-stats/compare/v2.0.0...v2.0.1) (2020-03-04)

**Note:** Version bump only for package @bundle-stats/ui





# [2.0.0](https://github.com/relative-ci/bundle-stats/compare/v2.0.0-rc.1...v2.0.0) (2020-02-29)


### Bug Fixes

* Update lock files ([b946889](https://github.com/relative-ci/bundle-stats/commit/b946889f8fdd9eecfce008db6a69ee5d1336faa3))
