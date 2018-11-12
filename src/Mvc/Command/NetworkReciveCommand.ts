/** 网络层接收消息处理 **/
class NetworkReciveCommand {
    public execute(notitify: any) {
        let facade = AppFacade.getInstance();
        let ret = notitify.getBody()

        for (let key in facade.networkDecodeList) {
            let decode:Object = facade.networkDecodeList[key]
            if(!decode)
            { 
                continue;
            }
            let fun  = decode[ret.name] as Function
            if (fun) {
                fun.call(decode, ret.data)
            }
        }

        facade.sendNotification(ret.name, ret)
    }
}
