Super Agent CLI
==================
<img src="https://travis-ci.org/toastynerd/superagent-cli.svg" alt="Travis CI Badge"></img>

A CLI for the <a href="https://github.com/visionmedia/superagent">superagent rest library</a>. 
Designed to make testing JSON apis from the command line easier.

to install:
```
npm install -g superagent-cli
```

the super agent cli command is `superagent` and requests look like the following:
```
superagent <url> <rest method(get|post|put|patch|delete)> <json data>
superagent www.google.com
superagent www.google.com get
superagent localhost:3000 post '{"hello":"world"}'
```
