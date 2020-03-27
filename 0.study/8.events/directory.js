const fs = require('fs');
const path = require('path');
// 创建目录 同步
let mkdirSync = (p) => {
  if (!path) return
  let arr = p.split('/')
  for (let i = 0; i < arr.length; i++) {
    let current = arr.slice(0, i + 1).join('/')
    try {
      fs.accessSync(current)
    } catch {
      fs.mkdirSync(current)
    }
  }
}
mkdirSync('ad/d/e')
// 创建目录 异步
let mkdir = (p, callback) => {
  if (!p) return
  let arr = p.split('/')
  let index = 0
  let next = () => {
    if (index === arr.length) return callback()
    let current = arr.slice(0, index + 1).join('/')
    fs.access(current, err => {
      index++
      if (err) {
        fs.mkdir(current, next)
      } else {
        next()
      }
    })
  }
  next()
}
// mkdir('e/f/g/u',function() {console.log('我创建完啦')})

// 删除目录 深度遍历
let rmDirDeepSync = (p) => {
  let statobj = fs.statSync(p)
  if (statobj.isDirectory()) {
    let dirs = fs.readdirSync(p)
    dirs.forEach(dir => {
      let current = path.join(p, dir)
      rmDirDeepSync(current)
    })
    fs.rmdirSync(p)
  } else {
    fs.unlinkSync(p)
  }
}
//rmDirDeepSync('e')

// 删除目录 广度遍历
let rmDirWideSync = (p) => {
  let arr = [p]
  let index = 0
  let current
  while(current = arr[index++]) {
    let statobj = fs.statSync(current)
    if(statobj.isDirectory()) {
      let dirs = fs.readdirSync(current)
      dirs = dirs.map(dir => path.join(current,dir))
      arr = [...arr,...dirs]
    }
  }
  for(let i = arr.length -1; i >= 0; i--) {
    let current = arr[i];
    let statobj = fs.statSync(current)
    if(statobj.isDirectory()) {
      fs.rmdirSync(current)
    }else {
      fs.unlinkSync(current)
    }
  }
  console.log(arr)
}
rmDirWideSync('ad')