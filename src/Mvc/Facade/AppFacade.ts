class AppFacade {
    private static facade;
    public static getInstance() {
        if(null != this.facade){
            this.facade = new AppFacade();
        }
        return this.facade;
    }

    private _decodeList: any;
    /**添加decode*/
    private addNetDecode(decode: any) {
        this._decodeList[decode.name] = decode;
    }
    /**移decode */
    private removeNetDecode(str: string) {
        this._decodeList[str] = null;
        delete this._decodeList[str];
    }
    public initializeModel(): void {
        //注册model
        let community_proxy = new CommunityModel();
        this.registerProxy(community_proxy)
        //注册网络层命令解析对象
        let community_decode = new CommunityNetDecode()
        this.addNetDecode(community_decode)
    }

    private _commandList:any = {};
     /**添加cmd*/
    private addCommand(commandStr:string,commandClass:string) {
        this._commandList[commandClass][commandStr] = commandStr;
    }
    /**移cmd */
    private removeCommand(commandStr: string,commandClass:string) {
        this._commandList[commandClass][commandStr] = null;
        delete this._commandList[commandClass][commandStr];
    }
    /**移cmd */
    public removeAllCommand(commandClass:string) {
        for(let i in this._commandList[commandClass]){
            AppFacade.getInstance().removeCommand(i);
        }
        this._commandList[commandClass] = null;
        delete this._commandList[commandClass];
    }
    initializeController(): void {
        // 茶馆相关模块
        this.registerCommand(CommunityConst.STARTUP, CommunityStartupCMD,CommunityStartupCMD.moduleName);
        this.registerCommand(CommunityConst.CMD0, CommunityStartupCMD,CommunityStartupCMD.moduleName);
        this.registerCommand(CommunityConst.CMD1, CommunityStartupCMD,CommunityStartupCMD.moduleName);
        this.registerCommand(CommunityConst.CMD2, CommunityStartupCMD,CommunityStartupCMD.moduleName);
        this.registerCommand(CommunityConst.CMD3, CommunityStartupCMD,CommunityStartupCMD.moduleName);
        this.registerCommand(CommunityConst.CMD4, CommunityStartupCMD,CommunityStartupCMD.moduleName);
        this.registerCommand(CommunityConst.CMD5, CommunityStartupCMD,CommunityStartupCMD.moduleName);
        this.registerCommand(CommunityConst.CMD6, CommunityStartupCMD,CommunityStartupCMD.moduleName);

    }






    private registerProxy(model: any) {

    }
    private registerCommand(commandStr: string,cmd:any,commandClass:string) {
        //super.registerCommand(commandStr,cmd);
        this.addCommand(commandStr,commandClass);

    }
}