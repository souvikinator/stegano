window.Tools = (function () {
    return {
        DecToBin: function (n) {
            if (n < 0 || n > 255 || n % 1 !== 0) {
                throw new Error(n + " does not fit in a byte");
            }
            return ("000000000" + n.toString(2)).substr(-8)
        }
        , BinToDec: function (n) {
            return parseInt(n, 2);
        }
        , StrToBin: function (n) {
            var dec_arr = [];
            var bits = [];
            if (typeof (n) === "string" && n.length > 0) {
                for (let i = 0; i < n.length; i++) {
                    dec_arr[i] = this.DecToBin(n[i].charCodeAt(0));
                    bits = bits.concat(dec_arr[i].split(''));
                }
            }
            return { dec_arr, bits };
        }
        , BinToChar: function (n) {
            var charCode = parseInt(n, 2);
            return String.fromCharCode(charCode);
        }
        , encode_utf8: function (s) {
            return unescape(encodeURIComponent(s));
        }
        , decode_utf8: function (s) {
            return decodeURIComponent(escape(s));
        }
        , encode_message: function (msg) {
            if (msg.length > 0 && typeof (msg) === "string") {
                msg = msg + "$t3g0";            //to detect the message adding delimeter at the end
            }
            //converting msg to binary and returning array containg msg in bits ;
            return {
                bin: this.StrToBin(msg).dec_arr,
                bits: this.StrToBin(msg).bits,
                encoded_msg: msg
            };
        }
        , decode_message: function (msg) {
            if (msg.length > 0 && typeof (msg) === "string") {
                /*seperate msg from delimeter and then decode msg*/
                if (msg.slice(msg.length - 5, msg.length) === "$t3g0") {
                    msg = m.slice(0, m.length - 5);
                } else {
                    console.log("cannot decode!! please open an issue on gitHub if req");
                    return false;
                }
                msg = atob(msg);          //decoding base64
                msg = this.decode_utf8(msg);   //decoding UTF-8
            }
            return msg;
        }
        , superimpose: function (imageD, msgD) {
            //imageD[i]=Tools.BinToDec(Tools.DecToBin(imageD[i]).slice(0,-1)+msD[i]);
            // console.log('initial image data:\n',imageD);
            var j = 0;
            for (let i = 0; i < imageD.length; i++) {
                if (j >= msgD.length) {
                    break;
                }
                if ((i + 1) % 4 === 0) {
                    continue;
                }
                imageD[i] = Tools.BinToDec(Tools.DecToBin(imageD[i]).slice(0, -1) + msgD[j]);
                j += 1;
            }
            // console.log('processed image data:\n',imageD);
            return imageD;
        }
        ,bitsToMsg: function(msg_bits){
            //converts bits-->8bits(1byte)-->charcode-->number/char
            var broken_msg=[],temp="",msg;
            for(let i=0;i<msg_bits.length;i++){
                temp+=msg_bits[i];
                if((i+1)%8===0){
                    broken_msg.push(Tools.BinToChar(temp));
                    temp="";
                }
            }

            for(let i=0;i<broken_msg.length;i++){
                msg+=broken_msg[i];
            }

            return msg;
        }
        , seperate: function (imageD) {
            var j = 0,msg_bits=[],_bin;
            for (let i = 0; i < imageD.length; i++) {
                if ((i + 1) % 4 === 0) {
                    continue;
                }
                _bin=Tools.DecToBin(imageD[i]);
                msg_bits.push(_bin.slice(_bin.length-1,_bin.length));
                j += 1;
            }
            return Tools.bitsToMsg(msg_bits);
        }
    };
}());

console.log(">>tools::active");