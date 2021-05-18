# 模板規則

這邊定義了src/template內資料夾的json定義，固定的檔案有```templates.json```以及```brackets.json```。

其餘的是自訂的模板檔案。

實際使用時可以直接複製專案內的模板後，再進行修改。有不清楚的地方再來這邊參考。

## templates.json

這邊定義了專案內部有哪些可以用文體模板。
使用的變數意義如下:
```
filename: 在template資料夾內的檔案名稱如filename.json
displayname: 顯示在Header的名稱
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
## 自訂.json
文體模板，這邊定義了這個文體有哪些輸入欄位以及文字模板，檔案名稱必須與```templates.json```內的filename相同。
上傳的自訂模板也是使用這邊的規則。
建議下載```src/template/emptytemplate.json```再修改。

使用的變數意義如下:
```
title: 文體標題，會顯示在葉面中央上方
inputrule: 輸入的欄位規則，網頁會根據inputrule產生欄位給使用者輸入
inputrule-id: 欄位辨識用的ID，會取代文章內的#id。
inputrule-description: 文章的描述，會告訴使用者這個欄位該輸入什麼
inputrule-type: 欄位類別，可以使用1.input單行輸入 2.textarea多行輸入
inputrule-options: 其他選項
inputrule-options-split: 是否分割，如果文章內出現很多次則會把多行文字切割後隨機分配
inputrule-options-bracket: 是否適用前後括號，如果設定為true的話每行行首及行尾都會加上括號
inputrule-hint: 欄位的提示用文字
template: 套用的模板文字
```
範例:
```
{
  "title": "文體標題",
  "inputrule": [
    {
      "id": "keyword1",
      "description": "單行輸入欄位",
      "type": "input",
      "hint": "提示文字"
    },
    {
      "id": "keyword2",
      "description": "多行輸入欄位",
      "type": "textarea",
      "options": {
        "split": true,
        "bracket": true
      },
      "hint": "提示文字\n可以用\\n換行"
    }
  ],
  "template": [
    [
      [
        "第一段",
        "模板一",
        "替換文字1:#keyword1",
        "第四行",
        ""
      ],
      [
        "第一段模板二單行，替換文字1#keyword1",
        ""
      ]
    ],
    [
      [
        "第二段",
        "模板一",
        "替換文字2:#keyword2",
        "第四行",
        ""
      ],
      [
        "第二段模板二單行，替換文字替換文字2:#keyword2",
        ""
      ],
      [
        "第二段模板三第一行",
        "替換文字#keyword1",
        ""
      ]
    ],
    [
      [
        "---",
        "每個段落可以根據需求設定模板數量",
        "也可以像這一段只有一個模板",
        "---",
        ""
      ]
    ],
    [
      [
        "第四段",
        "模板一",
        "替換文字1+2:#keyword1#keyword2",
        "第四行",
        ""
      ],
      [
        "第四段模板二單行，替換文字2+1:#keyword2#keyword1",
        ""
      ],
      [
        "第四段模板三第一行",
        "替換文字1+2:#keyword1#keyword2",
        ""
      ]
    ]
  ]
}
```
#### id欄位

id欄位盡量使用全小寫英文，並且盡量避免重複。

一個錯誤的使用方法
```
id:company -> XX股份有限公司
id:companyceo -> XX公司執行長
```
這樣#companyceo有可能會是```XX公司執行長(#companyceo)```或是```XX股份有限公司ceo("#company"ceo)```

#### inputrule-options-split欄位

多行文字是否要分割隨機分配給所有內容
```
id:userinput
=====================
11111111111
22222222222
33333333333
=====================

template:
[
 "#userinput",
 "段落第二行",
 "#userinput",
 "段落第四行",
],
```
以上面為例，如果為true的話，輸入的文字會依序隨機分配給所有取代的內容變成
```
11111111111
段落第二行
22222222222
33333333333
段落第四行
```
如果為false或沒有設定的話，輸入的文字會完全取代每一個內容變成
```
11111111111
22222222222
33333333333
段落第二行
11111111111
22222222222
33333333333
段落第四行
```

#### template欄位

文章模板，以陣列表示每個段落，每個段落至少放入一個陣列。
生成器會從每個段落的所有陣列中隨機挑出一個然後合併為一篇文章。

例如
```
[
　[
    (段落1)
　],
　[
　 (段落2)
　],
　[
　 (段落3)
　],
]
```
#### 段落欄位

段落欄位，以陣列表示這一段的內容，每個元素之間都會自動補換行符號。
文章內的#id之後都會被使用者輸入的文字取代。
如果有超過一篇文章的話每次輸出都會隨機挑一篇來生成。

例如
```
[
　[
　 "第一段模板一",
　 "#firstinput",
　 "第一段模板一第三行",
　 "#firstinput",
　 "#secondinput",
　 "第一段模板一第六行",
　 "#secondinput",
　],
　[
　 "第一段模板二",
　 "#firstinput#secondinput",
　 "第一段模板二第三行",
　],
],
[
　[
　 "第二段模板一",
　 "#firstinput",
　 "第二段模板一第三行",
　 "#firstinput",
　 "#secondinput",
　 "第二段模板一第六行",
　 "#secondinput",
　],
　[
　 "第二段模板二#firstinput#secondinput",
　]
],
[
　[
　 "第三段模板一",
　]
]
```
## brackets.json
這邊定義了有哪些可以用的行首及行尾
如果多行輸出並且```inputrule-options-bracket:true```的話，會幫每一行加上引號。
