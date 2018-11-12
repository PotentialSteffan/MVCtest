
class CommunityModel {
    public static NAME: string = " CommunityModel";
    //所有茶馆信息 {key:clubId,<CommunityData.ClubItem>value:clubInfo}
    private _clubListData:any =  {} ;
    
    public get clubListData() : any {
        return this._clubListData;
    }
    public set clubListData(v : any) {
        this._clubListData = v;
    }
    
    constructor(data?: any) {

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

    public onRegister() {
        
    }

    public onRemove() {
        
    }

    public sortClubList(data1: any, data2: any): number {
        var num1: number = data1.iClubID;
        var num2: number = data2.iClubID;
        return num1 - num2;
    }
    public isMeManager(clubID:number){
        return this.clubListData[clubID].managerList.indexOf(UserData.iUserId) != -1;
    }
}
