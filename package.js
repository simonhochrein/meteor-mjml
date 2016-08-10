Npm.depends({
  'mjml': '2.3.1',
  'handlebars': '4.0.5'
});

Package.describe({
  name: 'simonhochrein:mjml',
  version: '0.0.1',
  summary: 'MJML Email Template Engine For Meteor',
  git: 'https://github.com/simonhochrein/meteor-mjml',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.3.4.1');
  api.use('ecmascript');
  api.use([ 'email' ], 'server');
  api.addFiles([ 'mjml.js' ], 'server');
  api.export('MJML', 'server');
});
