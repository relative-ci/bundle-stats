import htmlTemplates from '@bundle-stats/html-templates';

import { INITIAL_DATA_PATTERN, OUTPUT_FILENAME, OutputType } from './constants';

type CreateArtifactFn = (jobs: Array<any>, report: any) => string;

export const createHTMLArtifact: CreateArtifactFn = (jobs) => {
  // Inject data into the template
  let output = htmlTemplates.replace(
    INITIAL_DATA_PATTERN,
    `window.__INITIAL_DATA__ = ${JSON.stringify(jobs)}`,
  );

  // Add total bundle size info into the title
  const totalSize = jobs?.[0]?.insights?.webpack?.assetsSizeTotal?.data?.text;

  if (totalSize) {
    output = output.replace(/<title>(.*)<\/title>/, `<title>${totalSize} - $1</title>`);
  }

  return output;
};

export const createJSONArtifact: CreateArtifactFn = (_, report) => {
  return JSON.stringify(report, null, 2);
};

interface ArtifactsOptions {
  html?: boolean;
  json?: boolean;
}

interface Artifact {
  output: string;
  filename: string;
}

type ArtifactByType = Record<string, Artifact>;

export function createArtifacts(
  jobs: Array<any>,
  report: any,
  options: ArtifactsOptions,
): ArtifactByType {
  const results: ArtifactByType = {};

  if (options.html) {
    results[OutputType.HTML] = {
      output: createHTMLArtifact(jobs, report),
      filename: `${OUTPUT_FILENAME}.${OutputType.HTML}`,
    };
  }

  if (options.json) {
    results[OutputType.JSON] = {
      output: createJSONArtifact(jobs, report),
      filename: `${OUTPUT_FILENAME}.${OutputType.JSON}`,
    };
  }

  return results;
}
