class CommunityNetDecode  {
    public static NAME: string = "CommunityNetDecode";
    public name:string;
    public proxy:any;
    constructor() {
        this.name = CommunityNetDecode.NAME;
        this.proxy = AppFacade.getInstance().retrieveProxy(CommunityModel.NAME);
    }

    public get model(): CommunityModel {
        return this.proxy as CommunityModel
    }
    /**
     * 俱乐部列表
     */
    public SC_GetALLClubBaseInfo(data: any) {
        let clubList = [];
        if (-1 == [null, undefined].indexOf(data)) {
            let stClubInfo: any = data.stClubInfo;//ST_ClubInfo
            for (var i: number = 0; i < stClubInfo.length; i++) {
                let stClubBaseInfo = stClubInfo[i].stClubBaseInfo;//ST_ClubBaseInfo
                if (stClubBaseInfo) {
                    let clubItem :CommunityData.ClubItem = stClubBaseInfo;
                    this.proxy.clubListData[clubItem.clubInfo.iClubID] = clubItem;
                }
            }
        }
       AppFacade.getInstance().sendNotifacation(CommunityConst.COMMUNITY_UPDATE_VIEW,this.proxy.clubListData);
    }
    //俱乐部桌子列表
    public SC_ClubTableList(data: any) {
        

        // let ClubID: number = data.ClubID.toNumber();
        // let RoomId: string = data.RoomId.toNumber();
        // let stTableList:any = data.TableList;
        // for (var i: number = 0; i < stTableList.length; i++) {
        //     let RoomId:number = stTableList[i].RoomId.toNumber();
        //     let OwnerUserId: number = stTableList[i].OwnerUserId.toNumber();
        // }

        ModulesManager.clubModel.set_SC_ClubTableList(data);
        let proxy_Community = this.facade.retrieveProxy(CommunityModel.NAME) as CommunityModel;
        proxy_Community.updateTableData();
    }
}
