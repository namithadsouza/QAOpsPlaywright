module.exports = {
  default: {
    paths: ["tests/features/*.feature"],
    require: ["tests/steps/*.ts", "tests/support/*.ts"],
    requireModule: ["ts-node/register"],
    format: ["progress-bar", "summary", "html:reports/cucumber_report.html", "json:reports/cucumber_report.json"],
    formatOptions: {
      snippetInterface: "async-await"
    }
  }
};
