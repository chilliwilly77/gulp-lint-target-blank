// map-stream is used to create a stream that runs an async function
const map = require('map-stream');
// gulp-util is used to created well-formed plugin errors
const gutil = require('gulp-util');

const path = require('path');
const LintTargetBlank = require('lint-target-blank');
// The main function for the plugin – what the user calls – should return
// a stream.
const lintTargetBlankPlugin = function (opts) {
  // Create and return a stream that, for each file
  const lintTargetBlank = new LintTargetBlank(opts);
  return map(function (file, cb) {
    lintTargetBlank.lintFile(file.path)
      .then(errors => {
        const lintErrors = errors
          .filter(e => e.type === 'error')
          .map(e => `\t${path.relative(path.resolve(process.cwd()), file.path)}: ${e.element}`)
          .join('\n');
        if (lintErrors) {
          cb(new gutil.PluginError('gulp-lint-target-blank', {
            name: 'TargetBlankLintError',
            message: `The following elements require rel="noreferrer nofollow"\n\n${lintErrors}`,
          }));
        }
      });
  });
};

// Export the plugin main function
module.exports = lintTargetBlankPlugin;
