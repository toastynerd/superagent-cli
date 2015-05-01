Super Agent CLI
==================
<img src="https://travis-ci.org/toastynerd/superagent-cli.svg" alt="Travis CI Badge"></img>

A command line interface for the <a href="https://github.com/visionmedia/superagent">superagent rest library</a>. 
Designed to make testing JSON apis from the command line easier.

to install:
```
npm install -g superagent-cli
```

the super agent cli command is `superagent` and requests look like the following:
```
superagent or superagent -h to display help
superagent <url> <rest method(get|post|put|patch|delete)> <json data>
superagent www.google.com
superagent www.google.com get
superagent localhost:3000 post '{"hello":"world"}'
superagent localhost:3000 post {hello: 'world'}
```

superagent-cli can also add basic HTTP Auth to any request with
with -u username:password
```
superagent -u username:password localhost:3000
```
superagent-cli can read json data from a file using the -f parameter.
```
superagent example.com/test post -f request_body.json
```