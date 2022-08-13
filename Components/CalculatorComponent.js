Vue.component("buttons-calculator",{
props:['value','name'],
template:`
    <button type="button" class="btn btn-primary" v-on:click="$emit('set-value-calc',value)">{{name}}</button>
`
})

var ComponentMain = new Vue({
el: '#ComponentMain',
data: {
    buttons:null,
    firstValue: "",
    secondValue: "",
    resultCalc:null,
    operatorCalc:"",
    displayMount:"",
    resetCalc:false
},
methods:{
    loadButtons:function(){
        let buttonsCalculator = [
            {"name":"1","value":1},
            {"name":"2","value":2},
            {"name":"3","value":3},
            {"name":"4","value":4},
            {"name":"5","value":5},
            {"name":"6","value":6},
            {"name":"7","value":7},
            {"name":"8","value":8},
            {"name":"9","value":9},
            {"name":"0","value":0},
        ];
        return buttonsCalculator;
    },
    setValueCalc: function(value){
        let op = this.getOperatorCalc();
        if(!op) this.setFirstValue(value)
        else this.setSecondValue(value);
    },
    setFirstValue:function(value){
        if(value == "") this.firstValue = value
        else this.firstValue += value.toString();
        this.setDisplayCalcMount();
    },
    getFirstValue: function(){
        return this.firstValue;
    },
    setSecondValue:function(value){
        if(value == "") this.secondValue = value
        else this.secondValue += value.toString();
        this.setDisplayCalcMount();
    },
    getSecondValue: function(){
        return this.secondValue;
    },
    setOperatorCalc: function(operator){
        if(!operator){
            this.operatorCalc = ""
        }else{
            let fValue = this.getFirstValue();
            let op = this.getOperatorCalc();
            if(!op && fValue) this.operatorCalc = operator;
        }
        this.setDisplayCalcMount();
    },
    getOperatorCalc: function(operator){
        return this.operatorCalc;
    },
    doCalc: function(){

        let fValue = this.getFirstValue();
        let sValue = this.getSecondValue()
        let opValue = this.getOperatorCalc();


        if(!opValue || fValue == null || sValue == null) return false;

        if((fValue == 0 || sValue == 0) && opValue == "/" ) return false;

        let resultCalc = this.doCalcByOperator(fValue, sValue, opValue)
        this.setResultValc(resultCalc);
        this.setDisplayCalcMount();
        this.doCalcCancel();
    },
    doCalcByOperator: function(v1,v2,op){
        var returnResult = 0;
        v1 = parseFloat(v1);
        v2 = parseFloat(v2);
        switch (op) {
            case "/":
                returnResult = v1 / v2;
                break;
            case "*":
                returnResult = v1 * v2;
                break;
            case "-":
                returnResult = v1 - v2;
                break;
            case "+":
                returnResult = v1 + v2;
                break;
        }
        return returnResult;
    },
    setResultValc: function(value){
        this.resultCalc = value;
    },
    getResultCalc:function(){
        return this.resultCalc;
    },
    doCalcCancel:function(){
        this.setFirstValue("");
        this.setSecondValue("");
        this.setOperatorCalc("");
        this.setResultValc(null );
    },
    setResetCalc: function(value){
        this.resetCalc = value;
    },
    getResetCalc: function(){
        return this.resetCalc;
    },
    setDisplayCalcMount:function(value){
        var fValue = this.getFirstValue();
        var sValue = this.getSecondValue();
        var opValue = this.getOperatorCalc();
        var rValue = this.getResultCalc();
        if(rValue != null) this.displayMount = rValue.toString() 
        else if(!opValue) this.displayMount = fValue.toString();
        else if(fValue && opValue && !sValue) this.displayMount = fValue.toString()+" "+opValue.toString() 
        else this.displayMount = fValue.toString()+" "+opValue.toString()+" "+sValue.toString();
    },
    getDisplayCalcMount:function(){
        return this.displayMount;
    },
    setEventsCommandKeys: function(){
        window.addEventListener('keydown', function(e) {
            if(e.keyCode == 13){
                ComponentMain.doCalc()
            }else if(e.keyCode == 27){
                ComponentMain.doCalcCancel();
            }else if((e.keyCode >= 96 && e.keyCode <= 105) || (e.keyCode >= 48 && e.keyCode <= 57)){
                ComponentMain.setValueCalc(parseFloat(e.key))
            }else if(e.keyCode == 111 || e.keyCode == 106 || e.keyCode == 109|| e.keyCode == 107){
                ComponentMain.setOperatorCalc(e.key)
            }

        });
    }
},
mounted:function(){
    this.buttons = this.loadButtons();
    this.setEventsCommandKeys();
}

});
