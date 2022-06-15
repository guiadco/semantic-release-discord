import micromatch from 'micromatch';

export function getConfigToUse(pluginConfig, context) {
  const {
    branch: { name }
  } = context

  const { branchesConfig = [], ...globalPluginConfig } = pluginConfig
  const { pattern, ...branchConfig } =
    branchesConfig.find(({ pattern }) => micromatch.isMatch(name, pattern)) ||
    {}

  return { ...globalPluginConfig, ...branchConfig }
}
