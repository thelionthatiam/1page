import QuerySvc from '../data-access/queries'



export default class TestSvc {
    querySvc:QuerySvc;
    inputs: {
        test:string;
    }

    constructor(querySvc, inputs) {
        this.querySvc = querySvc
        this.inputs = inputs
    }

    testPost() {
        return this.querySvc.insertTest([this.inputs.test])
    }

    testGet() {
        return this.querySvc.selectTest()
    }
} 