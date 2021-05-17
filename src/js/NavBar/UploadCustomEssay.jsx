import React from 'react'
import { useCustomEssay } from '../../customEssayContext.jsx'
const UploadCustomEssay = () => {
  const { dispatch } = useCustomEssay()
  const onChange = (e) => {
    const reader = new FileReader()
    reader.onload = (event) => {
      const data = JSON.parse(event.target.result)
      dispatch(data)
      console.log(data)
    }
    reader.readAsText(event.target.files[0])
  }
  return (
    <form>
      <div className="custom-file">
        <input type="file" className="custom-file-input" id="customFile" onChange={onChange} />
        <label className="custom-file-label" htmlFor="customFile">上傳自訂模板</label>
      </div>
    </form>
  )
}
export default UploadCustomEssay
