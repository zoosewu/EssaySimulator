import './scss/main.scss';
var template = [
  "#0今天跟#1在#2\n\n剛好聽到旁邊的人在講#3\n\n#0一邊吃飯一邊一邊說:\n#4\n\n只見#1仔眼眶泛紅看起來即將淚崩，一邊哽咽一邊抓著我的衣領對我吼叫：\n#5\n\n說著#1就坐在地上崩潰大哭，嘴裡還含糊念著：\n#6\n\n有沒有卦"
];

function change_title() {
  document.title = '朋友體模擬器';
}
function AddEventListener() {
  document.getElementById("createpost").addEventListener("click", CreatePost);
}
function CreatePost() {
  let userinputs = GetUserInputs();
  let newpost = ReplaceText(template[0], userinputs);
  console.log(newpost);
  document.getElementById("post").innerHTML  = newpost;
}
function GetUserInputs() {
  let inputs = [
    document.getElementById("yourname").value,
    document.getElementById("who").value,
    document.getElementById("where").value,
    document.getElementById("what").value,
    document.getElementById("yourres").value,
  ]
  const hisreses = SplitText(document.getElementById("hisres").value);
  return inputs.concat(hisreses);
}
function SplitText(text) {
  const textes = text.split('\n');
  const splitpos = getRandomInt(textes.length - 1) + 1;
  console.log(textes, splitpos);
  const text1 = textes.slice(0, splitpos).join('\n');
  const text2 = textes.slice(splitpos, textes.length).join('\n');
  console.log(textes);
  console.log(text1);
  console.log(text2);
  return [text1, text2];
}
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
function ReplaceText(post, replace) {
  let newpost = post;
  for (let index = 0; index < replace.length; index++) {
    newpost = newpost.replaceAll("#" + index, replace[index]);
  }
  return newpost;
}
(function () {
  change_title();
  AddEventListener();
})();