import git from 'git-rev-sync';

export const extractJobMeta = () => {
  const commit = git.short();
  const branch = git.branch();

  let createdAt = '';

  try {
    createdAt = git.date();
  } catch (err) {
    console.error('Error extracting commit date.');
  }

  let commitMessage = '';

  try {
    commitMessage = git.message();
  } catch (err) {
    console.error('Error extracting commit message.');
  }

  return {
    createdAt,
    commit,
    commitMessage,
    branch,
  };
};
