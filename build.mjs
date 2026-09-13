import fs from 'node:fs';import path from 'node:path';import {fileURLToPath} from 'node:url';
import * as render from './src/render-v5.mjs';
const root=path.dirname(fileURLToPath(import.meta.url));const read=n=>JSON.parse(fs.readFileSync(path.join(root,'src',n),'utf8'));
const profiles=read('profiles.json'),readings=read('readings.json');const dist=path.join(root,'dist');fs.rmSync(dist,{recursive:true,force:true});fs.mkdirSync(dist,{recursive:true});fs.cpSync(path.join(root,'public'),dist,{recursive:true});
fs.writeFileSync(path.join(dist,'data.js'),'export const profiles='+JSON.stringify(profiles)+';export const readings='+JSON.stringify(readings)+';');
fs.copyFileSync(path.join(root,'src/render-v5.mjs'),path.join(dist,'render.js'));fs.copyFileSync(path.join(root,'src/daymaster.mjs'),path.join(dist,'daymaster.js'));
function page(route,body,title){const dir=path.join(dist,route);fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(path.join(dir,'index.html'),render.document(body,title))}
page('',render.home(profiles),'认识你的八字日主');page('result',render.emptyResult(),'我的日主');for(const p of profiles)page('type/'+p.id,render.detail(p,readings),p.dayMaster+' · '+p.name);
fs.writeFileSync(path.join(dist,'404.html'),render.document('<main class="wrap section"><h1>这一页还没有记录</h1><p>回到图鉴，继续认识十种日主。</p><a class="button" href="/">返回首页</a></main>','页面未找到'));
console.log('Built 12 single-render pages. The birthday checker lives on the homepage only.');
