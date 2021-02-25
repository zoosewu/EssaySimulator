import './scss/main.scss';
import 'bootstrap';
var Template = [
  `#yourname今天跟#friendsname在#where

剛好聽到旁邊的人在講#what

#yourname一邊吃飯一邊一邊說:
#yourresponse

只見#friendsname仔眼眶泛紅看起來即將淚崩，一邊哽咽一邊抓著#yourname的衣領對#yourname吼叫：
#hisresponse

說著#friendsname就坐在地上崩潰大哭，嘴裡還含糊念著：
#hisresponse

有沒有卦`
  ,
  `如提

#yourname今天在#where剛好聊到#what

#yourname開玩笑跟#friendsname說:
#yourresponse

結果#friendsname不知道是不是反應過度

直接把手上的碗往#yourname的方向丟過來

而且眼眶泛淚、面紅耳赤、神情激動的敲桌子

語帶哽咽的咆嘯:
#hisresponse

接著就抓起#yourname的衣領一邊對#yourname扣帽子一邊翻開#yourname的口袋
#hisresponse

#friendsname突然這樣大鬧害#yourname不知道該講什麼

大家都看著#friendsname好像快哭了

現場氣氛變得很尷尬該怎麼辦

有沒有卦`,
  `如提

今天發現#what

#yourname感到與有榮焉

但是#friendsname卻開始酸言酸語唱衰詛咒:
#friendthinking

#yourname跟#friendsname說:
#yourresponse

結果還沒等#yourname講玩，#friendsname直接一拳灌到#yourname臉上

面紅耳赤而且眼眶泛淚對#yourname怒吼:
#hisresponse

#yourname看#friendsname反應這麼大真的嚇到了

#friendsname現在好像氣到快哭了

#yourname該怎麼辦

有沒有卦
`
];
var ReplaceRules = [
  { key: "yourname" },
  { key: "friendsname" },
  { key: "where" },
  { key: "what" },
  { key: "friendthinking", split: true, Bracket: true },
  { key: "yourresponse", split: true, Bracket: true },
  { key: "hisresponse", split: true, Bracket: true }];
var Brackets = ["「」", "【】", `""`, "''", "『』", "〔〕",];
function change_title() {
  document.title = '朋友體模擬器';
}
function AddEventListener() {
  document.getElementById("createpost").addEventListener("click", CreatePost);
}
function CreatePost() {
  let userinputs = GetUserInputs();
  let template = GetTemplate();
  let newpost = GetReplacedText(template, userinputs);
  console.log(newpost);
  document.getElementById("post").innerHTML = newpost;
}

function GetUserInputs() {
  let inputs = [];
  const Bracket = GetRandomBracket();
  for (let index = 0; index < ReplaceRules.length; index++) {
    const rule = ReplaceRules[index];
    let input = document.getElementById(rule.key).value;
    if (rule.Bracket) {
      input = AddBracket(input, Bracket);
    }
    inputs.push(input);
  }
  return inputs;
}
function GetTemplate() {
  return Template[getRandomInt(Template.length)];
}
function AddBracket(input, Bracket) {
  const PreBracket = Bracket.charAt(0);
  const PostBracket = Bracket.charAt(1);
  return PreBracket + input.replaceAll("\n", PostBracket + "\n" + PreBracket) + PostBracket;
}
function GetRandomBracket() {
  return Brackets[getRandomInt(Brackets.length)];
}
function GetReplacedText(post, userinputs) {
  let newpost = post;
  for (let index = 0; index < userinputs.length; index++) {
    const replacerule = ReplaceRules[index];
    console.log("GetReplacedText", replacerule);
    if (replacerule.split) {
      newpost = ReplaceTextWithSplit(newpost, replacerule, userinputs[index]);
    }
    else {
      newpost = ReplaceText(newpost, replacerule, userinputs[index]);
    }
  }
  return newpost;
}
function ReplaceTextWithSplit(post, replacerule, newtext) {
  let newpost = post;
  const key = "#" + replacerule.key;
  const splitcount = GetSplitCount(post, key);
  const NewTextArray = SplitText(newtext, splitcount);
  for (let index = 0; index < NewTextArray.length; index++) {
    newpost = newpost.replace(key, NewTextArray[index]);
    console.log("ReplaceTextWithSplit", "replace", index, NewTextArray[index]);
  }
  console.log("ReplaceTextWithSplit", key, splitcount, NewTextArray, post, newpost);
  return newpost;
}
function GetSplitCount(post, key) {
  let match = post.match(new RegExp(key, "g"));
  if (match)
    return match.length;
  else
    return 0;
}
function ReplaceText(post, replacerule, newtext) {
  const key = "#" + replacerule.key;
  console.log("ReplaceText", key, post);
  return post.replaceAll(key, newtext);
}
function SplitText(text, outputCount) {
  const textarray = [];
  const textes = text.split('\n');
  const SplitArray = GetRandomArray(textes.length, outputCount - 1);
  for (let i = 0; i < outputCount; i++) {
    const newtext = "";
    if (i === 0) {
      const SplitPosition = SplitArray[i];
      newtext = textes.slice(0, SplitPosition).join('\n');
    }
    else if (i === outputCount) {
      const LastSplitPosition = SplitArray[i - 1];
      newtext = textes.slice(LastSplitPosition, textes.length).join('\n');
    }
    else {
      const SplitPosition = SplitArray[i];
      const LastSplitPosition = SplitArray[i - 1];
      newtext = textes.slice(LastSplitPosition, SplitPosition).join('\n')
    }
    textarray.push(newtext);
  }
  console.log("SplitText", textarray, SplitArray, textes);
  return textarray;
}
function GetRandomArray(max, count) {
  if (max <= count) {
    return GetIntArray(count);
  }
  else {
    return GetIntArrayRandomly(max, count);
  }
}
function GetIntArray(count) {
  const IntArray = [];
  for (let i = 0; i < count; i++) { IntArray.push(i); }
  return IntArray;
}
function GetIntArrayRandomly(max, count) {
  const IntArray = [];
  while (IntArray.length < count) {
    const newint = getRandomInt(max - 1);
    if (IntArray.indexOf(newint) === -1)
      IntArray.push(newint + 1)
  }
  return IntArray.sort();
}
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
(function () {
  change_title();
  AddEventListener();
})();