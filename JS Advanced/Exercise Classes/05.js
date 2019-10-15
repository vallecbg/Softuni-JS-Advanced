(function() {
        let count = 0;
        return class Extensible{
            constructor(){
                this.id = count;
                count++;
            }
            extend(template){
                for(let parentProp of Object.keys(template)){
                    if(typeof(template[parentProp]) == "function"){
                        Object.getPrototypeOf(this)[parentProp] = template[parentProp];
                    } else {
                        this[parentProp] = template[parentProp];
                    }
                }
            }
        }
    }
)();