# 模板規則

這邊定義了src/template內資料夾的json定義，固定的檔案有```templates.json```以及```brackets.json```。
剩下的都是自訂的模板檔案。
實際使用時可以直接複製專案內的模板後，再進行修改。有不清楚的地方再來這邊參考。

## templates.json

這邊定義了專案內部有哪些可以用文體模板。
使用的變數意義如下:
```
filename:在template資料夾內的檔案名稱如filename.json
displayname:顯示在Header的名稱
```
範例:
```
[
  {
    "filename": "template1",
    "displayname": "朋友體"
  },
  {
    "filename": "komicaqua",
    "displayname": "惡靈Q走體"
  }
  ,
  {
    "filename": "idcc",
    "displayname": "IDCC體"
  }
]
```
## friend.json
文體模板，這邊定義了這個文體有哪些輸入欄位以及文字模板，檔案名稱必須與```templates.json```內的filename相同。
使用的變數意義如下:
```
title:文體標題，會顯示在葉面中央上方
inputrule:輸入的欄位規則，網頁會根據inputrule產生欄位給使用者輸入
inputrule-id:欄位辨識用的ID，會取代文章內的#id。
inputrule-description:文章的描述，會告訴使用者這個欄位該輸入什麼
inputrule-type:欄位類別，可以使用1.input單行輸入 2.textarea多行輸入
inputrule-options:其他選項
inputrule-options-split:是否分割，如果文章內出現很多次則會把多行文字切割後隨機分配
inputrule-options-bracket:是否適用前後括號，如果設定為true的話每行行首及行尾都會加上括號
inputrule-hint:欄位的提示用文字
template:套用的模板文字
```
範例:
```
"title": "朋友體",
"inputrule": [
 {
  "id": "firstinput",
  "description": "第一個單行輸入欄",
  "type": "input",
  "hint": "第一個多行輸入欄文字提示"
 }
 {
  "id": "secondinput",
  "description": "第二個多行輸入欄",
  "type": "textarea",
  "options": {
    "split": true,
    "bracket": true
  },
  "hint": "第二個多行輸入欄文字提示"
 },
],
"template": [
 [
  "第一篇第一行",
  "#firstinput",
  "第一篇第三行",
  "#firstinput",
  "#secondinput",
  "第一篇第六行",
  "#secondinput",
 ],
 [
  "第二篇第一行",
  "#firstinput",
  "#secondinput",
  "第二篇第四行",
 ],
]
```
#### id欄位

id欄位盡量使用全小寫英文，並且盡量避免重複。

一個錯誤的使用方法
```
id:company -> XX股份有限公司
id:companyceo -> XX公司執行長
```
這樣#companyceo有可能會是```"#companyceo" -> XX公司執行長```或是```"#company"ceo -> XX股份有限公司ceo```

#### inputrule-options-split欄位

多行文字是否要分割隨機分配給所有內容
```
id:userinput
=====================
使用者輸入第一行
使用者輸入第二行
使用者輸入第三行
=====================

template:
[
 "#userinput",
 "文章第二行",
 "#userinput",
 "文章第四行",
],
```
以上面為例，如果為true的話，輸入的文字會隨機分配給所有取代的內容變成
```
使用者輸入第一行
文章第二行
使用者輸入第二行
使用者輸入第三行
文章第四行
```
如果為false或沒有設定的話，輸入的文字會完全取代每一個內容變成
```
使用者輸入第一行
使用者輸入第二行
使用者輸入第三行
文章第二行
使用者輸入第一行
使用者輸入第二行
使用者輸入第三行
文章第四行
```

#### template欄位

文章模板，以陣列表示一篇文章，每行都是一個元素。
文章內的#id之後都會被使用者輸入的文字取代。
如果有超過一篇文章的話每次輸出都會隨機挑一篇來生成。

例如
```
[
　[
　 "第一篇第一行",
　 "#firstinput",
　 "第一篇第三行",
　 "#firstinput",
　 "#secondinput",
　 "第一篇第六行",
　 "#secondinput",
　],
]
```
## brackets.json
這邊定義了有哪些可以用的行首級行尾
