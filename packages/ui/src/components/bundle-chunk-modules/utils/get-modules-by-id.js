import { last } from 'lodash';

// css ./node_modules/css-loader/dist/cjs.js??ref--6-0!./src/assets/styles/default.styl
const NAME_WITH_LOADERS = /!/;

// ./src/index.jsx + 27 modules
const NAME_WITH_MODULES = /\s\+\s\d*\smodules$/;

export const getModuleName = (label) => {
  if (NAME_WITH_LOADERS.test(label)) {
    return last(label.split(NAME_WITH_LOADERS));
  }

  if (NAME_WITH_MODULES.test(label)) {
    return label.replace(NAME_WITH_MODULES, '');
  }

  return label;
};

export const getModulesById = (modules = []) => modules.reduce((aggregator, moduleData) => {
  const id = getModuleName(moduleData.name);
  const { size, ...restModuleDataProps } = moduleData;

  return {
    ...aggregator,
    [id]: {
      ...restModuleDataProps,
      value: size,
    },
  };
}, {});
