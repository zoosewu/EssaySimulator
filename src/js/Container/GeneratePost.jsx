import Brackets from '../../template/brackets.json'
const GeneratePost = (inputDatas, postTemplates) => {
  const template = GetTemplate(postTemplates)
  return ReplaceText(template, inputDatas)
}
function GetTemplate (postTemplates) {
  let template = ''
  for (let index = 0; index < postTemplates.length; index++) {
    const element = postTemplates[index]
    console.log(GetTemplate, index, element)
    template += element[getRandomInt(element.length)].join('\n') + '\n'
  }
  return template
}
function ReplaceText (post, inputDatas) {
  let newpost = post
  const bracket = GetRandomBracket()
  for (let index = 0; index < inputDatas.inputrule.length; index++) {
    const key = inputDatas.inputrule[index].id
    let input = inputDatas[key]
    const options = inputDatas.inputrule[index].options
    if (options && options.bracket) {
      input = AddBracket(input, bracket)
    }
    if (options && options.split) {
      newpost = ReplaceTextWithKeySplit(newpost, key, input)
    } else {
      newpost = ReplaceTextWithKey(newpost, key, input)
    }
  }
  // console.log("ReplaceText", post, inputDatas, newpost);
  return newpost
}
function GetRandomBracket () {
  return Brackets[getRandomInt(Brackets.length)]
}
function AddBracket (input, Bracket) {
  if (Bracket && Bracket.length > 1) {
    const PreBracket = Bracket.charAt(0)
    const PostBracket = Bracket.charAt(1)
    return PreBracket + input.replaceAll('\n', PostBracket + '\n' + PreBracket) + PostBracket
  } else { return input }
}
function ReplaceTextWithKeySplit (post, replaceKey, newtext) {
  let newpost = post
  const key = '#' + replaceKey
  const splitcount = GetSplitCount(post, key)
  const NewTextArray = SplitText(newtext, splitcount)
  for (let index = 0; index < NewTextArray.length; index++) {
    newpost = newpost.replace(key, NewTextArray[index])
    // console.log("replace", key, "->", NewTextArray[index]);
  }
  // console.log("ReplaceTextWithKeySplit", replaceKey, newtext, newpost);
  return newpost
}
function GetSplitCount (post, key) {
  const match = post.match(new RegExp(key, 'g'))
  if (match) { return match.length } else { return 0 }
}
function SplitText (text, outputCount) {
  const textarray = []
  const textes = text.split('\n')
  const SplitArray = GetRandomArray(textes.length, outputCount - 1)
  for (let i = 0; i < outputCount; i++) {
    let newtext = ''
    let SplitPosition = SplitArray[i]
    let LastSplitPosition = SplitArray[i - 1]
    if (i === 0) { LastSplitPosition = 0 } else if (i === outputCount) { SplitPosition = textes.length }
    newtext = textes.slice(LastSplitPosition, SplitPosition).join('\n')
    textarray.push(newtext)
  }
  // console.log("SplitText", text, outputCount, textarray);
  return textarray
}
function ReplaceTextWithKey (post, replaceKey, newtext) {
  const key = '#' + replaceKey
  // console.log("ReplaceTextWithKey", "replaceAll", key, "->", newtext);
  return post.replaceAll(key, newtext)
}
function GetRandomArray (max, count) {
  if (max <= count) {
    return GetIntArray(count)
  } else {
    return GetIntArrayRandomly(max, count)
  }
}
function GetIntArray (count) {
  const IntArray = []
  for (let i = 0; i < count; i++) { IntArray.push(i) }
  return IntArray
}
function GetIntArrayRandomly (max, count) {
  const IntArray = []
  while (IntArray.length < count) {
    const newint = getRandomInt(max - 1)
    if (IntArray.indexOf(newint) === -1) { IntArray.push(newint + 1) }
  }
  console.log('GetIntArrayRandomly', max, count, IntArray.sort())
  return IntArray.sort()
}
function getRandomInt (max) {
  return Math.floor(Math.random() * Math.floor(max))
}
export default GeneratePost
