const Runnable = require('mocha/lib/runnable');
const { relative } = require('path');

const superRun = Runnable.prototype.run;

let context;

Runnable.prototype.run = function (...args) {
  context = {
    title: this.title,
    fullTitle: this.fullTitle ? this.fullTitle() : this.title,
    file: getFileName(this.file),
  };
  return superRun.bind(this)(...args);
}

function getFileName(f) {
  if (!f) {
    return '<root>';
  }
  return relative(process.cwd(), f);
}

module.exports = function getTestContext() {
  return context;
}