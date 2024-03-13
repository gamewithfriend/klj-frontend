class Builder {
    init() {
        Object.keys(this).forEach((key) => {
            const setterName = `set${key.substring(0,1).toUpperCase()}${key.substring(1)}`;
            
            // 상속 후 메서드 재정의를 할 수 있도록 구성
            if (!this[setterName]) {
                this[setterName] = (value) => {
                    this[key] = value;
                    return this;
                };
            }
        });
    }

    build() {
        return this;
    }
}
export default Builder;