const fs = require("fs");
const readline = require("readline");
const { translate } = require("free-translate");

const rl = readline.createInterface({
  input: fs.createReadStream("./texts/text.txt"),
});

const writeStreamEn = fs.createWriteStream("./texts/en.translate.txt");
const writeStreamCn = fs.createWriteStream("./texts/cn.translate.txt");

const translateText = async () => {
  for await (const line of rl) {
    if (line.length) {
      const translatedInEnglish = await translate(line, {
        from: "ru",
        to: "en",
      });
      await writeStreamEn.write(translatedInEnglish + "\n");

      console.log(translatedInEnglish);

      const translatedInChinese = await translate(line, {
        from: "ru",
        to: "zh-CN",
      });
      await writeStreamCn.write(translatedInChinese + "\n");

      console.log(translatedInChinese);
    } else {
      await writeStreamEn.write("\n");
      await writeStreamCn.write("\n");
    }
  }
};

translateText();
