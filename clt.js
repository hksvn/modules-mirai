module.exports.config = {
    name: "chuilientuc",
    version: "1.0.2",
    hasPermssion: 1,
    credits: "HuyKaiser",
    description: "Chửi liên tục n lần",
    commandCategory: "admin",
    usages: "tag",
    cooldowns: 5
};

module.exports.run = async ({ api, event, mentions }) => {
    const id = Object.keys(mentions)[0],
          name = mentions[id].replace("@", ""),
          msg = [
            "Alo con đĩ lồn kia {n}",
            "Mày chết mày với tao rồi",
            "Lắng cái lỗ tai lên nghe nè con chó",
            "D!t con mẹ mày {n}",
            "Mày ra đây tao bảo {n}",
            "Hiện hồn nhanh con chó {n}",
            "Hiện hồn bố mày hỏi tội {n}",
            "Mày trốn khi nào mới hiện hồn đây {n}",
            "Con cặc đụ má mày làm sao {n}",
            "Ngon mà ra đây chửi 1 - 1 với tao {n}",
            "Tao ném trứng thối đổ dầu đổ xăng vào nhà mày giờ {n}",
            "Con cặc địt mẹ mày {n}",
            "Bố mày ỉa lên đầu mày nè con chó {n}",
            "Bố mày bắn rap chết cụ mày giờ {n}",
            "Mày vẫn đéo dám ra à! {n}",
            "Sao nay hèn vậy con chó {n}",
            "Vậy thì xin mời nghe tao rap địt chết cả lò mày nha con {n}",
            "Trước đó cho tao xin nghỉ 1p nhé {n}",
            "Đầu tiên tao xin phép địt từ trên xuống dưới con {n}",
            "Tao địt từ lỗ lồn đến lỗ nhị con lồn {n}",
            "Tao địt chắc 2 thằng như tao chưa đủ lấp cái lỗ lồn nhà mày đâu {n}",
            "Tao mệt rồi đéo chửi nữa {n}",
            "Nào ông chủ update lyrics thì chửi tiếp nhé {n}",
            "Cảm ơn bạn đã nghe mình chửi nha {n}",
            "Xin chào và hẹn gặp lại bạn ở chương trình lần sau nha {n}",
            "Chào tạm biệt 🥺 {n}",
            "Và không hẹn gặp lại nha con chó {n}"
          ];

    msg.forEach((m, i) => setTimeout(() =>
        api.sendMessage({
            body: m.replaceAll("{n}", name),
            mentions: [{ tag: name, id }]
        }, event.threadID, event.messageID),
        i * 4000
    ));
};

