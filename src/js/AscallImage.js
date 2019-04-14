import { getBase64DataAsync } from './utils'
import { GRAY_ASCALL } from '../config/index'
export default class AscallImage {
     constructor(img) {
         // img file对象
         this.img = img

     }

     // 打印对象的base64 data
     async printData() {
         const data = await getBase64DataAsync(this.img)
         console.log(data)
     }

     // 打印图片的canvas
     async drawPicture() {
         var image = new Image()
         var _self = this
         image.src = await getBase64DataAsync(this.img)
         image.onload = function() {
            // 灰度数组
            var grayArr = []
            var cvs = document.createElement('canvas')
            var ctx = cvs.getContext('2d')
            cvs.width = image.width
            cvs.height = image.height
            ctx.drawImage(image, 0, 0, cvs.width, cvs.height)
            var imageData = ctx.getImageData(0, 0, cvs.width, cvs.height)
            var pxData = imageData.data
            for(var i = 0; i < cvs.width * cvs.height; i++){
                //灰度滤镜
                var r = pxData[4*i+0];
                var g = pxData[4*i+1];
                var b = pxData[4*i+2];
                //计算灰度的公式
                var gray = 0.3*r + 0.6*g + 0.1*b;
                grayArr.push(gray)
                pxData[4*i+0] = gray;
                pxData[4*i+1] = gray;
                pxData[4*i+2] = gray;
            }
            // console.log(grayArr, cvs.width, cvs.height)
            // 灰度的取整
            var grayArrFinal = grayArr.map(function(i) {
                return Math.floor( GRAY_ASCALL.length - 1 - i / 255 * (GRAY_ASCALL.length - 1) )
            })
            // console.log('321', grayArrFinal, GRAY_ASCALL.length)


            ctx.putImageData(imageData, 0, 0, 0, 0, cvs.width, cvs.height);
            document.getElementById('section-show-image').appendChild(cvs)
            _self._drawAscall(grayArrFinal, cvs.width, cvs.height)
         }
     }

     // 打印ascall码字符画
     _drawAscall(grayArr, width, height) {
         var oAscallWrapper = document.createElement('div')
         oAscallWrapper.classList.add('ascall-wrapper')
         for( var i = 0; i < height; i++ ) {
            var oRow = document.createElement('div')
            oRow.classList.add('ascall-row')
            for( var j = 0; j < width; j++ ) {
                // oRow.innerText += GRAY_ASCALL[grayArr[width * i + j]]
                var oSpan = document.createElement('span')
                oSpan.innerText = GRAY_ASCALL[grayArr[width * i + j]]
                oRow.appendChild(oSpan)
                if(!GRAY_ASCALL[grayArr[width * i + j]]) {
                    console.error('error: ' + grayArr[width * i + j], width * i + j)
                    return
                }
            }
            oAscallWrapper.appendChild(oRow)
         }
         document.getElementById('section-show-image').appendChild(oAscallWrapper)
     }
}