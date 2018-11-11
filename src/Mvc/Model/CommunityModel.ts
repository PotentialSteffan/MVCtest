
class CommunityModel {

    public static NAME: string = " CommunityModel";

    private _clubDataProvider: eui.ArrayCollection;
    private _clubListData: any;
    /** 选中茶馆索引 **/
    private _selectedClubIndex: number = 0
    /** 是否是从茶馆进入游戏,进入游戏成功后设置 **/
    public isEnterGame: boolean = false

    public clearData():void{
        this._selectedClubIndex = 0;
        this._clubDataProvider.removeAll();
        this.isEnterGame = false
        //this._clubDataProvider = null;
    }
    public getSelectedClubIndex() {
        return this._selectedClubIndex;
    }
    /** 设置选中茶馆Index **/
    public setSelectClubIndex(value: number) {
        this._selectedClubIndex = value;
    }

    constructor(data?: any) {
        super(CommunityModel.NAME, data);
    }

    public get clubDataProvider() {
        return this._clubDataProvider;
    }

    public setSelectIndex(value: number) {
        this.data.selectIndex = value
    }

    public get clubListData(): any {
        return this._clubListData;
    }


    public updateClubData(value: any) {
        //排序
        value.sort(this.sortClubList);
        //存储数据
        this._clubListData = value;
        //填充数据源
        var listData: Array<any> = new Array();
        value.forEach(element => {
            let itemValue = {
                clubName: element.strClubName,
                name: Utils.trimStr2Len(element.strRootName, 6),
                clubId: element.iClubID,
                clubImg: element.strLogo,
                clubData: element.clubInfo,
                rootId: element.rootId,
                clubApplyCount: element.clubApplyCount,
                strQrUrl: element.strQrUrl,//俱乐部二维码
                mineFlag: "",
                hotPointFlag: ""
            }
            if (element.rootId == UserData.userID) {
                itemValue.mineFlag = "community_part_12_png";
                if (element.clubApplyCount > 0) {//申请人数大于0的时候显示红点
                    itemValue.hotPointFlag = "community_part_22_png";
                }
            }
            let isFind = false;
            this._clubDataProvider.source.forEach((item: any,index:number) => {
                if(item.clubId == itemValue.clubId){
                    this._clubDataProvider.replaceItemAt(itemValue,index)
                    this._clubDataProvider.itemUpdated(item)
                    isFind = true;
                }
            });

            if(!isFind){ //新数据有,老数据没有
                this._clubDataProvider.addItem(itemValue)
                this._clubDataProvider.itemUpdated(itemValue);
            }
           // listData.push(itemValue);
        });

         let removeListAry=[];
        //删除
        this._clubDataProvider.source.forEach((itemOld: any,index:number) => {
            let isDele = true;
            value.forEach(element => {
                if(itemOld.clubId == element.iClubID){
                    isDele = false
                }
            });
             if(isDele){ //新数据有,老数据没有
                removeListAry.push(index);
            }

        });

        for(let i:number = removeListAry.length - 1; i >= 0; i--){
            this._clubDataProvider.removeItemAt(removeListAry[i]);
        }
         if(removeListAry.length>0)
         {
              this._clubDataProvider.refresh();
         }
    }

    // public set clubListData(value: any) {
    //     //排序
    //     value.sort(this.sortClubList);
    //     //存储数据
    //     this._clubListData = value;

    //     //填充数据源
    //    // var listData: Array<any> = new Array();
    //     value.forEach(element => {
    //         let itemValue = {
    //             clubName: element.strClubName,
    //             name: Utils.trimStr2Len(element.strRootName, 6),
    //             clubId: element.iClubID,
    //             clubImg: element.strLogo,
    //             clubData: element.clubInfo,
    //             rootId: element.rootId,
    //             clubApplyCount: element.clubApplyCount,
    //             strQrUrl: element.strQrUrl,//俱乐部二维码
    //             mineFlag: "",
    //             hotPointFlag: ""
    //         }
    //         if (element.rootId == UserData.userID) {
    //             itemValue.mineFlag = "community_part_12_png";
    //             if (element.clubApplyCount > 0) {//申请人数大于0的时候显示红点
    //                 itemValue.hotPointFlag = "community_part_22_png";
    //             }
    //         }

    //         // listData.push(itemValue);
    //          this._clubDataProvider.addItem(itemValue);
    //     });
    //     // this._clubDataProvider.replaceAll(listData);
    //     this._clubDataProvider.refresh();

    // }

    public onRegister() {
        this._clubDataProvider = new eui.ArrayCollection();
        this._clubListData = new Array();
    }

    public onRemove() {
        this._clubDataProvider.removeAll();

        this._clubListData = [];
    }

    public sortClubList(data1: any, data2: any): number {
        var num1: number = data1.iClubID;
        var num2: number = data2.iClubID;
        return num1 - num2;
    }

    /**
     * 收到俱乐部数据时候刷新俱乐部界面显示
     * 界面刷新，桌子列表 
     */
    public updateClubInfoData(value: any = null) {

        //刷新数据
        //  this._inviteFriendStartTime = value.strBeginTime;
        //  this._inviteFriendEndTime = value.strEndTime;
        //  this.initData({ids:[1,2]},value);
        //  this._inviteFriendData.refresh();
        //更新界面桌子列表显示  
        this.facade().sendNotification(CommunityConst.COMMUNITY_UPDATE_VIEW)
    }


    /**
     * 收到桌子数据时候刷新桌子数据界面显示
     */
    public updateTableData(value: any = null) {

        //刷新数据
        //  this._inviteFriendStartTime = value.strBeginTime;
        //  this._inviteFriendEndTime = value.strEndTime;
        //  this.initData({ids:[1,2]},value);
        //  this._inviteFriendData.refresh();
        //更新界面桌子列表显示  
        this.facade().sendNotification(CommunityConst.COMMUNITY_UPDATE_TABLE, {})
    }

    /**
    * 刷新红点提示界面显示
    */
    public updateHotPoint(value: any = null) {

        //刷新数据
        //  this._inviteFriendStartTime = value.strBeginTime;
        //  this._inviteFriendEndTime = value.strEndTime;
        //  this.initData({ids:[1,2]},value);
        //  this._inviteFriendData.refresh();
        //更新界面红点显示
        this.facade().sendNotification(CommunityConst.COMMUNITY_UPDATE_HOTPOINT, {})
    }
}
