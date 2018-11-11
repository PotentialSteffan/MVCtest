class AppFacade{
    private facade;
    getInstance(){
        return this.facade;
    }
    private _decodeList:any;
    public initializeModel(): void {
        let community_proxy = new CommunityModel()
        this.registerProxy(community_proxy)
        //注册网络层命令解析对象
        let community_decode = new CommunityNetDecode()
        this.addNetDecode(community_decode)
    }
    private registerProxy(model:any){

    }
    private addNetDecode(decode:any){
        this._decodeList[decode.name] = decode;
    }
}