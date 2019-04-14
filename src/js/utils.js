/**
 * 返回file对象的base64格式
 * @param {file} file file对象 
 */
function getBase64DataAsync(file) {
    if (!file) {
        // 没有选择文件
        alert('please select an image.')
        return
    }
    return new Promise((resolve, reject) => {
        var reader = new FileReader()
        reader.onload = function(e) {
            resolve(e.target.result)
        }
        reader.onerror = function(err) {
            reject(err)
        }
        // 开始读取文件
        reader.readAsDataURL(file)
    })
}



export { getBase64DataAsync }