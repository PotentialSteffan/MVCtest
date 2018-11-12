namespace CommunityData {
    export interface ClubItem {
        strClubName: string,
        iClubID: number,
        strLogo: string,
        strRootName: string,
        rootId: number,
        clubApplyCount: string,
        clubInfo: ST_ClubInfo
    }
    export interface ST_ClubInfo {
        strClubName: string;     //俱乐部名称
        strClubBrief: string;    //俱乐部简介
        strLogo: string;         //俱乐部图标
        iMemberLimit: number;    //人数上限
        iMemberCount: number;    //当前人数
        iJoinCoin: number;       //加入金币数（限制） 0 无限制
        iSetRecommend: number;    //设置推荐隐私 0 不推荐 1 推荐
        iCheckJoin: number;      //玩家加入审核方式 0 无需审核  1 管理员审核 2 不允许加入
        iChatLimit: number;      //聊天方式 0 无限制  1 仅房间信息
        iClubID: number;         //创建的俱乐部ID
        strRootName: string;     //会长名称
        iRootID: number;         //会长ID
        iCreateTime: number;     //创建时间
        iActivitySum: number;    //累计活跃
        iActivityDay: number;    //当前活跃
        strNotice: string;       //公告 
        iYesterdayLoginCnt: number; //昨日登录人数
        iTodaydayLoginCnt: number;   //今日登录人数
    }
    export interface clubTableInfo {
        ClubID: string;         //俱乐部ID
        TableType: string;			//桌子类型（0.成员房 1.好友房)
        RoomId: string;		   //房间id
        UserId: string;		   //用户id
        GameCurrencyType: string;		//游戏货币类型（1:钻石，2：金币，3积分）
        TableList: stTableData;		//房间列表
        bUserHaveTable: string;			//玩家是否有桌子
    }
    export interface stTableData { }




}