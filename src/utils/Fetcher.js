import HduoError from './Error.js';
import Builder from './Builder.js';

/**
 * 이 클래스는 비동기 통신을 용이하게 하기 위한 class 입니다.
 */

class Fetcher extends Builder{
    /**
     * @param (string) url - 서버 통신 url
     * @param (string) method - 서버 통신 방법(method)
     * @param (json) data - 서버에 보낼 데이터
     * @param (string) contentType - 서버 통신 헤더, 기본 application/json
     * @param (string) charset - 서버요청 encoding, 기본 utf-8
     * @param (string) accessToken - oAuth 인증 후 서버 발급 토큰
     */
    constructor() {
        super();

        this.url = process.env.REACT_APP_TESTBED_URI;
        this.method = null;
        this.data = null;
        this.contentType = "application/json;";
        this.charset = "charset=utf-8";
        this.accessToken = null;

        super.init();
    }

    // override 된 함수 반환
    setMethod(method) {
        this.method = method.toUpperCase();

        return this;
    }

    setUrl(url) {
        this.url += url;

        return this;
    }

    /**
     * json으로 서버와 통신하기 위한 메서드
     * @returns {json} 서버통신 결과를 json 형식으로 return한다.
     */
    async jsonFetch() {
        // 변수 선언부
        let paramUrl;
        let response;

        // 먼저 데이터가 json 형식인지 체크
        if (!this.isJsonString()) {
            throw new Error("json 형식 데이터를 입력해주세요.");
        }
        
        // 메소드 방식에 따라 
        if(this.method == "GET" || this.method == "DELETE") {
            if (this.data !=null && this.data != undefined) {
                const queryParams = new URLSearchParams(JSON.parse(this.data));
                paramUrl = this.url + "?" + queryParams;
            } else {
                paramUrl = this.url;
            }
            response = await this._urlFecth(paramUrl);
        } else if (this.method == "POST" || this.method == "PUT") {
            paramUrl = this.url;
            response = await this._bodyFecth(paramUrl);
        }
        return response;       
    }

    /**
     * formData로 서버와 통신하기 위한 메서드
     * @returns {json} 서버통신 결과를 json 형식으로 return한다.
     */
    async formDataFetch() {
        // 변수 선언부
        let paramUrl;
        let response;

        // 먼저 데이터가 json 형식인지 체크
        if (!this.isJsonString()) {
            throw new Error("json 형식 데이터를 입력해주세요.");
        }
        
        // 메소드 방식에 따라 
        if(this.method == "GET" || this.method == "DELETE") {
            throw new Error("multiPart 방식은 POST 또는 PUT 방식을 이용해주세요.");
        } else if (this.method == "POST" || this.method == "PUT") {
            paramUrl = this.url;
            this.contentType = "multipart/form-data";
            response = await this._bodyFecth(paramUrl);
        }
        return response;       
    }

    /**
     * get/delete 방식의 http 요청을 보낼 때 사용 하는 함수
     * @param {string} paramUrl
     */
    async _urlFecth(paramUrl) {
        try {
            console.log(this.headers)
            const response = await fetch(paramUrl, {
                method: this.method,
                //headers: this.headers,
                headers: {
                    'Content-type':`${this.contentType}${this.charset}`,
                    'Authorization': `Bearer ${this.accessToken}`
                },
                }).then(response => response.json());

            // API 통신 규격에 따라 error메세지가 있을 경우 에러 throw
            if (response.error != null) {
                throw new HduoError("오류가 발생했습니다.");
            }
            return response;
        } catch (e) {
            console.log("error 발생", e, e.message);

            if (e instanceof HduoError) {
                alert(e.message);
            }
            // 에러를 발생시켜 프로그램을 중단
            throw new Error(e);
        }
    }

    /**
     * post/put 방식의 http 요청을 보낼 때 사용 하는 함수
     * @param {string} paramUrl
     */
    async _bodyFecth(paramUrl) {
        try {
            const response = await fetch(paramUrl, {
                method: this.method,
                headers: {
                    'Content-type':`${this.contentType}${this.charset}`,
                    'Authorization': `Bearer ${this.accessToken}`
                },
                body: this.data
                }).then(response => response.json());

            // API 통신 규격에 따라 error메세지가 있을 경우 에러 throw
            if (response.error != null) {
                throw new HduoError("오류가 발생했습니다.");
            }
            return response;
        } catch (e) {
            console.log("error 발생", e, e.message);
            if (e instanceof HduoError) {
                alert(e.message);
            }
            // 에러를 발생시켜 프로그램을 중단
            throw new Error(e);
        }
    }

    /**
     * 파라미터의 타입이 json인지 여부를 확인하는 method
     * @returns {boolean} data의 json데이터 여부
     */
    isJsonString() {
        let isJsonData = false;
        try {
            // 데이터가 없이 전송될 수도 있기 때문에 예외 로직을 넣어준다.
            if (this.data != null && this.data != undefined) {
                let convData = JSON.parse(this.data);
                if (typeof convData === "object") {
                    isJsonData = true;
                }
            } else {
                isJsonData = true;
            }
        } catch (e) {
            isJsonData = false;
        }
        return isJsonData
    }
}
export default Fetcher;