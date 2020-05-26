const Koa = require('koa');
const app = new Koa();
const fs = require('fs');
const { exec } = require('child_process');

const config=require('./config/config');


app.use(async ctx => {
  let content=fs.readFileSync(`${config.logDir}access.log`,"utf-8")
  if(ctx.path.trim()==="/error"){
    content=fs.readFileSync(`${config.logDir}error.log`,"utf-8")
  }

  ctx.body = content;
});


app.use(async ctx => {
  let content;
  if(ctx.path.trim()==="/error"){
    content=fs.readFileSync(`${config.logDir}error.log`,"utf-8")
  }
  else if(ctx.path.trim()==="/reload"){
    let buffer=execSync("ls -l");
    content="reload"+buffer.toString();
  }
  else{
    content=fs.readFileSync(`${config.logDir}access.log`,"utf-8")
  }
  ctx.body = content;
});


app.listen(3500, () => {
  console.log("listening on 3500");
});