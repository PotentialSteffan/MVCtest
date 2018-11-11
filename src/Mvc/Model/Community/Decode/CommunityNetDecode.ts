class CommunityNetDecode extends NetDecodeAbstract {
    public static NAME: string = "CommunityNetDecode";
    constructor() {
        super()
        this.name = CommunityNetDecode.NAME
        this.proxy = this.facade.retrieveProxy(CommunityModel.NAME)
    }

    public get model(): CommunityModel {
        return this.proxy as CommunityModel
    }

    /** 接收消息处理接口例子 **/
    // public MSG_NAME(data: any) {
    //     this.model.setData(data)
    //     this.facade.sendNotification(this.MSG_NAME, data)
    // }

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

                    let clubItem = {
                        strClubName: stClubBaseInfo.strClubName,//俱乐部名称
                        iClubID: stClubBaseInfo.iClubID.toNumber(),//俱乐部ID
                        strLogo: stClubBaseInfo.strLogo,//俱乐部logo
                        strRootName: stClubInfo[i].strRootName,  //俱乐部部长名称
                        rootId: stClubInfo[i].iRootID.toNumber(),  //俱乐部部长id
                        clubApplyCount: stClubBaseInfo.ClubApplyCount.toNumber(),  //俱乐部的申请人数
                        strQrUrl: stClubBaseInfo.strQrUrl,//俱乐部二维码
                        clubInfo: stClubInfo[i],  //俱乐部所有数据
                    };

                    clubList.push(clubItem);
                }
            }
        }
        let mediator = this.facade.retrieveMediator(CommunityViewMediator.NAME) as CommunityViewMediator;
        if (mediator) mediator.view.setNoneText(clubList.length == 0);
        let proxy_community = this.facade.retrieveProxy(CommunityModel.NAME) as CommunityModel;
        if (proxy_community) {
            //proxy_community.clubListData = clubList;
           proxy_community.updateClubData(clubList);
           proxy_community.updateClubInfoData();
        }

        

    }
    /*
    //解散俱乐部
    public SC_DismissClubResult(data: any) {
        if (-1 != [null, undefined].indexOf(data)) {
            return;
        }
        let iClubID: number = data.ClubID;
        let iResult: number = data.Result;
        let strResult: string = data.ResultStr;
    }

    //请求加入俱乐部
    public SC_JoinClub(data: any) {
        if (-1 != [null, undefined].indexOf(data)) {
            return;
        }
        let iResult: number = data.iResult;
        let strMsg: string = data.strMsg;
    }


    //申请人列表
    public SC_ApplyForClubUserList(data: any) {
         let stUserLists:any = data.stUserLists;//ST_UserBaseInfo

        for (var i: number = 0; i < stUserLists.length; i++) {
            // required string            strUserLogo = 1;         //玩家图标
            // required string            strUserName = 2;         //玩家名称
            // required int64             iUserID     = 3;         //玩家ID
            // required int64             iUserVip    = 4;
            // optional int64             iAccid      = 5;          //玩家accid
            let strUserLogo:string = stUserLists[i].strUserLogo;
            let strUserName:string = stUserLists[i].strUserName;
            let iUserID:number = stUserLists[i].iUserID.toNumber();
            let iUserVip:number = stUserLists[i].iUserVip.toNumber();
            let iAccid:number = stUserLists[i].iAccid.toNumber();
        }  
    }
    //获取到俱乐部的所有玩家
    public SC_ClubUserList(data: any) {
        // repeated ST_UserInfo       stUserLists = 1;     //玩家列表
        // required int32             iIndexStart = 2;     //索引起始值
        // required int32             iIndexEnd   = 3;     //索引结束值
        // required int32             iTotalCnt   = 4;     //总数
        let stUserLists: any = data.stUserLists;
        let iTotalCnt: number = data.iTotalCnt;

        // required ST_UserBaseInfo   stBaseInfo        = 1;          //玩家基本信息
        // required int64             iUserActivity     = 2;       //玩家活跃度
        // required int64             iUserLastLogoutTm = 3;   //玩家最后退出时间
        // required string            strUserBrief      = 4;        //玩家简介
        // required int64             iUserLV           = 5;         //玩家等级
        // repeated int32             adminRight        = 6; //玩家权限
        // required int64             iUserLastLoginTm  = 7;   //玩家最后登录时间
        // optional string            strUserLoginIP      = 8;   //玩家登录IP
        // optional int32             iState      = 9;          //玩家信任状态
        // optional uint64            iJoinTm     = 10;          //玩家加入时间
        for (var i: number = 0; i < stUserLists.length; i++) {
            let stBaseInfo: any = stUserLists[i].stBaseInfo;
            let iUserLastLoginTm: number = stUserLists[i].iUserLastLoginTm.toNumber();
        }
    }

    //管理员审核玩家结果
    public SC_ToExamineUserResult(data: any) {
        // required int32             iResult = 1;         //结果ID：0 操作成功 其它：错误读取消息
        // required string            strMsg  = 2;         //结果消息
        let iResult: number = data.iResult;
        let strMsg: string = data.strMsg;
    }

    //服务端通知申请加入俱乐部玩家管理员审核的结果，同意的
    public SC_AddClubUserNotify(data: any) {
        // optional SC_ClubBaseInfoOnLogin   stInfo  = 1;         //登录基本信息
        // required int32                    iResult = 2;         //结果ID：0 加入成功 其它：错误读取消息
        // required string                   strMsg  = 3;         //结果消息
        let stInfo: any = data.stInfo;
        let strClubName: string = stInfo.strClubName;         //俱乐部名称
        let iResult: number = data.iResult;
        let strMsg: string = data.strMsg;
    }

    //服务端删除俱乐部玩家返回（会长或管理员）
    public SC_DeleteClubUser(data: any) {
        // required int32             iResult = 1;         //结果ID：0 加入成功 其它：错误读取消息
        // required string            strMsg  = 2;         //结果消息
        // required int64             iUserId = 3;         //被删除玩家id
        let iResult: number = data.iResult;
        let strMsg: string = data.strMsg;
        let iUserId: number = data.iUserId;
    }

    //服务端通知已经被删除的俱乐部玩家
    public SC_DeleteClubUserNotify(data: any) {
        // required int32             iResult = 1;         //结果ID：0 删除成功 其它：错误读取消息
        // required string            strMsg  = 2;         //结果消息
        let iResult: number = data.iResult;
        let strMsg: string = data.strMsg;
    }
    */
    //俱乐部桌子列表
    public SC_ClubTableList(data: any) {
        // required int64             ClubID         = 1;         //俱乐部ID
        // required int64			   TableType	  = 2;			//桌子类型（0.成员房 1.好友房)
        // required int64 			   RoomId		  = 3;		   //房间id
        // required int64 			   UserId		  = 4;		   //用户id
        // required int32 			   GameCurrencyType = 5;		//游戏货币类型（1:钻石，2：金币，3积分）
        // repeated stTableData			TableList	  = 6;		//房间列表
        // optional bool 			   bUserHaveTable = 7;			//玩家是否有桌子

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

    // public A()
    // {
    //     AppFacade.getInstance().retrieveProxy(ActivityModel.NAME) as A

    // }

    // public b(){

    // }
}
