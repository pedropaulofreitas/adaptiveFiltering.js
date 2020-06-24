/** 
 Class WavParser
 @Class WavParser
*/

export class WavParser {    
    EMPTY: number;
    LOADING: number;
    DONE: number;
    UNSUPORTED_FORMAT: number;

    readyState: number;
    error: number;

    // original File and loaded ArrayBuffer
    file: Blob;
    buffer: ArrayBuffer;

    // format 
    chunkId: string;
    format: string;
    bitsPerSample: number;

    // data chunk
    dataOffset: number;
    dataLength: number;

    constructor(file) {
        this.EMPTY = 0;
        this.LOADING = 1;
        this.DONE = 2;
        this.UNSUPORTED_FORMAT = 3;
        this.readyState = this.EMPTY;
        this.error = undefined;
        this.file = file instanceof Blob? file : undefined;
        this.buffer = file instanceof ArrayBuffer ? file : undefined;
        this.chunkId = undefined;
        this.format = undefined;
        this.bitsPerSample = undefined;
        this.dataOffset = -1;
        this.dataLength = -1;
        this.peek();
    }

    peek() {
        this.readyState = this.LOADING;

        // see if buffer is already loaded
        if (this.buffer !== undefined) {
          return this.parseArrayBuffer();
        }
        
        let reader = new FileReader();
        let that = this;
        
        reader.readAsArrayBuffer(this.file);
        
        reader.onloadend = function(batata) {  
          that.buffer =  this.result as ArrayBuffer;
          that.parseArrayBuffer.apply(that);
        };
    }

    onloadend(callback, scope){
        // callback();
        // return this
    }

    parseArrayBuffer = function () {
        try {
          this.parseHeader();
          this.parseData();
          this.parseSamples();
          this.readyState = this.DONE;
        }
        catch (e) {
          this.readyState = this.UNSUPPORTED_FORMAT;
          this.error      = e;
        } 

        // console.log(this);

        // trigger onloadend callback if exists
        if (this.onloadend) {
            //   this.onloadend.apply(this)
            this.onloadend(this, this.that);
        }
    };

    /**
     * Walk through RIFF and WAVE format chunk
     * Based on https://ccrma.stanford.edu/courses/422/projects/WaveFormat/
     * and http://www.sonicspot.com/guide/wavefiles.html
     */
    parseHeader = function () {
   
        this.chunkID       = this.readText(0, 4);
        if (this.chunkID !== 'RIFF') throw 'NOT_SUPPORTED_FORMAT';
        
        this.format        = this.readText(8, 4);
        if (this.format !== 'WAVE') throw 'NOT_SUPPORTED_FORMAT';
    
        this.bitsPerSample = this.readDecimal(34, 2);
    };
    
    /**
     * Walk through all subchunks and look for the Data chunk
     */
    parseData = function () {
    
        var chunkType = this.readText(36, 4);
        var chunkSize = this.readDecimal(40, 4);
        
        // only support files where data chunk is first (canonical format)
        if (chunkType === 'data') {
        this.dataLength = chunkSize;
        this.dataOffset = 44;
        }
        else {
        // duration cant be calculated && slice will not work
        throw 'NOT_CANONICAL_FORMAT: unsupported "' + chunkType + '"" chunk - was expecting data';
        }
    };
    
    /** direct access to  samples
     **/
    parseSamples = function () {
    
        if (this.bitsPerSample === 8)
        this.dataSamples = new Uint8Array(this.buffer, this.dataOffset);
        else if (this.bitsPerSample === 16)
        this.dataSamples = new Int16Array(this.buffer, this.dataOffset);
    
    }
    
    
    /**
     * Reads slice from buffer as String
     */
    readText = function (start, length) {
        var a = new Uint8Array(this.buffer, start, length);
        var str = '';
        for(var i = 0; i < a.length; i++) {
        str += String.fromCharCode(a[i]);
        }
        return str;
    };
    
    /**
     * Reads slice from buffer as Decimal
     */
    readDecimal = function (start, length) {
        var a = new Uint8Array(this.buffer, start, length);
        return this.fromLittleEndianDecBytes(a);
    };
    
    /**
     * Calculates decimal value from Little-endian decimal byte array
     */
    fromLittleEndianDecBytes = function (a) {
        var sum = 0;
        for(var i = 0; i < a.length; i++)
        sum |= a[i] << (i*8);
        return sum;
    };
    
    /**
     * Populate Little-endian decimal byte array from decimal value
     */
    tolittleEndianDecBytes = function (a, decimalVal) {
        for(var i=0; i<a.length; i++) {
        a[i] = decimalVal & 0xFF;
        decimalVal >>= 8;
        }
        return a;
    };
    
    
    /**
     * Slice the File using either standard slice or webkitSlice
     */
    sliceFile = function (start, end) {
        if (this.file.slice) return this.file.slice(start, end); 
        if (this.file.webkitSlice) return this.file.webkitSlice(start, end);
    };

}