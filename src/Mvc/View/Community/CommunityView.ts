/**
 * 亲友圈界面
 */
class CommunityView extends WindowBase {

    private _communityArr: Array<any> = []; //亲友圈数据
    private _gameTabBar: eui.TabBar;

    private isShowAddGroup: boolean = false;


    public getGameTab(): eui.TabBar {
        return this["gameTabBar"] as eui.TabBar
    }
    public constructor() {
        super();
        this.load(GlobalPara.skinPath + "eui_skins/game/community/CommunitySkin.exml");
    }
    protected createChildren(): void {
        super.createChildren();
        let self = this;
        this.updateUserInfo();
        this.RequestAllClubList();
        this.showTitle();
        (this["tabBarScroller"] as eui.Scroller).addEventListener(eui.UIEvent.CHANGE_START, this.onScrollerStart, this);
        (this["tabBarScroller"] as eui.Scroller).addEventListener(eui.UIEvent.CHANGE_END, this.onScrollerEnd, this);
        Utils.addBtnEvent(this['group_cardcnt'], () => {
            this.showShopView(2);
        }, this, null, 2);
        // group_diamond
        Utils.addBtnEvent(this['group_diamond'], () => {

            this.showShopView(0);

        }, this, null, 2);
    }
    public showShopView(idx: number = 0): void {
        var shopView = new ShopView(idx);
        IndexFacade.getInstance().showSubView(shopView);
        Main.getInstance().display(shopView);

    }
    private onScrollerStart() {
        (this["tabBarScroller"] as eui.Scroller).touchChildren = false;
    }
    private onScrollerEnd() {
        (this["tabBarScroller"] as eui.Scroller).touchChildren = true;

    }
    public removeEvent() {
        (this["tabBarScroller"] as eui.Scroller).removeEventListener(eui.UIEvent.CHANGE_START, this.onScrollerStart, this);
        (this["tabBarScroller"] as eui.Scroller).removeEventListener(eui.UIEvent.CHANGE_END, this.onScrollerEnd, this);
    }

    /**
     * 显示创建加入弹出
     */
    public showAddView(): void {
        if (this.isShowAddGroup) {
            this.isShowAddGroup = false;
        }
        else {
            this.isShowAddGroup = true;
        }
        this['addGroupView'].visible = this.isShowAddGroup;
    }


    /**
    * 显示当前茶馆title
    */
    public showTitle(): void {
        this.removeUserHead();


        let gameTab = this["gameTabBar"];
        let data = gameTab.selectedItem;
        let isHaveClubData: boolean = false;

        if (this['headImg'] && this['headMask']) {
            this['headImg'].mask = this['headMask'];
        }

        if ([null, undefined].indexOf(data) == -1) {

            if ([null, undefined].indexOf(data.clubId) == -1) {
                this['clubInfoGroup'].visible = true;
                this['label_id'].text = "茶馆ID:" + data.clubId;
                isHaveClubData = true;
            } else {
                this['label_id'].text = "";
            }

            if ([null, undefined].indexOf(data.clubName) == -1) {
                this['label_name'].text = data.clubName + "";
            } else {
                this['label_name'].text = "";
            }
            let strFace = data.clubImg;
            Utils.loadHeadImg(strFace, this['headImg']); //头像

            if (data.rootId == UserData.userID) {//是自己的俱乐部
                this['tjGroup'].visible = true;
                this['setGroup'].visible = true;
                //成员红点
                if (data.clubApplyCount > 0) {//申请人数大于0的时候显示红点
                    this['userHotPoint'].visible = true;
                }
                else {
                    this['userHotPoint'].visible = false;
                }
            }
            else {
                this['tjGroup'].visible = false;
                this['userHotPoint'].visible = false;
                this['setGroup'].visible = false;
            }
        }

        //显示和隐藏顶部茶馆名称
        if (this['clubInfoGroup']) {
            this['clubInfoGroup'].visible = isHaveClubData;
        }

    }


    public updateUserInfo(): void {
        this['group_gold']['label_gold']['text'] = Utils.numberFormat(UserData.gold, 1, false, false);
        this['group_diamond']['label_diamond']['text'] = Utils.numberFormat(UserData.diamond, 1, false, false);
        this['group_cardcnt']['label_cardcnt']['text'] = Utils.numberFormat(UserData.cardCnt, 1, false, false);
    }


    public show(): void {
        // this.isAnimation = true;
        super.show(0, true, true, 1, true);
    }

    /**
     * 刷新界面
     */
    public refreshView(): void {
        this.showTitle();

    }
    public setNoneText(boo: boolean) {
        this["noneText"].visible = boo;
    }


    //请求俱乐部列表
    private RequestAllClubList(): void {
        var cmd = MessageClassMap.getcmd("CS_GetALLClubBaseInfo");
        var obj = GlobalProtoClass.get("ClubSubCmd_proto", "CS_GetALLClubBaseInfo");
        obj.UserId = UserData.userID;
        GateClient.getInstance().sendCmd(cmd.cmd, cmd.subcmd, obj);

    }



    public removeUserHead(): void {
        Utils.removeHeadImg(this['headImg']);
    }

    public dispose(): void {
        super.dispose();
        this.removeUserHead();
        this.removeEvent();
    }



}

