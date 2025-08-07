this.config = {
  name: "run",
  version: "1.2.0",
  hasPermssion: 2,
  credits: "Quất , HuyKaiser fix",
  description: "running shell",
  commandCategory: "Admin",
  usages: "[Script]",
  cooldowns: 5,
  usePrefix: false,
};

this.run = async ({ api, event, args, Threads, Users, Currencies, models, permssion }) => {
  let r = require, [axios, fs, { log }] = [r('axios'), r('fs'), console],
    tpo = a => typeof a == "object" && Object.keys(a).length != 0 ? JSON.stringify(a, null, 4) : ['number', 'boolean'].includes(typeof a) ? a.toString() : a,
    send = a => api.sendMessage(tpo(a), event.threadID, event.messageID),
    get = async (url, params = {}) => (await axios.get(url, { params })).data,
    post = async (url, data = {}, config = {}) => (await axios.post(url, data, config)).data,
    put = async (url, data = {}, config = {}) => (await axios.put(url, data, config)).data,
    del = async (url, config = {}) => (await axios.delete(url, config)).data,
    read = file => fs.readFileSync(file, 'utf8'),
    write = (file, data) => fs.writeFileSync(file, typeof data === 'object' ? JSON.stringify(data, null, 2) : data),
    append = (file, data) => fs.appendFileSync(file, data),
    exists = file => fs.existsSync(file),
    mkdir = dir => fs.mkdirSync(dir, { recursive: true }),
    rmdir = dir => fs.rmSync(dir, { recursive: true, force: true }),
    list = dir => fs.readdirSync(dir),
    sleep = ms => new Promise(resolve => setTimeout(resolve, ms)),
    random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,
    pick = arr => arr[Math.floor(Math.random() * arr.length)],
    shuffle = arr => arr.sort(() => Math.random() - 0.5),
    unique = arr => [...new Set(arr)],
    chunk = (arr, size) => Array.from({length: Math.ceil(arr.length / size)}, (v, i) => arr.slice(i * size, i * size + size)),
    flatten = arr => arr.flat(Infinity),
    sum = arr => arr.reduce((a, b) => a + b, 0),
    avg = arr => sum(arr) / arr.length,
    min = arr => Math.min(...arr),
    max = arr => Math.max(...arr),
    now = () => Date.now(),
    date = format => new Date().toLocaleDateString('vi-VN', format ? {format} : {}),
    time = () => new Date().toLocaleTimeString('vi-VN'),
    timestamp = () => Math.floor(Date.now() / 1000),
    base64 = {
      encode: str => Buffer.from(str).toString('base64'),
      decode: str => Buffer.from(str, 'base64').toString('utf8')
    },
    hash = str => require('crypto').createHash('md5').update(str).digest('hex'),
    uuid = () => require('crypto').randomUUID(),
    env = key => process.env[key],
    exec = cmd => require('child_process').execSync(cmd, {encoding: 'utf8'}),
    json = {
      parse: str => JSON.parse(str),
      stringify: obj => JSON.stringify(obj, null, 2)
    }
  if (!args.length || args[0].toLowerCase() === 'help') {
    return send(`📚 HƯỚNG DẪN SỬ DỤNG LỆNH RUN

🌐 HTTP Requests:
• get(url, params) - GET request
• post(url, data, config) - POST request  
• put(url, data, config) - PUT request
• del(url, config) - DELETE request

📁 File Operations:
• read(file) - đọc file
• write(file, data) - ghi file
• append(file, data) - thêm vào file
• exists(file) - kiểm tra file tồn tại
• mkdir(dir) - tạo thư mục
• rmdir(dir) - xóa thư mục  
• list(dir) - liệt kê file trong thư mục

⚡ Array & Utils:
• sleep(ms) - delay
• random(min, max) - số ngẫu nhiên
• pick(arr) - chọn ngẫu nhiên từ array
• shuffle(arr) - xáo trộn array
• unique(arr) - loại bỏ trùng lặp
• chunk(arr, size) - chia array thành chunks
• flatten(arr) - làm phẳng array
• sum/avg/min/max(arr) - tính toán array

🕐 Time:
• now() - timestamp hiện tại
• date() - ngày hiện tại
• time() - giờ hiện tại  
• timestamp() - unix timestamp

🔐 Encoding/Hash:
• base64.encode/decode(str) - mã hóa base64
• hash(str) - MD5 hash
• uuid() - tạo UUID
• json.parse/stringify(data) - xử lý JSON

⚙️ System:
• env(key) - biến môi trường
• exec(cmd) - chạy lệnh shell
• send(data) - gửi tin nhắn
• log(data) - console.log
• mocky(data) - tạo mock API

📝 Ví dụ:
• ${global.config.PREFIX}run send(await get('https://api.github.com/users/octocat'))
• ${global.config.PREFIX}run write('test.txt', 'Hello World')
• ${global.config.PREFIX}run send(pick(['apple', 'banana', 'orange']))
• ${global.config.PREFIX}run send(random(1, 100))
• ${global.config.PREFIX}run send(hash('hello world'))`)
  }
  
  let mocky = async a => send((await axios.post("https://api.mocky.io/api/mock", {
    status: 200,
    content: tpo(a),
    content_type: 'application/json',
    charset: 'UTF-8',
    secret: 'Quất',
    expiration: 'never'
  })).data.link)
  try {
    let { sendMessage, editMessage, shareContact } = api,
      { threadID, messageID, senderID } = event
    send(await eval(`(async() => { ${args.join(' ')} })()`, {
      api, event, args, Threads, Users, Currencies,
      models, global, permssion,
      log, mocky, send, get, post, put, del,
      read, write, append, exists, mkdir, rmdir, list,
      sleep, random, pick, shuffle, unique, chunk, flatten,
      sum, avg, min, max, now, date, time, timestamp,
      base64, hash, uuid, env, exec, json,
      axios, fs, require,
      threadID, messageID, senderID,
      sendMessage
    }, true))
  } catch (e) {
    send(`⚠️ Lỗi: ${e.message}\n📝 Dịch: ${(await axios.get(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=vi&dt=t&q=${encodeURIComponent(e.message)}`)).data[0][0][0]}`)
  }
}
